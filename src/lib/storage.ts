import fs from 'fs';
import path from 'path';
import { Lead, LeadStatus } from '@/types';

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

export function getLeads(): Lead[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

export function saveLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: LeadStatus }): Lead {
  try {
    const leads = getLeads();
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: leadData.status || 'New Lead',
      priority: leadData.priority || 'Medium',
      assignedTo: leadData.assignedTo || 'Desvanth',
      proposalStatus: leadData.proposalStatus || 'Not Started',
      paymentStatus: leadData.paymentStatus || 'N/A',
      notes: leadData.notes || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    ensureDataDir();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return newLead;
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  try {
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    leads[index] = {
      ...leads[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    ensureDataDir();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return leads[index];
  } catch (error) {
    console.error('Error updating lead:', error);
    return null;
  }
}

export function deleteLead(id: string): boolean {
  try {
    const leads = getLeads();
    const filtered = leads.filter((l) => l.id !== id);
    ensureDataDir();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}
