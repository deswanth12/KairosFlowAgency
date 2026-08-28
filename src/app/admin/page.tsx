'use client';

import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LeadPriority, ProposalStatus, PaymentStatus } from '@/types';
import { foundersData } from '@/data/team';
import { formatDate, formatTimeAgo } from '@/lib/utils';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Trash2, 
  MessageSquare, 
  Mail, 
  Phone, 
  Building, 
  Kanban,
  Table as TableIcon,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle
} from 'lucide-react';

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

const PRIORITIES: LeadPriority[] = ['High', 'Medium', 'Low'];
const PROPOSAL_STATUSES: ProposalStatus[] = ['Not Started', 'Draft', 'Sent', 'Approved', 'Declined'];
const PAYMENT_STATUSES: PaymentStatus[] = ['Pending Deposit', 'Deposit Paid', 'Milestone Paid', 'Fully Paid', 'N/A'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Desvanth');

  useEffect(() => {
    const savedToken = sessionStorage.getItem('kairos_admin_auth');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('kairos_admin_auth', data.token);
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setAuthError('Incorrect admin key. Please try again.');
      }
    } catch {
      setAuthError('Network error during login.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kairos_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleLeadUpdate = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, ...updates })
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, ...updates } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteContent.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      author: noteAuthor,
      content: newNoteContent.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedNotes = [...(selectedLead.notes || []), newNote];

    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id, notes: updatedNotes })
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: updatedNotes } : l))
        );
        setSelectedLead({ ...selectedLead, notes: updatedNotes });
        setNewNoteContent('');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const res = await fetch(`/api/leads?id=${leadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const exportCSV = () => {
    const headers = [
      'ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Services', 
      'Budget', 'Timeline', 'Status', 'Priority', 'Assigned To', 'Value', 
      'Proposal', 'Payment', 'Source'
    ];
    const rows = leads.map((l) => [
      l.id,
      formatDate(l.createdAt),
      `"${l.name}"`,
      `"${l.company}"`,
      l.email,
      l.phone,
      `"${l.services.join(', ')}"`,
      `"${l.budget || ''}"`,
      `"${l.timeline || ''}"`,
      l.status,
      l.priority || 'Medium',
      l.assignedTo || 'Unassigned',
      `"${l.estimatedValue || ''}"`,
      l.proposalStatus || 'Not Started',
      l.paymentStatus || 'N/A',
      l.hearAbout || 'Direct'
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

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || (lead.priority || 'Medium') === priorityFilter;
    const matchesService = serviceFilter === 'All' || lead.services.some((s) => s.includes(serviceFilter));
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q);

    return matchesStatus && matchesPriority && matchesService && matchesSearch;
  });

  const totalLeadsCount = leads.length;
  const wonCount = leads.filter((l) => l.status === 'Won' || l.status === 'In Progress' || l.status === 'Completed').length;
  const activePipelineCount = leads.filter((l) => ['New Lead', 'Contacted', 'Discovery Call', 'Proposal Sent', 'Negotiation'].includes(l.status)).length;
  const conversionRate = totalLeadsCount > 0 ? Math.round((wonCount / totalLeadsCount) * 100) : 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink text-ivory flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md bg-navy/60 border border-navy-border rounded-2xl p-8 shadow-card-dark text-center">
          <div className="w-12 h-12 rounded-xl bg-ink border border-navy-border text-champagne flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-teal mb-2">
            Kairos Flow Agency
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-display mb-2 text-ivory">
            Admin CRM & Operations Portal
          </h1>
          <p className="text-slate-light text-xs mb-8">
            Enter your secure agency key to manage leads, follow-ups, and pipeline records.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono text-slate mb-1.5 font-semibold uppercase tracking-wider">
                Admin Key / Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 text-sm rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 px-4 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{isAuthenticating ? 'Authenticating...' : 'Access CRM Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink min-h-screen text-ivory pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-border mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-champagne uppercase tracking-widest mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Agency Business System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ivory font-display">
              Pipeline & Operations CRM
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchLeads}
              className="p-2.5 bg-navy/80 hover:bg-navy border border-navy-border rounded-lg text-slate-light hover:text-ivory transition-colors text-xs flex items-center gap-1.5"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="p-2.5 bg-navy/80 hover:bg-navy border border-navy-border rounded-lg text-slate-light hover:text-ivory transition-colors text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-teal" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 rounded-lg text-red-300 text-xs font-medium transition-colors"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-navy/40 border border-navy-border rounded-xl p-5 shadow-card-dark">
            <div className="text-xs font-mono text-slate uppercase tracking-wider mb-1">Total Inquiries</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-ivory">{totalLeadsCount}</div>
            <div className="text-[11px] text-teal mt-1">Recorded Prospects</div>
          </div>

          <div className="bg-navy/40 border border-navy-border rounded-xl p-5 shadow-card-dark">
            <div className="text-xs font-mono text-slate uppercase tracking-wider mb-1">Active Pipeline</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-champagne">{activePipelineCount}</div>
            <div className="text-[11px] text-slate-light mt-1">Discovery & Proposals</div>
          </div>

          <div className="bg-navy/40 border border-navy-border rounded-xl p-5 shadow-card-dark">
            <div className="text-xs font-mono text-slate uppercase tracking-wider mb-1">Won & Active</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal">{wonCount}</div>
            <div className="text-[11px] text-slate-light mt-1">Production Engagements</div>
          </div>

          <div className="bg-navy/40 border border-navy-border rounded-xl p-5 shadow-card-dark">
            <div className="text-xs font-mono text-slate uppercase tracking-wider mb-1">Conversion Rate</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-ivory">{conversionRate}%</div>
            <div className="text-[11px] text-teal mt-1">Lead-to-Project Ratio</div>
          </div>
        </div>

        {/* Controls: Search + Filters + View Toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 bg-navy/30 p-4 rounded-xl border border-navy-border">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, company, email, phone..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-ink border border-navy-border text-ivory focus:outline-none focus:ring-1 focus:ring-teal"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg bg-ink border border-navy-border text-ivory focus:outline-none"
            >
              <option value="All">All Pipeline Stages</option>
              {PIPELINE_STAGES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg bg-ink border border-navy-border text-ivory focus:outline-none"
            >
              <option value="All">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p} Priority</option>
              ))}
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg bg-ink border border-navy-border text-ivory focus:outline-none"
            >
              <option value="All">All Disciplines</option>
              <option value="Web">Web Development</option>
              <option value="App">App Development</option>
              <option value="AI">AI & Automation</option>
              <option value="UI/UX">UI/UX & Branding</option>
              <option value="Marketing">Digital Marketing</option>
              <option value="Video">Video & Content</option>
            </select>

            <div className="flex items-center bg-ink border border-navy-border rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  viewMode === 'kanban' ? 'bg-navy text-ivory' : 'text-slate hover:text-ivory'
                }`}
                title="Kanban Board"
              >
                <Kanban className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  viewMode === 'table' ? 'bg-navy text-ivory' : 'text-slate hover:text-ivory'
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="overflow-x-auto pb-6">
            <div className="inline-flex gap-4 min-w-[1300px]">
              {PIPELINE_STAGES.map((stage) => {
                const stageLeads = filteredLeads.filter((l) => l.status === stage);
                return (
                  <div
                    key={stage}
                    className="w-72 bg-navy/30 border border-navy-border rounded-xl p-3.5 flex flex-col flex-shrink-0"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-navy-border mb-3">
                      <div className="text-xs font-bold text-ivory">{stage}</div>
                      <span className="px-2 py-0.5 rounded-full bg-ink text-[10px] font-mono text-champagne">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 overflow-y-auto max-h-[600px] pr-1">
                      {stageLeads.length === 0 ? (
                        <div className="text-center py-6 text-[11px] text-slate-muted italic">
                          No leads in stage
                        </div>
                      ) : (
                        stageLeads.map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className="p-3.5 bg-ink/90 hover:bg-ink border border-navy-border hover:border-teal/50 rounded-lg cursor-pointer transition-all shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="text-xs font-bold text-ivory tracking-tight truncate">
                                {lead.name}
                              </div>
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                lead.priority === 'High' ? 'bg-red-950/60 text-red-300 border border-red-800/40' : 'bg-navy text-slate-light'
                              }`}>
                                {lead.priority || 'Medium'}
                              </span>
                            </div>

                            <div className="text-[11px] text-slate font-medium mb-2 truncate">
                              {lead.company}
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {lead.services.map((svc) => (
                                <span
                                  key={svc}
                                  className="px-1.5 py-0.5 text-[9px] font-mono bg-navy text-teal-subtle rounded border border-navy-border"
                                >
                                  {svc.split(' ')[0]}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-slate pt-2 border-t border-navy-border/60">
                              <span>Lead: <strong className="text-ivory font-normal">{lead.assignedTo || 'Unassigned'}</strong></span>
                              {lead.budget && (
                                <span className="font-mono text-champagne">{lead.budget.split(' ')[0]}</span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Data Table */}
        {viewMode === 'table' && (
          <div className="bg-navy/30 border border-navy-border rounded-xl overflow-hidden shadow-card-dark">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-ink/80 text-slate uppercase font-mono tracking-wider border-b border-navy-border">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Client / Company</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Services</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Proposal</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Assigned</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-border/60 text-slate-light">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-navy/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-ivory">{lead.name}</div>
                        <div className="text-[11px] text-slate">{lead.company}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          lead.priority === 'High' ? 'bg-red-950/60 text-red-300' : 'bg-navy text-slate'
                        }`}>
                          {lead.priority || 'Medium'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {lead.services.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-ink text-[10px] text-teal border border-navy-border">
                              {s.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleLeadUpdate(lead.id, { status: e.target.value as LeadStatus })}
                          className="px-2 py-1 text-[11px] font-mono rounded bg-ink border border-navy-border text-ivory"
                        >
                          {PIPELINE_STAGES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {lead.proposalStatus || 'Not Started'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {lead.paymentStatus || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.assignedTo || ''}
                          onChange={(e) => handleLeadUpdate(lead.id, { assignedTo: e.target.value })}
                          className="px-2 py-1 text-[11px] rounded bg-ink border border-navy-border text-ivory"
                        >
                          <option value="">Unassigned</option>
                          {foundersData.map((f) => (
                            <option key={f.name} value={f.name}>{f.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-slate hover:text-red-400 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lead Detail & Notes Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-ink border border-navy-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
              <div className="flex items-start justify-between pb-6 border-b border-navy-border mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-champagne font-bold">{selectedLead.id}</span>
                    <span className="text-slate">•</span>
                    <span className="text-xs text-slate-light font-mono">Source: {selectedLead.hearAbout || 'Direct'}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-ivory tracking-tight font-display">{selectedLead.name}</h2>
                  <div className="text-sm text-slate-light flex items-center gap-2 mt-0.5">
                    <Building className="w-4 h-4 text-teal" />
                    <span>{selectedLead.company}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-3 py-1.5 bg-navy text-xs rounded-lg text-slate-light hover:text-ivory"
                >
                  Close
                </button>
              </div>

              {/* Status, Priority & Business Tracking Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-navy/40 rounded-xl border border-navy-border mb-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate mb-1">Pipeline Stage</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleLeadUpdate(selectedLead.id, { status: e.target.value as LeadStatus })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-ink border border-navy-border text-ivory"
                  >
                    {PIPELINE_STAGES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate mb-1">Priority</label>
                  <select
                    value={selectedLead.priority || 'Medium'}
                    onChange={(e) => handleLeadUpdate(selectedLead.id, { priority: e.target.value as LeadPriority })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-ink border border-navy-border text-ivory"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate mb-1">Proposal</label>
                  <select
                    value={selectedLead.proposalStatus || 'Not Started'}
                    onChange={(e) => handleLeadUpdate(selectedLead.id, { proposalStatus: e.target.value as ProposalStatus })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-ink border border-navy-border text-ivory"
                  >
                    {PROPOSAL_STATUSES.map((ps) => (
                      <option key={ps} value={ps}>{ps}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate mb-1">Payment</label>
                  <select
                    value={selectedLead.paymentStatus || 'N/A'}
                    onChange={(e) => handleLeadUpdate(selectedLead.id, { paymentStatus: e.target.value as PaymentStatus })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-ink border border-navy-border text-ivory"
                  >
                    {PAYMENT_STATUSES.map((py) => (
                      <option key={py} value={py}>{py}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Assignment & Value Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-navy/20 rounded-xl border border-navy-border mb-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate mb-1">Assigned Co-Founder</label>
                  <select
                    value={selectedLead.assignedTo || ''}
                    onChange={(e) => handleLeadUpdate(selectedLead.id, { assignedTo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-ink border border-navy-border text-ivory"
                  >
                    <option value="">Unassigned</option>
                    {foundersData.map((f) => (
                      <option key={f.name} value={f.name}>{f.name} ({f.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate mb-1">Expected Deal Value</label>
                  <input
                    type="text"
                    defaultValue={selectedLead.estimatedValue || ''}
                    onBlur={(e) => handleLeadUpdate(selectedLead.id, { estimatedValue: e.target.value })}
                    placeholder="e.g. $15,000"
                    className="w-full px-3 py-2 text-xs rounded bg-ink border border-navy-border text-ivory focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>
              </div>

              {/* Project Brief */}
              <div className="space-y-4 mb-6 text-xs">
                <div className="p-4 rounded-xl bg-navy/30 border border-navy-border">
                  <span className="text-slate font-mono uppercase tracking-wider block mb-1 font-semibold">
                    Client Brief & Notes
                  </span>
                  <p className="text-slate-light leading-relaxed whitespace-pre-wrap">{selectedLead.description}</p>
                </div>
              </div>

              {/* Internal Notes Thread */}
              <div className="pt-4 border-t border-navy-border">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-champagne mb-4">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Team Notes ({selectedLead.notes?.length || 0})</span>
                </div>

                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {(!selectedLead.notes || selectedLead.notes.length === 0) ? (
                    <div className="text-slate-muted italic text-xs">No internal notes added yet.</div>
                  ) : (
                    selectedLead.notes.map((note) => (
                      <div key={note.id} className="p-3 rounded-lg bg-navy/40 border border-navy-border text-xs">
                        <div className="flex items-center justify-between mb-1 text-[10px] text-slate font-mono">
                          <span className="text-teal font-bold">{note.author}</span>
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                        <p className="text-slate-light">{note.content}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <select
                    value={noteAuthor}
                    onChange={(e) => setNoteAuthor(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg bg-navy border border-navy-border text-ivory"
                  >
                    {foundersData.map((f) => (
                      <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Add progress note..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-navy border border-navy-border text-ivory focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-teal hover:bg-teal-hover text-ivory rounded-lg transition-colors"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
