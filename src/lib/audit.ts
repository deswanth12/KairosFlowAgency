import { ActivityLog, ActivityAction, ActivityCategory, FieldChange, UserRole } from '@/types';
import { kvGet, kvSet, kvGetSync, kvSetSync, KV_KEYS } from './kv';

const MAX_LOGS = 1000;

// ---------------------------------------------------------------------------
// Activity log persistence — KV-backed
// ---------------------------------------------------------------------------

export async function getAllActivityLogsAsync(): Promise<ActivityLog[]> {
  try {
    const data = await kvGet<ActivityLog[]>(KV_KEYS.ACTIVITY_LOGS);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function getAllActivityLogs(): ActivityLog[] {
  try {
    const data = kvGetSync<ActivityLog[]>(KV_KEYS.ACTIVITY_LOGS);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Log parameters
// ---------------------------------------------------------------------------
export interface LogActionParams {
  userId: string;
  userName: string;
  userRole: UserRole;
  action: ActivityAction;
  category: ActivityCategory;
  entityType: 'lead' | 'project' | 'user' | 'payment' | 'settings' | 'auth';
  entityId: string;
  entityTitle: string;
  /** Pass the verified real IP from the rate limiter helper — never a raw client header */
  ipAddress?: string;
  summary: string;
  changes?: FieldChange[];
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}

export function logActivity(params: LogActionParams): ActivityLog {
  try {
    const logs = getAllActivityLogs();
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: params.userId,
      userName: params.userName,
      userRole: params.userRole,
      action: params.action,
      category: params.category,
      entityType: params.entityType,
      entityId: params.entityId,
      entityTitle: params.entityTitle,
      timestamp: new Date().toISOString(),
      // Only store IP if explicitly passed (server-resolved, not client-supplied raw header)
      ipAddress: params.ipAddress || 'server',
      details: {
        summary: params.summary,
        changes: params.changes || [],
        before: params.before,
        after: params.after,
        meta: params.meta
      }
    };

    logs.unshift(newLog);
    const trimmedLogs = logs.slice(0, MAX_LOGS);

    kvSetSync(KV_KEYS.ACTIVITY_LOGS, trimmedLogs);
    return newLog;
  } catch (error) {
    console.error('Error recording activity log:', error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Field diffs
// ---------------------------------------------------------------------------
export function computeFieldDiffs(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  fieldLabels: Record<string, string> = {
    status: 'Pipeline Stage',
    priority: 'Lead Priority',
    assignedTo: 'Assigned Lead',
    estimatedValue: 'Expected Deal Value',
    paymentStatus: 'Payment Status',
    proposalStatus: 'Proposal Status',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    budget: 'Budget',
    timeline: 'Target Timeline'
  }
): FieldChange[] {
  const changes: FieldChange[] = [];
  const keys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);

  for (const key of keys) {
    if (['updatedAt', 'createdAt', 'notes', 'createdBy', 'updatedBy', 'id'].includes(key)) {
      continue;
    }
    const beforeVal = before?.[key];
    const afterVal = after?.[key];
    if (beforeVal !== afterVal && afterVal !== undefined) {
      changes.push({
        field: key,
        label: fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1),
        before: beforeVal !== undefined && beforeVal !== null && beforeVal !== '' ? beforeVal : '(empty)',
        after: afterVal !== undefined && afterVal !== null && afterVal !== '' ? afterVal : '(empty)'
      });
    }
  }
  return changes;
}

// ---------------------------------------------------------------------------
// Filter logs
// ---------------------------------------------------------------------------
export function filterActivityLogs(filters: {
  category?: string;
  userId?: string;
  entityId?: string;
  search?: string;
  limit?: number;
}): ActivityLog[] {
  const logs = getAllActivityLogs();
  // Hard cap: server enforces maximum 500 per request regardless of client request
  const cap = Math.min(filters.limit || 100, 500);

  return logs
    .filter((log) => {
      if (filters.category && filters.category !== 'all' && log.category !== filters.category) return false;
      if (filters.userId && filters.userId !== 'all' && log.userId !== filters.userId) return false;
      if (filters.entityId && log.entityId !== filters.entityId) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          log.details.summary.toLowerCase().includes(q) ||
          log.entityTitle.toLowerCase().includes(q) ||
          log.userName.toLowerCase().includes(q) ||
          log.action.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    })
    .slice(0, cap);
}
