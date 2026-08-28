'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Search, 
  Download, 
  Plus, 
  LayoutGrid, 
  List, 
  MessageCircle, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  User, 
  Clock, 
  Trash2, 
  ChevronRight, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Send,
  X,
  ExternalLink,
  Users,
  Eye,
  EyeOff,
  Sparkles,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Lead, LeadStatus, LeadPriority, ProposalStatus, PaymentStatus } from '@/types';
import { formatDate, formatTimeAgo, generateWhatsAppLink } from '@/lib/utils';

const PIPELINE_STAGES: LeadStatus[] = [
  'New Lead',
  'Contacted',
  'Discovery Call',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'In Progress',
  'Completed',
  'Lost / Closed'
];

const STAGE_COLORS: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  'New Lead': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Contacted': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Discovery Call': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  'Proposal Sent': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  'Negotiation': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  'Won': { bg: 'bg-teal/15', text: 'text-teal', border: 'border-teal/40' },
  'In Progress': { bg: 'bg-champagne/15', text: 'text-champagne', border: 'border-champagne/40' },
  'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Lost / Closed': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
};

const FOUNDERS = [
  'Desvanth (Founder)',
  'Mehaboob Basha (Marketing)',
  'Siddiq (Creative)',
  'Rithesh (Development)',
  'Sai Deep (Video)'
];

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  // CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedFounderFilter, setSelectedFounderFilter] = useState<string>('all');

  // Active Lead Management Modal
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [noteAuthor, setNoteAuthor] = useState<string>('Desvanth');

  // Manual Lead Form State
  const [manualFormData, setManualFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    services: ['Web Development'],
    description: '',
    budget: '$5,000 – $10,000',
    timeline: '1 – 2 Months',
    priority: 'Medium' as LeadPriority,
    assignedTo: 'Desvanth (Founder)',
    estimatedValue: '₹50,000'
  });

  // Check Session Storage on Mount
  useEffect(() => {
    const token = sessionStorage.getItem('kairos_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setIsLoadingLeads(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('kairos_admin_token', data.token);
        setIsAuthenticated(true);
        setPasswordInput('');
        fetchLeads();
      } else {
        setAuthError(data.message || 'Invalid administrative password.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kairos_admin_token');
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        if (activeLead && activeLead.id === id) {
          setActiveLead(data.lead);
        }
      }
    } catch (err) {
      console.error('Error updating lead:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (activeLead?.id === id) setActiveLead(null);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead || !newNoteContent.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      author: noteAuthor,
      content: newNoteContent.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedNotes = [...(activeLead.notes || []), newNote];
    await handleUpdateLead(activeLead.id, { notes: updatedNotes });
    setNewNoteContent('');
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualFormData)
      });
      const data = await res.json();
      if (data.success) {
        setIsManualModalOpen(false);
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to create manual lead:', err);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Services', 'Status', 'Priority', 'Assigned To', 'Est Value', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${l.services.join(', ')}"`,
      l.status,
      l.priority || 'Medium',
      l.assignedTo || 'Unassigned',
      l.estimatedValue || 'N/A',
      l.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kairos-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads Calculation
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const matchesStage = selectedStageFilter === 'all' || lead.status === selectedStageFilter;
      const matchesPriority = selectedPriorityFilter === 'all' || lead.priority === selectedPriorityFilter;
      const matchesFounder = selectedFounderFilter === 'all' || (lead.assignedTo && lead.assignedTo.includes(selectedFounderFilter));

      return matchesSearch && matchesStage && matchesPriority && matchesFounder;
    });
  }, [leads, searchQuery, selectedStageFilter, selectedPriorityFilter, selectedFounderFilter]);

  // Executive Telemetry Stats
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New Lead').length;
    const activePipeline = leads.filter((l) => ['Discovery Call', 'Proposal Sent', 'Negotiation'].includes(l.status)).length;
    const wonCount = leads.filter((l) => l.status === 'Won').length;

    return { total, newCount, activePipeline, wonCount };
  }, [leads]);

  // If Not Authenticated, Render Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink text-ivory flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-navy/60 border border-navy-border shadow-2xl backdrop-blur-md text-center">
          <div className="w-14 h-14 rounded-2xl bg-ink border border-champagne/40 flex items-center justify-center text-champagne mx-auto mb-6 shadow-subtle-dark">
            <Lock className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink border border-navy-border text-[11px] font-mono text-champagne uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Restricted Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display mb-2 text-ivory">
            Kairos Flow Operations OS
          </h1>
          <p className="text-slate-light text-xs sm:text-sm mb-8 leading-relaxed">
            Enter the administrative key to access the client pipeline, lead telemetry, and deal operations.
          </p>

          {authError && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3.5 text-sm rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal placeholder:text-slate-muted pr-11 font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ivory transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAuthLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Unlock Operations Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-[11px] font-mono text-slate-muted">
            Kairos Flow Agency • Strictly Confidential
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-ivory flex flex-col font-sans">
      {/* Top Operations Header Bar */}
      <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur-md border-b border-navy-border px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={32} variant="mark" theme="dark" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-ivory font-display tracking-tight">Kairos Flow Operations OS</h1>
                <span className="px-2 py-0.5 rounded bg-teal/20 text-teal text-[10px] font-mono font-semibold">
                  LIVE PIPELINE
                </span>
              </div>
              <p className="text-[11px] text-slate-light font-mono">Lead Intelligence & Client Deliveries</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>

            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-light hover:text-ivory bg-navy/60 hover:bg-navy border border-navy-border rounded-lg transition-colors disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5 text-champagne" />
              <span>Export CSV</span>
            </button>

            <div className="h-4 w-[1px] bg-navy-border mx-1" />

            <div className="flex items-center bg-navy/60 border border-navy-border rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'kanban' ? 'bg-ink text-teal shadow-sm font-semibold' : 'text-slate-light hover:text-ivory'
                }`}
                title="Kanban Board View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-ink text-teal shadow-sm font-semibold' : 'text-slate-light hover:text-ivory'
                }`}
                title="Data Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-mono text-slate hover:text-red-400 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-navy/40 border border-navy-border">
            <div className="text-[11px] font-mono text-slate-light uppercase tracking-wider mb-1">Total Inquiries</div>
            <div className="text-2xl font-bold font-display text-ivory">{stats.total}</div>
          </div>

          <div className="p-4 rounded-xl bg-navy/40 border border-navy-border">
            <div className="text-[11px] font-mono text-blue-400 uppercase tracking-wider mb-1">New Intake</div>
            <div className="text-2xl font-bold font-display text-blue-400">{stats.newCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-navy/40 border border-navy-border">
            <div className="text-[11px] font-mono text-yellow-400 uppercase tracking-wider mb-1">Active Pipeline</div>
            <div className="text-2xl font-bold font-display text-yellow-400">{stats.activePipeline}</div>
          </div>

          <div className="p-4 rounded-xl bg-navy/40 border border-navy-border">
            <div className="text-[11px] font-mono text-teal uppercase tracking-wider mb-1">Won Projects</div>
            <div className="text-2xl font-bold font-display text-teal">{stats.wonCount}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-navy/30 border border-navy-border rounded-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, company, email, or phone..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal placeholder:text-slate-muted"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedStageFilter}
              onChange={(e) => setSelectedStageFilter(e.target.value)}
              className="px-2.5 py-2 text-xs rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
            >
              <option value="all">All Stages</option>
              {PIPELINE_STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedPriorityFilter}
              onChange={(e) => setSelectedPriorityFilter(e.target.value)}
              className="px-2.5 py-2 text-xs rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Empty State when no leads exist */}
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-navy/20 border border-navy-border my-8">
            <div className="w-12 h-12 rounded-xl bg-ink border border-navy-border flex items-center justify-center text-champagne mx-auto mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-ivory font-display mb-1">No Client Leads Found</h3>
            <p className="text-slate-light text-xs max-w-md mx-auto mb-6 leading-relaxed">
              Inquiries submitted through the website contact form, AI Consultant, or WhatsApp will appear here in real time.
            </p>
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log First Client Lead</span>
            </button>
          </div>
        )}

        {/* KANBAN BOARD VIEW */}
        {viewMode === 'kanban' && filteredLeads.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.status === stage);
              const color = STAGE_COLORS[stage];

              return (
                <div key={stage} className="flex flex-col rounded-xl bg-navy/20 border border-navy-border/80 p-3 min-w-[240px]">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-navy-border/60 mb-3">
                    <span className={`text-xs font-mono font-bold ${color.text} uppercase tracking-wider`}>
                      {stage}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-ink text-[10px] font-mono text-slate-light border border-navy-border">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 flex-1">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setActiveLead(lead)}
                        className="group p-3.5 rounded-lg bg-navy/60 hover:bg-navy border border-navy-border hover:border-teal/50 transition-all cursor-pointer shadow-sm space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-ivory group-hover:text-teal transition-colors">
                              {lead.name}
                            </h4>
                            <p className="text-[11px] text-slate-light font-mono truncate max-w-[140px]">
                              {lead.company}
                            </p>
                          </div>
                          {lead.priority && (
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                                lead.priority === 'High'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : lead.priority === 'Medium'
                                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                  : 'bg-slate/20 text-slate-light border border-slate/30'
                              }`}
                            >
                              {lead.priority}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {lead.services.slice(0, 2).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-ink text-[9px] font-mono text-slate-light">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-navy-border/60 text-[10px] font-mono text-slate">
                          <span>{lead.estimatedValue || lead.budget || 'Est. TBD'}</span>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={generateWhatsAppLink(lead.phone.replace(/[^0-9]/g, ''))}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 text-slate hover:text-teal transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-teal" />
                            </a>
                            <span>{formatTimeAgo(lead.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DATA TABLE VIEW */}
        {viewMode === 'table' && filteredLeads.length > 0 && (
          <div className="rounded-xl bg-navy/20 border border-navy-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-navy/80 border-b border-navy-border font-mono uppercase text-[10px] text-slate-light">
                  <tr>
                    <th className="p-3.5">Client & Company</th>
                    <th className="p-3.5">Services</th>
                    <th className="p-3.5">Stage</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Assigned Lead</th>
                    <th className="p-3.5">Value / Budget</th>
                    <th className="p-3.5">Created</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-border/60">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setActiveLead(lead)}
                      className="hover:bg-navy/40 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5">
                        <div className="font-bold text-ivory">{lead.name}</div>
                        <div className="text-[11px] text-slate-light font-mono">{lead.company} • {lead.email}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {lead.services.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-ink text-[9px] font-mono text-slate-light">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono font-semibold border ${STAGE_COLORS[lead.status].bg} ${STAGE_COLORS[lead.status].text} ${STAGE_COLORS[lead.status].border}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono text-[11px]">{lead.priority || 'Medium'}</span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-light">
                        {lead.assignedTo || 'Desvanth'}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-champagne font-semibold">
                        {lead.estimatedValue || lead.budget || 'TBD'}
                      </td>
                      <td className="p-3.5 font-mono text-[10px] text-slate">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={generateWhatsAppLink(lead.phone.replace(/[^0-9]/g, ''))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal/20 text-teal hover:bg-teal hover:text-ivory border border-teal/40 text-[10px] font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Chat</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* LEAD OPERATIONS DRAWER / MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-navy/95 border-l border-navy-border p-6 sm:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-4 border-b border-navy-border">
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${STAGE_COLORS[activeLead.status].bg} ${STAGE_COLORS[activeLead.status].text} ${STAGE_COLORS[activeLead.status].border}`}>
                    {activeLead.status}
                  </span>
                  <h2 className="text-xl font-bold font-display text-ivory mt-2">{activeLead.name}</h2>
                  <p className="text-xs text-slate-light font-mono">{activeLead.company} • {activeLead.email} • {activeLead.phone}</p>
                </div>

                <button
                  onClick={() => setActiveLead(null)}
                  className="p-1.5 text-slate hover:text-ivory hover:bg-ink rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct Quick WhatsApp / Call */}
              <div className="flex items-center gap-3">
                <a
                  href={generateWhatsAppLink(activeLead.phone.replace(/[^0-9]/g, ''))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`mailto:${activeLead.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-light hover:text-ivory bg-ink border border-navy-border rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
              </div>

              {/* Operations Stage & Business Controls */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-ink/60 border border-navy-border">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1 font-semibold">
                    Pipeline Stage
                  </label>
                  <select
                    value={activeLead.status}
                    onChange={(e) => handleUpdateLead(activeLead.id, { status: e.target.value as LeadStatus })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-navy text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  >
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1 font-semibold">
                    Lead Priority
                  </label>
                  <select
                    value={activeLead.priority || 'Medium'}
                    onChange={(e) => handleUpdateLead(activeLead.id, { priority: e.target.value as LeadPriority })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-navy text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1 font-semibold">
                    Assigned Lead
                  </label>
                  <select
                    value={activeLead.assignedTo || 'Desvanth (Founder)'}
                    onChange={(e) => handleUpdateLead(activeLead.id, { assignedTo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-navy text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  >
                    {FOUNDERS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1 font-semibold">
                    Expected Deal Value
                  </label>
                  <input
                    type="text"
                    value={activeLead.estimatedValue || ''}
                    onChange={(e) => handleUpdateLead(activeLead.id, { estimatedValue: e.target.value })}
                    placeholder="e.g. ₹85,000 / $2,000"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-navy text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              {/* Project Brief / Details */}
              <div className="p-4 rounded-xl bg-ink/60 border border-navy-border space-y-3">
                <div className="text-xs font-mono uppercase text-slate tracking-wider font-semibold">Project Brief</div>
                <p className="text-xs text-slate-light leading-relaxed whitespace-pre-wrap">{activeLead.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-navy-border/60">
                  {activeLead.services.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-navy text-[10px] font-mono text-teal border border-navy-border">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Internal Notes & Operations Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate tracking-wider font-semibold">
                    Internal Operations Thread
                  </span>
                  <span className="text-[10px] font-mono text-slate-muted">{activeLead.notes?.length || 0} entries</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeLead.notes && activeLead.notes.length > 0 ? (
                    activeLead.notes.map((note) => (
                      <div key={note.id} className="p-3 rounded-lg bg-ink border border-navy-border text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate">
                          <span className="font-bold text-champagne">{note.author}</span>
                          <span>{formatTimeAgo(note.createdAt)}</span>
                        </div>
                        <p className="text-slate-light text-xs leading-relaxed">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-muted italic p-2">No internal notes yet.</p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Log team follow-up, client call notes, or next action..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal placeholder:text-slate-muted"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>

            {/* Footer Delete Action */}
            <div className="pt-6 border-t border-navy-border flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={() => handleDeleteLead(activeLead.id)}
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-mono transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="px-4 py-2 text-xs font-medium text-slate hover:text-ivory bg-ink rounded-lg transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL LEAD CREATION MODAL */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-navy/95 border border-navy-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-navy-border">
              <h3 className="text-lg font-bold font-display text-ivory">Log New Client Lead</h3>
              <button onClick={() => setIsManualModalOpen(false)} className="text-slate hover:text-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={manualFormData.name}
                    onChange={(e) => setManualFormData({ ...manualFormData, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="block font-mono text-slate mb-1">Company / Venture *</label>
                  <input
                    type="text"
                    required
                    value={manualFormData.company}
                    onChange={(e) => setManualFormData({ ...manualFormData, company: e.target.value })}
                    placeholder="e.g. Varma Logistics"
                    className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={manualFormData.email}
                    onChange={(e) => setManualFormData({ ...manualFormData, email: e.target.value })}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="block font-mono text-slate mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={manualFormData.phone}
                    onChange={(e) => setManualFormData({ ...manualFormData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate mb-1">Project Requirements *</label>
                <textarea
                  rows={3}
                  required
                  value={manualFormData.description}
                  onChange={(e) => setManualFormData({ ...manualFormData, description: e.target.value })}
                  placeholder="Describe scope, features, and target outcomes..."
                  className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-slate mb-1">Priority</label>
                  <select
                    value={manualFormData.priority}
                    onChange={(e) => setManualFormData({ ...manualFormData, priority: e.target.value as LeadPriority })}
                    className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-slate mb-1">Estimated Value</label>
                  <input
                    type="text"
                    value={manualFormData.estimatedValue}
                    onChange={(e) => setManualFormData({ ...manualFormData, estimatedValue: e.target.value })}
                    placeholder="e.g. ₹75,000"
                    className="w-full px-3 py-2 rounded-lg bg-ink text-ivory border border-navy-border"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-navy-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate hover:text-ivory bg-ink rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
