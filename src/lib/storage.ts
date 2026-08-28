import fs from 'fs';
import path from 'path';
import { Lead, LeadStatus } from '@/types';

const DATA_DIR = path.join(process.cwd(), '.data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Vikram Malhotra',
    company: 'Apex Logistics Global',
    email: 'vikram@apexlogistics.io',
    phone: '+91 98450 11223',
    services: ['Web Development', 'AI & Automation'],
    description: 'Looking to overhaul our enterprise fleet dashboard and automate driver dispatch routing using AI assistants.',
    budget: '$10,000 - $25,000',
    timeline: '1 - 2 Months',
    hearAbout: 'Referral',
    status: 'Discovery Call',
    assignedTo: 'Desvanth',
    estimatedValue: '$18,000',
    notes: [
      {
        id: 'note-1',
        author: 'Desvanth',
        content: 'Initial discovery scheduled for Tuesday 4 PM IST. Discussed integration with existing SAP database.',
        createdAt: '2026-08-27T10:30:00Z'
      }
    ],
    createdAt: '2026-08-26T08:15:00Z',
    updatedAt: '2026-08-27T10:30:00Z'
  },
  {
    id: 'lead-2',
    name: 'Elena Rostova',
    company: 'Solis Renewable Energy',
    email: 'elena.r@solisenergy.com',
    phone: '+44 20 7946 0912',
    services: ['UI/UX & Branding', 'Web Development'],
    description: 'Complete brand identity refresh and high-conversion investor relations portal for our Series B expansion.',
    budget: '$25,000 - $50,000',
    timeline: '2 - 3 Months',
    hearAbout: 'Google Search',
    status: 'Proposal Sent',
    assignedTo: 'Bhasha',
    estimatedValue: '$32,000',
    notes: [
      {
        id: 'note-2',
        author: 'Bhasha',
        content: 'Sent comprehensive proposal with tier 1 design system and Next.js portal timeline.',
        createdAt: '2026-08-27T16:00:00Z'
      }
    ],
    createdAt: '2026-08-25T14:20:00Z',
    updatedAt: '2026-08-27T16:00:00Z'
  },
  {
    id: 'lead-3',
    name: 'Arjun Reddy',
    company: 'Zenith Health Diagnostics',
    email: 'arjun@zenithhealth.in',
    phone: '+91 99887 76655',
    services: ['App Development'],
    description: 'Patient mobile app for automated blood test report delivery and tele-consultation booking.',
    budget: '$10,000 - $25,000',
    timeline: '3+ Months',
    hearAbout: 'LinkedIn',
    status: 'Won',
    assignedTo: 'Rithesh',
    estimatedValue: '$22,000',
    notes: [
      {
        id: 'note-3',
        author: 'Desvanth',
        content: 'Contract signed! Kickoff meeting set with Sai Deep & Rithesh for sprint 1.',
        createdAt: '2026-08-28T09:00:00Z'
      }
    ],
    createdAt: '2026-08-24T11:00:00Z',
    updatedAt: '2026-08-28T09:00:00Z'
  },
  {
    id: 'lead-4',
    name: 'Kavita Menon',
    company: 'Aura Artisan Living',
    email: 'kavita@aurahome.com',
    phone: '+91 97112 33445',
    services: ['Video & Content', 'Digital Marketing'],
    description: 'Seasonal product video campaign, social reels, and targeted ad funnels for our autumn collection.',
    budget: '$5,000 - $10,000',
    timeline: 'Less than 1 month',
    hearAbout: 'Instagram',
    status: 'New Lead',
    assignedTo: 'Sai Deep',
    estimatedValue: '$8,500',
    notes: [],
    createdAt: '2026-08-28T14:40:00Z',
    updatedAt: '2026-08-28T14:40:00Z'
  }
];

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
      fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2), 'utf-8');
      return INITIAL_LEADS;
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return INITIAL_LEADS;
  }
}

export function saveLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: LeadStatus }): Lead {
  try {
    const leads = getLeads();
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: leadData.status || 'New Lead',
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
