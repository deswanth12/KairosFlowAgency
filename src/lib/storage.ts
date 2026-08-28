import fs from 'fs';
import path from 'path';
import { Lead, LeadStatus, UserAuditRef } from '@/types';

const DATA_DIR = path.join(process.cwd(), '.data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

// Atomic file write using temporary file + rename to guarantee crash-safety
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
    // Fallback to direct write if filesystem rename is locked on Windows
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

export function getLeads(): Lead[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(LEADS_FILE)) {
      atomicWriteFileSync(LEADS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

export function getLeadById(id: string): Lead | null {
  const leads = getLeads();
  return leads.find((l) => l.id === id) || null;
}

export function saveLead(
  leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { 
    status?: LeadStatus;
    createdBy?: UserAuditRef;
  }
): Lead {
  try {
    const leads = getLeads();
    const creator: UserAuditRef = leadData.createdBy || {
      id: 'usr-intake',
      name: 'Website Client Brief',
      role: 'Operations'
    };

    const newLead: Lead = {
      ...leadData,
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
    atomicWriteFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    return newLead;
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
}

export interface UpdateLeadResult {
  before: Lead;
  updated: Lead;
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
    const updater: UserAuditRef = updatedBy || before.updatedBy;

    leads[index] = {
      ...leads[index],
      ...updates,
      updatedBy: updater,
      updatedAt: new Date().toISOString()
    };

    atomicWriteFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    return { before, updated: leads[index] };
  } catch (error) {
    console.error('Error updating lead with audit:', error);
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
    atomicWriteFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2));
    return deleted;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return null;
  }
}
