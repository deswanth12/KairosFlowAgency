import fs from 'fs';
import path from 'path';
import { ActivityLog, ActivityAction, ActivityCategory, FieldChange, UserRole } from '@/types';

const DATA_DIR = path.join(process.cwd(), '.data');
const AUDIT_FILE = path.join(DATA_DIR, 'activity_logs.json');

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

// Atomic file write using temporary file + rename
function atomicWriteFileSync(filePath: string, content: string): void {
  ensureDataDir();
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
  try {
    fs.writeFileSync(tempPath, content, 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch {}
    }
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

export function getAllActivityLogs(): ActivityLog[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(AUDIT_FILE)) {
      atomicWriteFileSync(AUDIT_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(AUDIT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading activity logs:', error);
    return [];
  }
}

export interface LogActionParams {
  userId: string;
  userName: string;
  userRole: UserRole;
  action: ActivityAction;
  category: ActivityCategory;
  entityType: 'lead' | 'project' | 'user' | 'payment' | 'settings' | 'auth';
  entityId: string;
  entityTitle: string;
  ipAddress?: string;
  summary: string;
  changes?: FieldChange[];
  before?: Record<string, any>;
  after?: Record<string, any>;
  meta?: Record<string, any>;
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
      ipAddress: params.ipAddress || '127.0.0.1',
      details: {
        summary: params.summary,
        changes: params.changes || [],
        before: params.before,
        after: params.after,
        meta: params.meta
      }
    };

    logs.unshift(newLog);

    // Keep last 1,000 logs
    const trimmedLogs = logs.slice(0, 1000);

    atomicWriteFileSync(AUDIT_FILE, JSON.stringify(trimmedLogs, null, 2));
    return newLog;
  } catch (error) {
    console.error('Error recording activity log:', error);
    throw error;
  }
}

// Compute field-by-field differences between before and after states
export function computeFieldDiffs(
  before: Record<string, any>,
  after: Record<string, any>,
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
    // Ignore internal timestamp fields
    if (['updatedAt', 'createdAt', 'notes', 'createdBy', 'updatedBy', 'id'].includes(key)) {
      continue;
    }

    const beforeVal = before ? before[key] : undefined;
    const afterVal = after ? after[key] : undefined;

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

export function filterActivityLogs(filters: {
  category?: string;
  userId?: string;
  entityId?: string;
  search?: string;
  limit?: number;
}): ActivityLog[] {
  const logs = getAllActivityLogs();
  return logs
    .filter((log) => {
      if (filters.category && filters.category !== 'all' && log.category !== filters.category) {
        return false;
      }
      if (filters.userId && filters.userId !== 'all' && log.userId !== filters.userId) {
        return false;
      }
      if (filters.entityId && log.entityId !== filters.entityId) {
        return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesSummary = log.details.summary.toLowerCase().includes(q);
        const matchesEntity = log.entityTitle.toLowerCase().includes(q);
        const matchesUser = log.userName.toLowerCase().includes(q);
        const matchesAction = log.action.toLowerCase().includes(q);
        if (!matchesSummary && !matchesEntity && !matchesUser && !matchesAction) {
          return false;
        }
      }
      return true;
    })
    .slice(0, filters.limit || 100);
}
