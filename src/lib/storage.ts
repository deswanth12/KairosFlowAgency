import { Lead, LeadStatus, UserAuditRef } from '@/types';
import { kvGet, kvSet, kvGetSync, kvSetSync, KV_KEYS } from './kv';

// ---------------------------------------------------------------------------
// Leads — async (production KV) + sync shim (local dev)
// ---------------------------------------------------------------------------

export async function getLeadsAsync(): Promise<Lead[]> {
  try {
    const data = await kvGet<Lead[]>(KV_KEYS.LEADS);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function getLeads(): Lead[] {
  try {
    const data = kvGetSync<Lead[]>(KV_KEYS.LEADS);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function getLeadById(id: string): Lead | null {
  return getLeads().find((l) => l.id === id) || null;
}

export async function saveLeadAsync(
  leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
    status?: LeadStatus;
    createdBy?: UserAuditRef;
  }
): Promise<Lead> {
  const leads = await getLeadsAsync();
  const creator: UserAuditRef = leadData.createdBy || {
    id: 'usr-intake',
    name: 'Website Client Brief',
    role: 'Operations'
  };

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: _id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createdAt: _createdAt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatedAt: _updatedAt,
    createdBy: _createdBy,
    ...safeLeadData
  } = leadData as any;

  const newLead: Lead = {
    ...safeLeadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: leadData.status || 'New Lead',
    priority: leadData.priority || 'Medium',
    assignedTo: leadData.assignedTo || 'Unassigned',
    proposalStatus: leadData.proposalStatus || 'Not Started',
    paymentStatus: leadData.paymentStatus || 'N/A',
    notes: leadData.notes || [],
    createdBy: creator,
    updatedBy: creator,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  await kvSet(KV_KEYS.LEADS, leads);
  return newLead;
}

export async function updateLeadWithAuditAsync(
  id: string,
  updates: Partial<Lead>,
  updatedBy: UserAuditRef
): Promise<UpdateLeadResult | null> {
  try {
    const leads = await getLeadsAsync();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const before = { ...leads[index] };

    const ALLOWED_UPDATE_FIELDS: (keyof Lead)[] = [
      'name', 'company', 'email', 'phone', 'services', 'description',
      'budget', 'timeline', 'status', 'priority', 'assignedTo',
      'proposalStatus', 'paymentStatus', 'estimatedValue',
      'notes', 'referenceLinks', 'hearAbout'
    ];

    const safeUpdates: Partial<Lead> = {};
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (field in updates) {
        (safeUpdates as any)[field] = (updates as any)[field];
      }
    }

    leads[index] = {
      ...leads[index],
      ...safeUpdates,
      updatedBy,
      updatedAt: new Date().toISOString()
    };

    await kvSet(KV_KEYS.LEADS, leads);
    return { before, updated: leads[index] };
  } catch (error) {
    console.error('Error updating lead async:', error);
    return null;
  }
}

export async function deleteLeadAsync(id: string): Promise<Lead | null> {
  try {
    const leads = await getLeadsAsync();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;
    const deleted = leads[index];
    const filtered = leads.filter((l) => l.id !== id);
    await kvSet(KV_KEYS.LEADS, filtered);
    return deleted;
  } catch (error) {
    console.error('Error deleting lead async:', error);
    return null;
  }
}

export interface UpdateLeadResult {
  before: Lead;
  updated: Lead;
}

// Synchronous shims (for local dev / sync contexts)
export function saveLead(
  leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
    status?: LeadStatus;
    createdBy?: UserAuditRef;
  }
): Lead {
  const leads = getLeads();
  const creator: UserAuditRef = leadData.createdBy || {
    id: 'usr-intake',
    name: 'Website Client Brief',
    role: 'Operations'
  };

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: _id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createdAt: _createdAt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatedAt: _updatedAt,
    createdBy: _createdBy,
    ...safeLeadData
  } = leadData as any;

  const newLead: Lead = {
    ...safeLeadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: leadData.status || 'New Lead',
    priority: leadData.priority || 'Medium',
    assignedTo: leadData.assignedTo || 'Unassigned',
    proposalStatus: leadData.proposalStatus || 'Not Started',
    paymentStatus: leadData.paymentStatus || 'N/A',
    notes: leadData.notes || [],
    createdBy: creator,
    updatedBy: creator,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  kvSetSync(KV_KEYS.LEADS, leads);
  return newLead;
}

export function updateLeadWithAudit(
  id: string,
  updates: Partial<Lead>,
  updatedBy: UserAuditRef
): UpdateLeadResult | null {
  try {
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const before = { ...leads[index] };

    const ALLOWED_UPDATE_FIELDS: (keyof Lead)[] = [
      'name', 'company', 'email', 'phone', 'services', 'description',
      'budget', 'timeline', 'status', 'priority', 'assignedTo',
      'proposalStatus', 'paymentStatus', 'estimatedValue',
      'notes', 'referenceLinks', 'hearAbout'
    ];

    const safeUpdates: Partial<Lead> = {};
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (field in updates) {
        (safeUpdates as any)[field] = (updates as any)[field];
      }
    }

    leads[index] = {
      ...leads[index],
      ...safeUpdates,
      updatedBy,
      updatedAt: new Date().toISOString()
    };

    kvSetSync(KV_KEYS.LEADS, leads);
    return { before, updated: leads[index] };
  } catch (error) {
    console.error('Error updating lead:', error);
    return null;
  }
}

export function deleteLead(id: string): Lead | null {
  try {
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;
    const deleted = leads[index];
    const filtered = leads.filter((l) => l.id !== id);
    kvSetSync(KV_KEYS.LEADS, filtered);
    return deleted;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return null;
  }
}
