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
  User as UserIcon, 
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
  Briefcase,
  History,
  Shield,
  Loader2,
  Activity,
  ArrowRight,
  UserCheck,
  Layers,
  Key,
  Terminal,
  Radio,
  RefreshCw,
  Printer,
  Copy,
  Check,
  Zap,
  Bot,
  BrainCircuit,
  Wand2
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { RevenueDashboard } from '@/components/admin/RevenueDashboard';
import { 
  Lead, 
  LeadStatus, 
  LeadPriority, 
  ProposalStatus, 
  PaymentStatus, 
  User, 
  UserRole, 
  ActivityLog, 
  ActivityCategory 
} from '@/types';
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
  'New Lead': { bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'text-blue-700', border: 'border-blue-200' },
  'Contacted': { bg: 'bg-purple-50 text-purple-700 border-purple-200', text: 'text-purple-700', border: 'border-purple-200' },
  'Discovery Call': { bg: 'bg-amber-50 text-amber-800 border-amber-200', text: 'text-amber-800', border: 'border-amber-200' },
  'Proposal Sent': { bg: 'bg-orange-50 text-[#B8613A] border-orange-200', text: 'text-[#B8613A]', border: 'border-orange-200' },
  'Negotiation': { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Won': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-700', border: 'border-emerald-200' },
  'In Progress': { bg: 'bg-[#FBF4F0] text-[#0B1F33] border-orange-200', text: 'text-[#0B1F33]', border: 'border-orange-200' },
  'Completed': { bg: 'bg-teal-50 text-teal-700 border-teal-200', text: 'text-teal-700', border: 'border-teal-200' },
  'Lost / Closed': { bg: 'bg-red-50 text-red-700 border-red-200', text: 'text-red-700', border: 'border-red-200' }
};

const ROLE_BADGES: Record<UserRole, { bg: string; text: string; border: string }> = {
  'Owner/Admin': { bg: 'bg-[#0B1F33]', text: 'text-white', border: 'border-[#0B1F33]' },
  'Operations': { bg: 'bg-[#FBF4F0]', text: 'text-[#B8613A]', border: 'border-[#B8613A]/30' },
  'Development': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Creative': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Video': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' }
};

export default function AdminPage() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string>('');
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedLoginUserId, setSelectedLoginUserId] = useState<string>('usr-desvanth');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  // Active Main Navigation Tab
  const [activeTab, setActiveTab] = useState<'pipeline' | 'activity' | 'team' | 'finance'>('pipeline');

  // Gemini AI Intelligence & Copilot State
  const [aiScore, setAiScore] = useState<{ score: number; intent: string; summary: string } | null>(null);
  const [isScoringLead, setIsScoringLead] = useState<boolean>(false);
  const [aiDrafts, setAiDrafts] = useState<string[] | null>(null);
  const [isGeneratingDrafts, setIsGeneratingDrafts] = useState<boolean>(false);
  const [copiedDraftIdx, setCopiedDraftIdx] = useState<number | null>(null);

  // CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedFounderFilter, setSelectedFounderFilter] = useState<string>('all');

  // Activity Log State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState<boolean>(false);
  const [activityCategoryFilter, setActivityCategoryFilter] = useState<string>('all');
  const [activitySearchQuery, setActivitySearchQuery] = useState<string>('');

  // Modals & Drawers
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [leadHistoryModalId, setLeadHistoryModalId] = useState<string | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [manualModalError, setManualModalError] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

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
    assignedTo: 'Desvanth',
    estimatedValue: '₹50,000'
  });

  // Check Session Token on Mount
  useEffect(() => {
    const token = sessionStorage.getItem('kairos_admin_token');
    const storedUserJson = sessionStorage.getItem('kairos_admin_user');

    if (token && storedUserJson) {
      try {
        const user = JSON.parse(storedUserJson);
        setCurrentUser(user);
        setAuthToken(token);
        fetchUsersList(token);
        fetchLeads(token);
        fetchActivityLogs(token);
      } catch {
        sessionStorage.removeItem('kairos_admin_token');
        sessionStorage.removeItem('kairos_admin_user');
        fetchUsersList();
      }
    } else {
      setIsLoadingLeads(false);
      fetchUsersList();
    }
  }, []);

  // Real-time Presence Poller (every 4 seconds, paused when tab is hidden)
  useEffect(() => {
    if (!currentUser) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const startPolling = () => {
      if (interval) return;
      interval = setInterval(() => {
        // BUG-05 FIX: Pass authToken explicitly so the heartbeat is authenticated
        fetchUsersList(authToken || undefined);
      }, 4000);
    };

    const stopPolling = () => {
      if (interval) { clearInterval(interval); interval = null; }
    };

    // SUG-06: Pause polling when browser tab is hidden to avoid unnecessary background requests
    const handleVisibilityChange = () => {
      if (document.hidden) stopPolling();
      else startPolling();
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser, authToken]);

  // Tab switch sync — BUG-06 FIX: Add authToken to dependency array to avoid stale closure
  useEffect(() => {
    if (!currentUser) return;
    if (activeTab === 'team') {
      fetchUsersList();
    } else if (activeTab === 'activity') {
      fetchActivityLogs();
    } else if (activeTab === 'pipeline') {
      fetchLeads();
    }
  }, [activeTab, currentUser, authToken]);

  const fetchUsersList = async (tokenOverride?: string) => {
    try {
      const activeToken = tokenOverride || authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
      const headers: Record<string, string> = {};
      if (activeToken) {
        headers['Authorization'] = `Bearer ${activeToken}`;
      }
      const res = await fetch('/api/auth', { headers });
      const data = await res.json();
      if (data.success && data.users) {
        setAvailableUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch available users:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    try {
      const selectedUser = availableUsers.find((u) => u.id === selectedLoginUserId);
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: selectedLoginUserId,
          email: (selectedUser as any)?.email || selectedLoginUserId,
          password: passwordInput 
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('kairos_admin_token', data.token);
        sessionStorage.setItem('kairos_admin_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setAuthToken(data.token);
        setPasswordInput('');
        fetchUsersList(data.token);
        fetchLeads(data.token);
        fetchActivityLogs(data.token);
      } else {
        setAuthError(data.message || 'Invalid administrative credentials.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (authToken) {
        await fetch('/api/auth', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authToken}` }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
    sessionStorage.removeItem('kairos_admin_token');
    sessionStorage.removeItem('kairos_admin_user');
    setCurrentUser(null);
    setAuthToken('');
    setLeads([]);
    setActivityLogs([]);
    fetchUsersList();
  };

  const fetchLeads = async (tokenOverride?: string) => {
    const activeToken = tokenOverride || authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
    if (!activeToken) return;

    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
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

  const fetchActivityLogs = async (tokenOverride?: string) => {
    const activeToken = tokenOverride || authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
    if (!activeToken) return;

    setIsLoadingLogs(true);
    try {
      const res = await fetch('/api/activity', {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setActivityLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to fetch activity logs:', err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    setAiScore(null);
    setAiDrafts(null);
    setCopiedDraftIdx(null);
  }, [activeLead?.id]);

  const handleScoreLead = async (lead: Lead) => {
    const activeToken = authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
    if (!activeToken || !lead) return;
    setIsScoringLead(true);
    try {
      const res = await fetch('/api/ai/score-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify({
          name: lead.name,
          company: lead.company,
          description: lead.description,
          budget: lead.budget || lead.estimatedValue,
          timeline: lead.timeline,
          services: lead.services
        })
      });
      const data = await res.json();
      if (data.success && data.score) {
        setAiScore(data.score);
      }
    } catch (err) {
      console.error('Failed to score lead with AI:', err);
    } finally {
      setIsScoringLead(false);
    }
  };

  const handleGenerateDrafts = async (lead: Lead) => {
    const activeToken = authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
    if (!activeToken || !lead) return;
    setIsGeneratingDrafts(true);
    try {
      const res = await fetch('/api/ai/whatsapp-drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify({
          name: lead.name,
          company: lead.company,
          description: lead.description,
          budget: lead.budget || lead.estimatedValue,
          services: lead.services,
          assignedTo: lead.assignedTo || currentUser?.name
        })
      });
      const data = await res.json();
      if (data.success && data.drafts) {
        setAiDrafts(data.drafts);
      }
    } catch (err) {
      console.error('Failed to generate AI WhatsApp drafts:', err);
    } finally {
      setIsGeneratingDrafts(false);
    }
  };

  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    // 1. Optimistic Instant UI Update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l)));
    if (activeLead && activeLead.id === id) {
      setActiveLead((prev) => (prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null));
    }

    try {
      const activeToken = authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
        },
        body: JSON.stringify({ id, ...updates })
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        if (activeLead && activeLead.id === id) {
          setActiveLead(data.lead);
        }
        fetchActivityLogs();
      }
    } catch (err) {
      console.error('Error updating lead:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead? This action is recorded in the permanent audit trail.')) return;
    
    // Optimistic remove
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (activeLead?.id === id) setActiveLead(null);

    try {
      const activeToken = authToken || (typeof window !== 'undefined' ? sessionStorage.getItem('kairos_admin_token') : null);
      const res = await fetch(`/api/leads?id=${id}`, { 
        method: 'DELETE',
        headers: { 
          ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchActivityLogs();
      } else {
        alert(data.message || 'Permission denied.');
        fetchLeads(); // rollback on failure
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      fetchLeads(); // rollback on failure
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead || !newNoteContent.trim()) return;

    const authorName = currentUser?.name || 'Desvanth';
    const authorId = currentUser?.id || 'usr-desvanth';

    const newNote = {
      id: `note-${Date.now()}`,
      author: authorName,
      authorId: authorId,
      content: newNoteContent.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedNotes = [...(activeLead.notes || []), newNote];
    setNewNoteContent('');
    await handleUpdateLead(activeLead.id, { notes: updatedNotes });
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualModalError('');
    setIsSubmittingLead(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
        },
        body: JSON.stringify(manualFormData)
      });
      const data = await res.json();
      if (res.ok && data.success && data.lead) {
        setLeads((prev) => [data.lead, ...prev.filter((l) => l.id !== data.lead.id)]);
        setIsManualModalOpen(false);
        setManualFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          services: ['Web Development'],
          description: '',
          budget: '$5,000 – $10,000',
          timeline: '1 – 2 Months',
          priority: 'Medium',
          assignedTo: availableUsers[0]?.name || 'Desvanth',
          estimatedValue: '₹50,000'
        });
        fetchLeads();
        fetchActivityLogs();
      } else {
        setManualModalError(data.message || 'Failed to save lead.');
      }
    } catch (err) {
      console.error('Failed to create manual lead:', err);
      setManualModalError('Connection error while saving lead. Please try again.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Services', 'Status', 'Priority', 'Assigned To', 'Est Value', 'Created By', 'Last Updated By', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      l.email || '',
      l.phone || '',
      `"${Array.isArray(l.services) ? l.services.join(', ') : (l.services || '')}"`,
      l.status || 'New Lead',
      l.priority || 'Medium',
      l.assignedTo || 'Unassigned',
      l.estimatedValue || 'N/A',
      l.createdBy ? `${l.createdBy.name} (${l.createdBy.role})` : 'System',
      l.updatedBy ? `${l.updatedBy.name} (${l.updatedBy.role})` : 'System',
      l.createdAt || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `kairos-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

  // Filtered Activity Logs
  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      const matchesCat = activityCategoryFilter === 'all' || log.category === activityCategoryFilter;
      const q = activitySearchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        log.userName.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.entityTitle.toLowerCase().includes(q) ||
        log.details.summary.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [activityLogs, activityCategoryFilter, activitySearchQuery]);

  // Lead History Modal Logs
  const activeLeadHistoryLogs = useMemo(() => {
    if (!leadHistoryModalId) return [];
    return activityLogs.filter((l) => l.entityId === leadHistoryModalId);
  }, [activityLogs, leadHistoryModalId]);

  // Executive Telemetry Stats
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New Lead').length;
    const activePipeline = leads.filter((l) => ['Discovery Call', 'Proposal Sent', 'Negotiation'].includes(l.status)).length;
    const wonCount = leads.filter((l) => l.status === 'Won').length;

    return { total, newCount, activePipeline, wonCount };
  }, [leads]);

  // Global Keyboard Shortcuts for Founder Efficiency
  useEffect(() => {
    if (!currentUser) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input, textarea, or select
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement)?.blur();
        }
        return;
      }

      if (e.key === 'Escape') {
        setActiveLead(null);
        setIsQuoteModalOpen(false);
        setIsManualModalOpen(false);
        setLeadHistoryModalId(null);
        return;
      }

      // 'j' to select next lead, 'k' to select previous lead
      if (e.key === 'j' || e.key === 'J') {
        if (filteredLeads.length === 0) return;
        const currentIndex = activeLead ? filteredLeads.findIndex((l) => l.id === activeLead.id) : -1;
        const nextIndex = (currentIndex + 1) % filteredLeads.length;
        setActiveLead(filteredLeads[nextIndex]);
      } else if (e.key === 'k' || e.key === 'K') {
        if (filteredLeads.length === 0) return;
        const currentIndex = activeLead ? filteredLeads.findIndex((l) => l.id === activeLead.id) : 0;
        const prevIndex = (currentIndex - 1 + filteredLeads.length) % filteredLeads.length;
        setActiveLead(filteredLeads[prevIndex]);
      } else if ((e.key === 'n' || e.key === 'N') && activeLead) {
        // Advance stage
        const currentIndex = PIPELINE_STAGES.indexOf(activeLead.status);
        if (currentIndex !== -1 && currentIndex < PIPELINE_STAGES.length - 1) {
          handleUpdateLead(activeLead.id, { status: PIPELINE_STAGES[currentIndex + 1] });
        }
      } else if ((e.key === 'w' || e.key === 'W') && activeLead && activeLead.phone) {
        // Open WhatsApp
        const cleanPhone = activeLead.phone.replace(/[^0-9]/g, '');
        if (cleanPhone) {
          window.open(`https://wa.me/${cleanPhone}`, '_blank');
        }
      } else if ((e.key === 'p' || e.key === 'P') && activeLead) {
        // Open proposal modal
        setIsQuoteModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser, activeLead, filteredLeads]);

  // ==========================================
  // 1. MULTI-USER LOGIN SCREEN
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F7F7F4] text-[#111827] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-white border border-[#D9E0E5] shadow-elevated-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <Logo size={42} variant="mark" theme="light" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF4F0] border border-[#B8613A]/20 text-[11px] font-mono text-[#B8613A] uppercase tracking-widest mb-3 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founder Identity & Audit OS</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-[#0B1F33]">
              Kairos Flow Operations OS
            </h1>
            <p className="text-[#5B6875] text-xs sm:text-sm mt-1">
              Select your founder account to authenticate and sign audit records.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Account Selector Cards */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#5B6875] tracking-wider mb-2 font-semibold">
                Select Founder Account
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableUsers.map((u) => {
                  const isSelected = selectedLoginUserId === u.id;
                  const roleStyle = ROLE_BADGES[u.role] || ROLE_BADGES['Development'];

                  return (
                    <div
                      key={u.id}
                      onClick={() => setSelectedLoginUserId(u.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FBF4F0] border-[#B8613A] ring-1 ring-[#B8613A]/40 shadow-sm'
                          : 'bg-[#F7F7F4] border-[#D9E0E5] hover:border-[#B8613A]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-[#0B1F33]">{u.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                          {u.role}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#5B6875] truncate">{u.email}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#5B6875] uppercase tracking-wider font-semibold">Security Key / Password</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your account password..."
                  className="w-full px-4 py-3 text-sm rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A] placeholder:text-[#5B6875] pr-11 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6875] hover:text-[#0B1F33] transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAuthLoading ? (
                <span>Authenticating Identity...</span>
              ) : (
                <>
                  <Key className="w-4 h-4 text-[#B8613A]" />
                  <span>Authenticate as {availableUsers.find(u => u.id === selectedLoginUserId)?.name || 'Founder'}</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] font-mono text-[#5B6875]">
            Kairos Flow Agency • Server-Signed Immutable Audit Trail
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED EXECUTIVE DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#111827] flex flex-col font-sans">
      {/* Top Operations Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#D9E0E5] px-4 sm:px-8 py-3.5 shadow-subtle-card">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Brand & Active User Identity */}
          <div className="flex items-center gap-3.5">
            <Logo size={32} variant="mark" theme="light" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-[#0B1F33] font-display tracking-tight">
                  Kairos Flow Operations OS
                </h1>
                <span className="px-2 py-0.5 rounded bg-[#FBF4F0] text-[#B8613A] text-[10px] font-mono font-bold border border-[#B8613A]/20">
                  AUDIT ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#5B6875] font-mono mt-0.5">
                <span>Signed in as <strong className="text-[#0B1F33] font-semibold">{currentUser.name}</strong></span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold border ${ROLE_BADGES[currentUser.role]?.bg} ${ROLE_BADGES[currentUser.role]?.text} ${ROLE_BADGES[currentUser.role]?.border}`}>
                  {currentUser.role}
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center Tabs Navigation */}
          <div className="flex items-center bg-[#F7F7F4] border border-[#D9E0E5] rounded-xl p-1 font-mono">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Pipeline & CRM</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('activity');
                fetchActivityLogs();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'activity'
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Activity Log</span>
              {activityLogs.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#B8613A] text-white text-[10px] font-mono">
                  {activityLogs.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('team');
                fetchUsersList();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'team'
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Team & Roles</span>
            </button>

            <button
              onClick={() => setActiveTab('finance')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'finance'
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Revenue & Stats</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 font-mono">
            {activeTab === 'pipeline' && (
              <>
                <button
                  onClick={() => setIsManualModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B8613A]" />
                  <span>Add Lead</span>
                </button>

                <button
                  onClick={exportCSV}
                  disabled={leads.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B1F33] hover:text-[#B8613A] bg-white hover:bg-[#FBF4F0] border border-[#D9E0E5] rounded-lg transition-colors disabled:opacity-40"
                >
                  <Download className="w-3.5 h-3.5 text-[#B8613A]" />
                  <span>CSV</span>
                </button>

                <div className="flex items-center bg-[#F7F7F4] border border-[#D9E0E5] rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`p-1.5 rounded text-xs transition-colors ${
                      viewMode === 'kanban' ? 'bg-white text-[#0B1F33] shadow-sm font-semibold' : 'text-[#5B6875] hover:text-[#0B1F33]'
                    }`}
                    title="Kanban View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded text-xs transition-colors ${
                      viewMode === 'table' ? 'bg-white text-[#0B1F33] shadow-sm font-semibold' : 'text-[#5B6875] hover:text-[#0B1F33]'
                    }`}
                    title="Table View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-mono text-[#5B6875] hover:text-red-600 transition-colors"
              title="Sign out and switch founder"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN BODY AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* ==================================================== */}
        {/* TAB 1: PIPELINE & CLIENT CRM                         */}
        {/* ==================================================== */}
        {activeTab === 'pipeline' && (
          <>
            {/* Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card">
                <div className="text-[11px] font-mono text-[#5B6875] uppercase tracking-wider mb-1 font-semibold">Total Inquiries</div>
                <div className="text-3xl font-bold font-display text-[#0B1F33]">{stats.total}</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card">
                <div className="text-[11px] font-mono text-blue-600 uppercase tracking-wider mb-1 font-semibold">New Intake</div>
                <div className="text-3xl font-bold font-display text-blue-600">{stats.newCount}</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card">
                <div className="text-[11px] font-mono text-[#B8613A] uppercase tracking-wider mb-1 font-semibold">Active Pipeline</div>
                <div className="text-3xl font-bold font-display text-[#B8613A]">{stats.activePipeline}</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card">
                <div className="text-[11px] font-mono text-emerald-600 uppercase tracking-wider mb-1 font-semibold">Won Projects</div>
                <div className="text-3xl font-bold font-display text-emerald-600">{stats.wonCount}</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white border border-[#D9E0E5] rounded-2xl shadow-subtle-card">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#5B6875] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client name, company, email, or phone..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A] placeholder:text-[#5B6875]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono">
                <select
                  value={selectedStageFilter}
                  onChange={(e) => setSelectedStageFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                >
                  <option value="all">All Stages</option>
                  {PIPELINE_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={selectedPriorityFilter}
                  onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>

                <select
                  value={selectedFounderFilter}
                  onChange={(e) => setSelectedFounderFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                >
                  <option value="all">All Assigned Founders</option>
                  {availableUsers.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>

                {/* Keyboard Shortcuts Helper */}
                <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono text-[#5B6875] bg-[#F7F7F4] rounded-lg border border-[#D9E0E5]">
                  <span className="font-bold text-[#0B1F33]">Shortcuts:</span>
                  <span><kbd className="px-1 bg-white border border-[#D9E0E5] rounded">J</kbd>/<kbd className="px-1 bg-white border border-[#D9E0E5] rounded">K</kbd> Nav</span>
                  <span><kbd className="px-1 bg-white border border-[#D9E0E5] rounded">N</kbd> Next</span>
                  <span><kbd className="px-1 bg-white border border-[#D9E0E5] rounded">W</kbd> WhatsApp</span>
                  <span><kbd className="px-1 bg-white border border-[#D9E0E5] rounded">P</kbd> Quote</span>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredLeads.length === 0 && (
              <div className="p-12 sm:p-16 text-center rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card my-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF4F0] border border-orange-200 flex items-center justify-center text-[#B8613A] mx-auto mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F33] font-display mb-2">No Client Leads Found</h3>
                <p className="text-[#5B6875] text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Inquiries submitted through the website contact form, AI Consultant, or logged manually will appear here with full audit history.
                </p>
                <button
                  onClick={() => setIsManualModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B8613A]" />
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
                    <div key={stage} className="flex flex-col rounded-2xl bg-white border border-[#D9E0E5] p-3.5 min-w-[260px] shadow-subtle-card">
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#D9E0E5] mb-3">
                        <span className={`text-xs font-mono font-bold ${color.text} uppercase tracking-wider`}>
                          {stage}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#F7F7F4] text-[10px] font-mono text-[#5B6875] border border-[#D9E0E5] font-semibold">
                          {stageLeads.length}
                        </span>
                      </div>

                      {/* Cards */}
                      <div className="space-y-3 flex-1">
                        {stageLeads.map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => setActiveLead(lead)}
                            className="group p-4 rounded-xl bg-[#F7F7F4] hover:bg-white border border-[#D9E0E5] hover:border-[#B8613A]/50 transition-all cursor-pointer shadow-sm hover:shadow-hover-card space-y-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-xs font-bold text-[#0B1F33] group-hover:text-[#B8613A] transition-colors font-display">
                                  {lead.name}
                                </h4>
                                <p className="text-[11px] text-[#5B6875] font-mono truncate max-w-[150px]">
                                  {lead.company}
                                </p>
                              </div>
                              {lead.priority && (
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                                    lead.priority === 'High'
                                      ? 'bg-red-50 text-red-700 border border-red-200'
                                      : lead.priority === 'Medium'
                                      ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                                  }`}
                                >
                                  {lead.priority}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {lead.services.slice(0, 2).map((s) => (
                                <span key={s} className="px-1.5 py-0.5 rounded bg-white text-[9px] font-mono text-[#111827] border border-[#D9E0E5]">
                                  {s}
                                </span>
                              ))}
                            </div>

                            {/* Accountability & Audit Pill */}
                            <div className="pt-2.5 border-t border-[#D9E0E5] text-[9px] font-mono space-y-1 text-[#5B6875]">
                              <div className="flex items-center justify-between">
                                <span>Assigned: <strong className="text-[#0B1F33]">{lead.assignedTo || 'Unassigned'}</strong></span>
                                <span className="text-[#B8613A] font-semibold">{lead.estimatedValue || lead.budget || 'TBD'}</span>
                              </div>

                              <div className="text-[9px] text-[#5B6875] flex items-center justify-between">
                                <span>Updated by <span className="text-[#0B1F33] font-medium">{lead.updatedBy?.name || 'Desvanth'}</span></span>
                                <span>{formatTimeAgo(lead.updatedAt)}</span>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center justify-between pt-1 text-[10px] font-mono border-t border-[#D9E0E5]/60">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLeadHistoryModalId(lead.id);
                                }}
                                className="inline-flex items-center gap-1 text-[10px] text-[#5B6875] hover:text-[#B8613A] transition-colors"
                              >
                                <History className="w-3 h-3" />
                                <span>History</span>
                              </button>

                              <div className="flex items-center gap-1.5">
                                {(() => {
                                  const stageIdx = PIPELINE_STAGES.indexOf(lead.status);
                                  const nextStage = stageIdx >= 0 && stageIdx < PIPELINE_STAGES.length - 1 && !['Completed', 'Lost / Closed'].includes(lead.status)
                                    ? PIPELINE_STAGES[stageIdx + 1]
                                    : null;

                                  if (!nextStage) return null;
                                  return (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateLead(lead.id, { status: nextStage });
                                      }}
                                      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-white hover:bg-[#FBF4F0] text-[9px] font-bold text-[#B8613A] border border-[#D9E0E5] hover:border-[#B8613A] transition-colors shadow-xs"
                                      title={`Advance to ${nextStage}`}
                                    >
                                      <span>→ {nextStage}</span>
                                    </button>
                                  );
                                })()}

                                <a
                                  href={generateWhatsAppLink(lead.phone.replace(/[^0-9]/g, ''))}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1 text-[#5B6875] hover:text-emerald-600 transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                </a>
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
              <div className="rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#F7F7F4] border-b border-[#D9E0E5] font-mono uppercase text-[10px] text-[#5B6875]">
                      <tr>
                        <th className="p-4">Client & Company</th>
                        <th className="p-4">Services</th>
                        <th className="p-4">Stage</th>
                        <th className="p-4">Priority</th>
                        <th className="p-4">Assigned Lead</th>
                        <th className="p-4">Value / Budget</th>
                        <th className="p-4">Accountability</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9E0E5]">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => setActiveLead(lead)}
                          className="hover:bg-[#FBF4F0] transition-colors cursor-pointer"
                        >
                          <td className="p-4">
                            <div className="font-bold text-[#0B1F33]">{lead.name}</div>
                            <div className="text-[11px] text-[#5B6875] font-mono">{lead.company} • {lead.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {lead.services.map((s) => (
                                <span key={s} className="px-1.5 py-0.5 rounded bg-[#F7F7F4] text-[9px] font-mono text-[#111827] border border-[#D9E0E5]">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-mono font-semibold border ${STAGE_COLORS[lead.status].bg} ${STAGE_COLORS[lead.status].text} ${STAGE_COLORS[lead.status].border}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-[11px]">{lead.priority || 'Medium'}</span>
                          </td>
                          <td className="p-4 font-mono text-[11px] text-[#5B6875]">
                            {lead.assignedTo || 'Desvanth'}
                          </td>
                          <td className="p-4 font-mono text-[11px] text-[#B8613A] font-semibold">
                            {lead.estimatedValue || lead.budget || 'TBD'}
                          </td>
                          <td className="p-4 font-mono text-[10px] text-[#5B6875]">
                            <div>Created: <span className="text-[#0B1F33] font-medium">{lead.createdBy?.name || 'Desvanth'}</span></div>
                            <div>Updated: <span className="text-[#B8613A] font-medium">{lead.updatedBy?.name || 'Desvanth'}</span> ({formatTimeAgo(lead.updatedAt)})</div>
                          </td>
                          <td className="p-4 text-right space-x-2 font-mono" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => setLeadHistoryModalId(lead.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F7F7F4] hover:bg-white border border-[#D9E0E5] text-[10px] font-mono text-[#5B6875] hover:text-[#0B1F33]"
                            >
                              <History className="w-3 h-3 text-[#B8613A]" />
                              <span>Diff</span>
                            </button>

                            <a
                              href={generateWhatsAppLink(lead.phone.replace(/[^0-9]/g, ''))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-semibold transition-colors"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
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
          </>
        )}

        {/* ==================================================== */}
        {/* TAB 2: ACTIVITY AUDIT LOG & CHANGE HISTORY           */}
        {/* ==================================================== */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white border border-[#D9E0E5] rounded-2xl shadow-subtle-card">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#5B6875] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Search audit trail by user, action, client, or details..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A] placeholder:text-[#5B6875]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono">
                {(['all', 'leads', 'projects', 'payments', 'users', 'auth'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActivityCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                      activityCategoryFilter === cat
                        ? 'bg-[#0B1F33] text-white font-semibold shadow-sm'
                        : 'bg-[#F7F7F4] text-[#5B6875] hover:text-[#0B1F33] border border-[#D9E0E5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Logs Timeline Feed */}
            {filteredLogs.length === 0 ? (
              <div className="p-12 sm:p-16 text-center rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card my-6">
                <Activity className="w-8 h-8 text-[#5B6875] mx-auto mb-2 opacity-50" />
                <h3 className="text-base font-bold text-[#0B1F33] font-mono">No Audit Records Found</h3>
                <p className="text-xs text-[#5B6875] mt-1">Actions performed by team founders will be recorded here in real time.</p>
              </div>
            ) : (
              <div className="rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card overflow-hidden divide-y divide-[#D9E0E5]">
                {filteredLogs.map((log) => {
                  const roleBadge = ROLE_BADGES[log.userRole] || ROLE_BADGES['Development'];

                  return (
                    <div key={log.id} className="p-5 sm:p-6 hover:bg-[#FBF4F0]/50 transition-colors space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {/* User & Action */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#0B1F33] text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                            {log.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#0B1F33] font-display">{log.userName}</span>
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold border ${roleBadge.bg} ${roleBadge.text} ${roleBadge.border}`}>
                                {log.userRole}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#F7F7F4] text-[#0B1F33] text-[10px] font-mono font-semibold border border-[#D9E0E5]">
                                {log.action}
                              </span>
                            </div>
                            <div className="text-xs text-[#5B6875] font-mono mt-0.5">
                              Target: <strong className="text-[#0B1F33]">{log.entityTitle}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div className="text-right text-xs font-mono text-[#5B6875]">
                          <div>{formatDate(log.timestamp)}</div>
                          <div className="text-[10px] text-[#5B6875]">{formatTimeAgo(log.timestamp)}</div>
                        </div>
                      </div>

                      {/* Summary & Changes Diff Box */}
                      <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] space-y-2">
                        <p className="text-xs text-[#111827] leading-relaxed">{log.details.summary}</p>

                        {/* Field Diff Badges (Before -> After) */}
                        {log.details.changes && log.details.changes.length > 0 && (
                          <div className="space-y-1.5 pt-2 border-t border-[#D9E0E5]">
                            {log.details.changes.map((ch, idx) => (
                              <div key={idx} className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                                <span className="text-[#5B6875] font-semibold">{ch.label}:</span>
                                <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 line-through">
                                  {String(ch.before)}
                                </span>
                                <ArrowRight className="w-3 h-3 text-[#B8613A]" />
                                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                  {String(ch.after)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: TEAM ACCOUNTS & PERMISSIONS MATRIX            */}
        {/* ==================================================== */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF4F0] border border-[#B8613A]/20 text-[11px] font-mono text-[#B8613A] uppercase tracking-widest mb-2 font-semibold">
                    <Shield className="w-3.5 h-3.5 text-[#B8613A]" />
                    <span>FOUNDER IDENTITIES & RBAC</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#0B1F33]">Founder Accounts & Role Permissions</h3>
                  <p className="text-xs sm:text-sm text-[#5B6875] mt-1">
                    Individual accounts for each of the 5 founding leads with server-enforced role access and live presence tracking.
                  </p>
                </div>
                <button
                  onClick={() => fetchUsersList()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7F7F4] hover:bg-[#FBF4F0] text-[#0B1F33] hover:text-[#B8613A] border border-[#D9E0E5] text-xs font-mono font-semibold transition-colors shadow-sm self-start sm:self-center"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#B8613A]" />
                  <span>Sync Presence</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#D9E0E5]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#F7F7F4] border-b border-[#D9E0E5] font-mono uppercase text-[10px] text-[#5B6875]">
                    <tr>
                      <th className="p-4">Founder / Lead</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Permissions Scope</th>
                      <th className="p-4">Live Status</th>
                      <th className="p-4">Last Authenticated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9E0E5] bg-white">
                    {availableUsers.map((user) => {
                      const roleBadge = ROLE_BADGES[user.role] || ROLE_BADGES['Development'];
                      const isUserOnline = user.isOnline || user.id === currentUser.id;

                      return (
                        <tr key={user.id} className="hover:bg-[#FBF4F0]/50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-[#0B1F33] flex items-center gap-2 font-display">
                              <span>{user.name}</span>
                              {user.id === currentUser.id && (
                                <span className="px-1.5 py-0.2 rounded bg-[#0B1F33] text-white text-[9px] font-mono">YOU</span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#5B6875] font-mono">{user.email}</div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${roleBadge.bg} ${roleBadge.text} ${roleBadge.border}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-[11px] text-[#5B6875]">
                            {user.role === 'Owner/Admin' && 'Everything • User Mgmt • Audit Logs • Delete Records • Finance'}
                            {user.role === 'Operations' && 'Leads • Clients • Finance • Invoices • Projects'}
                            {user.role === 'Development' && 'Projects • Technical Architecture • Assigned Leads'}
                            {user.role === 'Creative' && 'Projects • Design Systems • Content • Portfolio'}
                            {user.role === 'Video' && 'Video Projects • Media Assets • Production Shoots'}
                          </td>
                          <td className="p-4 font-mono text-[11px]">
                            {isUserOnline ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Active Now</span>
                              </span>
                            ) : user.lastLogin ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[#5B6875] border border-slate-200 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                <span>Offline</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[#5B6875] font-mono text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <span>Never Logged In</span>
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-[11px]">
                            {isUserOnline ? (
                              <span className="text-emerald-700 font-bold">Active Session</span>
                            ) : user.lastLogin ? (
                              <div className="text-[#5B6875]">
                                <div>{formatDate(user.lastLogin)}</div>
                                <div className="text-[10px] text-[#5B6875]/70">{formatTimeAgo(user.lastLogin)}</div>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic text-[10px]">Pending first sign-in</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: REVENUE PIPELINE & FINANCIAL ANALYTICS        */}
        {/* ==================================================== */}
        {activeTab === 'finance' && (
          <div className="animate-in fade-in duration-200">
            <RevenueDashboard leads={leads} />
          </div>
        )}
      </main>

      {/* LEAD OPERATIONS DRAWER / MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-[#0B1F33]/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-white border-l border-[#D9E0E5] p-6 sm:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#D9E0E5]">
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${STAGE_COLORS[activeLead.status].bg} ${STAGE_COLORS[activeLead.status].text} ${STAGE_COLORS[activeLead.status].border}`}>
                    {activeLead.status}
                  </span>
                  <h2 className="text-2xl font-bold font-display text-[#0B1F33] mt-2">{activeLead.name}</h2>
                  <p className="text-xs text-[#5B6875] font-mono">{activeLead.company} • {activeLead.email} • {activeLead.phone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FBF4F0] border border-[#B8613A]/40 text-xs font-mono font-bold text-[#B8613A] hover:bg-[#B8613A] hover:text-white transition-all shadow-xs"
                    title="Generate Branded Proposal Quote"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Proposal Sheet</span>
                  </button>

                  <button
                    onClick={() => setLeadHistoryModalId(activeLead.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F7F7F4] border border-[#D9E0E5] text-xs font-mono text-[#0B1F33] hover:border-[#B8613A]"
                    title="View Change History"
                  >
                    <History className="w-3.5 h-3.5 text-[#B8613A]" />
                    <span>Audit Trail</span>
                  </button>

                  <button
                    onClick={() => setActiveLead(null)}
                    className="p-1.5 text-[#5B6875] hover:text-[#0B1F33] hover:bg-[#F7F7F4] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Accountability Strip */}
              <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] text-[10px] font-mono text-[#5B6875] flex items-center justify-between">
                <div>
                  Created by: <strong className="text-[#0B1F33]">{activeLead.createdBy?.name || 'Desvanth'}</strong> ({formatDate(activeLead.createdAt)})
                </div>
                <div>
                  Last edited by: <strong className="text-[#B8613A]">{activeLead.updatedBy?.name || 'Desvanth'}</strong>
                </div>
              </div>

              {/* Direct Quick WhatsApp / Call */}
              <div className="flex items-center gap-3 font-mono">
                <a
                  href={generateWhatsAppLink(activeLead.phone.replace(/[^0-9]/g, ''))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`mailto:${activeLead.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B1F33] hover:text-[#B8613A] bg-[#F7F7F4] border border-[#D9E0E5] rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B8613A]" />
                  <span>Send Email</span>
                </a>
              </div>

              {/* WhatsApp Quick Response Templates */}
              <div className="p-3.5 rounded-xl bg-[#FBF4F0] border border-[#B8613A]/25 space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-[11px] text-[#B8613A] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>1-Click WhatsApp Quick Templates</span>
                  </span>
                  <span className="text-[9px] text-[#5B6875]">Personalized & Ready</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a
                    href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, '').replace(/^(\d{10})$/, '91$1')}?text=${encodeURIComponent(
                      `Hi ${activeLead.name}, this is ${currentUser?.name || 'Desvanth'} from Kairos Flow Agency! Thank you for inquiring about your ${Array.isArray(activeLead.services) ? activeLead.services.join(' & ') : activeLead.services} project. Would you be open for a quick 15-minute discovery call this week to align on technical scope and milestones?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-[#D9E0E5] hover:border-emerald-500 text-left transition-colors group shadow-2xs"
                  >
                    <div className="text-[10px] font-bold text-[#0B1F33] group-hover:text-emerald-700 flex items-center gap-1">
                      <span>📞 Discovery</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[9px] text-[#5B6875] mt-0.5">Book 15-min scope call</div>
                  </a>

                  <a
                    href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, '').replace(/^(\d{10})$/, '91$1')}?text=${encodeURIComponent(
                      `Hi ${activeLead.name}, to prepare an accurate milestone estimate and architecture for ${activeLead.company || 'your project'}, could you share any design references, specific feature requirements, or target launch dates?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-[#D9E0E5] hover:border-emerald-500 text-left transition-colors group shadow-2xs"
                  >
                    <div className="text-[10px] font-bold text-[#0B1F33] group-hover:text-emerald-700 flex items-center gap-1">
                      <span>📋 Specs</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[9px] text-[#5B6875] mt-0.5">Request tech references</div>
                  </a>

                  <a
                    href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, '').replace(/^(\d{10})$/, '91$1')}?text=${encodeURIComponent(
                      `Hi ${activeLead.name}, following up from Kairos Flow Agency regarding the project proposal we prepared for ${activeLead.company || 'you'}. Let me know if you have any questions or would like to adjust the sprint schedule!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-[#D9E0E5] hover:border-emerald-500 text-left transition-colors group shadow-2xs"
                  >
                    <div className="text-[10px] font-bold text-[#0B1F33] group-hover:text-emerald-700 flex items-center gap-1">
                      <span>🚀 Follow-up</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[9px] text-[#5B6875] mt-0.5">Check proposal status</div>
                  </a>
                </div>
              </div>

              {/* Operations Stage & Business Controls */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#5B6875] tracking-wider mb-1 font-semibold">
                    Pipeline Stage
                  </label>
                  <select
                    value={activeLead.status}
                    onChange={(e) => handleUpdateLead(activeLead.id, { status: e.target.value as LeadStatus })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  >
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#5B6875] tracking-wider mb-1 font-semibold">
                    Lead Priority
                  </label>
                  <select
                    value={activeLead.priority || 'Medium'}
                    onChange={(e) => handleUpdateLead(activeLead.id, { priority: e.target.value as LeadPriority })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#5B6875] tracking-wider mb-1 font-semibold">
                    Assigned Founder
                  </label>
                  <select
                    value={activeLead.assignedTo || 'Desvanth'}
                    onChange={(e) => handleUpdateLead(activeLead.id, { assignedTo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  >
                    {availableUsers.map((f) => (
                      <option key={f.id} value={f.name}>{f.name} ({f.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#5B6875] tracking-wider mb-1 font-semibold">
                    Expected Deal Value
                  </label>
                  <input
                    type="text"
                    value={activeLead.estimatedValue || ''}
                    onChange={(e) => handleUpdateLead(activeLead.id, { estimatedValue: e.target.value })}
                    placeholder="e.g. ₹85,000 / $2,000"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  />
                </div>
              </div>

              {/* Project Brief */}
              <div className="p-4 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] space-y-3">
                <div className="text-xs font-mono uppercase text-[#5B6875] tracking-wider font-semibold">Project Brief</div>
                <p className="text-xs text-[#111827] leading-relaxed whitespace-pre-wrap">{activeLead.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#D9E0E5]">
                  {activeLead.services.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-white text-[10px] font-mono text-[#0B1F33] border border-[#D9E0E5]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gemini AI Intelligence & Copilot Panel */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#132B45] text-white space-y-3 font-mono shadow-md border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#B8613A] flex items-center justify-center text-white">
                      <BrainCircuit className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-display">Gemini AI Lead Copilot</span>
                      <span className="text-[9px] text-slate-300 ml-2">gemini-2.0-flash</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isScoringLead}
                      onClick={() => handleScoreLead(activeLead)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition-all disabled:opacity-50"
                    >
                      {isScoringLead ? <Loader2 className="w-3 h-3 animate-spin text-[#B8613A]" /> : <Sparkles className="w-3 h-3 text-[#B8613A]" />}
                      <span>{isScoringLead ? 'Scoring...' : 'Score Lead'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isGeneratingDrafts}
                      onClick={() => handleGenerateDrafts(activeLead)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#B8613A] hover:bg-[#a25330] text-[10px] font-bold text-white transition-all disabled:opacity-50 shadow-xs"
                    >
                      {isGeneratingDrafts ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      <span>{isGeneratingDrafts ? 'Drafting...' : 'AI Pitches'}</span>
                    </button>
                  </div>
                </div>

                {/* AI Score Display */}
                {aiScore && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-300">Quality Score:</span>
                        <span className="text-sm font-bold text-[#B8613A]">{aiScore.score}/10</span>
                        <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#B8613A] rounded-full"
                            style={{ width: `${aiScore.score * 10}%` }}
                          />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white border border-white/15">
                        {aiScore.intent}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-200 font-sans leading-relaxed">
                      &ldquo;{aiScore.summary}&rdquo;
                    </p>
                  </div>
                )}

                {/* AI WhatsApp Drafts Display */}
                {aiDrafts && aiDrafts.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10 animate-in fade-in duration-200">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold flex items-center justify-between">
                      <span>3 Tailored WhatsApp Pitches</span>
                      <span className="text-[9px] text-[#B8613A]">Click to send or copy</span>
                    </div>
                    <div className="space-y-2">
                      {aiDrafts.map((draft, idx) => {
                        const cleanPhone = activeLead.phone.replace(/[^0-9]/g, '').replace(/^(\d{10})$/, '91$1');
                        const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(draft)}`;
                        const isCopied = copiedDraftIdx === idx;

                        return (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs space-y-2">
                            <p className="text-[11px] text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                              {draft}
                            </p>
                            <div className="flex items-center justify-between pt-1 border-t border-white/5">
                              <span className="text-[9px] text-slate-400">Option 0{idx + 1}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(draft);
                                    setCopiedDraftIdx(idx);
                                    setTimeout(() => setCopiedDraftIdx(null), 2000);
                                  }}
                                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[9px] text-white flex items-center gap-1 transition-colors"
                                >
                                  {isCopied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                                </button>
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-[9px] font-bold text-white flex items-center gap-1 transition-colors"
                                >
                                  <MessageCircle className="w-2.5 h-2.5" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Internal Notes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#5B6875] tracking-wider font-semibold">
                    Internal Operations Thread
                  </span>
                  <span className="text-[10px] font-mono text-[#5B6875]">{activeLead.notes?.length || 0} entries</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeLead.notes && activeLead.notes.length > 0 ? (
                    activeLead.notes.map((note) => (
                      <div key={note.id} className="p-3 rounded-lg bg-[#F7F7F4] border border-[#D9E0E5] text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#5B6875]">
                          <span className="font-bold text-[#0B1F33]">{note.author}</span>
                          <span>{formatTimeAgo(note.createdAt)}</span>
                        </div>
                        <p className="text-[#111827] text-xs leading-relaxed">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#5B6875] italic p-2">No internal notes yet.</p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 font-mono">
                  <input
                    type="text"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder={`Log note as ${currentUser.name}...`}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A] placeholder:text-[#5B6875]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>

            {/* Footer Delete Action (Only for Owner/Admin) */}
            <div className="pt-6 border-t border-[#D9E0E5] flex items-center justify-between mt-6">
              {currentUser.role === 'Owner/Admin' ? (
                <button
                  type="button"
                  onClick={() => handleDeleteLead(activeLead.id)}
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-mono transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              ) : (
                <span className="text-[10px] font-mono text-[#5B6875]">Deletion restricted to Owner</span>
              )}

              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="px-4 py-2 text-xs font-mono font-semibold text-[#5B6875] hover:text-[#0B1F33] bg-[#F7F7F4] rounded-lg transition-colors border border-[#D9E0E5]"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPECIFIC RECORD AUDIT HISTORY MODAL */}
      {leadHistoryModalId && (
        <div className="fixed inset-0 z-[60] bg-[#0B1F33]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-[#D9E0E5] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[85vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D9E0E5]">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-[#B8613A]" />
                  <h3 className="text-lg font-bold font-display text-[#0B1F33]">Record Change History</h3>
                </div>
                <button onClick={() => setLeadHistoryModalId(null)} className="text-[#5B6875] hover:text-[#0B1F33]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 overflow-y-auto max-h-[55vh] pr-1">
                {activeLeadHistoryLogs.length === 0 ? (
                  <p className="text-xs text-[#5B6875] italic text-center p-8">No recorded change history for this record.</p>
                ) : (
                  activeLeadHistoryLogs.map((log) => (
                    <div key={log.id} className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] text-xs space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#5B6875]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0B1F33]">{log.userName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-white text-[#B8613A] border border-[#D9E0E5]">{log.action}</span>
                        </div>
                        <span>{formatDate(log.timestamp)} ({formatTimeAgo(log.timestamp)})</span>
                      </div>
                      <p className="text-[#111827] text-xs">{log.details.summary}</p>
                      {log.details.changes && log.details.changes.length > 0 && (
                        <div className="space-y-1 pt-1.5 border-t border-[#D9E0E5]">
                          {log.details.changes.map((c, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] font-mono">
                              <span className="text-[#5B6875]">{c.label}:</span>
                              <span className="text-red-600 line-through">{String(c.before)}</span>
                              <ArrowRight className="w-3 h-3 text-[#B8613A]" />
                              <span className="text-emerald-700 font-semibold">{String(c.after)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9E0E5] flex justify-end font-mono">
              <button
                type="button"
                onClick={() => setLeadHistoryModalId(null)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg transition-colors"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL LEAD CREATION MODAL */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0B1F33]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#D9E0E5] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9E0E5]">
              <h3 className="text-lg font-bold font-display text-[#0B1F33]">Log New Client Lead</h3>
              <button onClick={() => setIsManualModalOpen(false)} className="text-[#5B6875] hover:text-[#0B1F33]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {manualModalError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{manualModalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div>
                  <label className="block text-[#5B6875] mb-1 font-semibold">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={manualFormData.name}
                    onChange={(e) => setManualFormData({ ...manualFormData, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  />
                </div>
                <div>
                  <label className="block text-[#5B6875] mb-1 font-semibold">Company / Venture *</label>
                  <input
                    type="text"
                    required
                    value={manualFormData.company}
                    onChange={(e) => setManualFormData({ ...manualFormData, company: e.target.value })}
                    placeholder="e.g. Varma Logistics"
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div>
                  <label className="block text-[#5B6875] mb-1 font-semibold">Email *</label>
                  <input
                    type="email"
                    required
                    value={manualFormData.email}
                    onChange={(e) => setManualFormData({ ...manualFormData, email: e.target.value })}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  />
                </div>
                <div>
                  <label className="block text-[#5B6875] mb-1 font-semibold">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={manualFormData.phone}
                    onChange={(e) => setManualFormData({ ...manualFormData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#5B6875] mb-1 font-semibold">Project Requirements *</label>
                <textarea
                  rows={3}
                  required
                  value={manualFormData.description}
                  onChange={(e) => setManualFormData({ ...manualFormData, description: e.target.value })}
                  placeholder="Describe scope, features, and target outcomes..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div>
                  <label className="block text-[#5B6875] mb-1 font-semibold">Assigned Founder</label>
                  <select
                    value={manualFormData.assignedTo}
                    onChange={(e) => setManualFormData({ ...manualFormData, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5]"
                  >
                    {availableUsers.map((u) => (
                      <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#5B6875] mb-1 font-semibold">Estimated Value</label>
                  <input
                    type="text"
                    value={manualFormData.estimatedValue}
                    onChange={(e) => setManualFormData({ ...manualFormData, estimatedValue: e.target.value })}
                    placeholder="e.g. ₹75,000"
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9E0E5] flex justify-end gap-2 font-mono">
                <button
                  type="button"
                  disabled={isSubmittingLead}
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5B6875] hover:text-[#0B1F33] bg-[#F7F7F4] rounded-lg border border-[#D9E0E5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] disabled:opacity-50 rounded-lg shadow-sm"
                >
                  {isSubmittingLead && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B8613A]" />}
                  <span>{isSubmittingLead ? 'Saving Lead...' : 'Save Lead & Log Audit'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* BRANDED PROPOSAL & SCOPE SHEET MODAL */}
      {isQuoteModalOpen && activeLead && (
        <div className="fixed inset-0 z-[70] bg-[#0B1F33]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-[#D9E0E5] rounded-2xl shadow-2xl overflow-hidden my-8">
            {/* Action Bar (hidden on print) */}
            <div className="p-4 bg-[#0B1F33] text-white flex items-center justify-between font-mono text-xs print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B8613A]" />
                <span className="font-bold uppercase tracking-wider">Kairos Flow • Scope & Quote Sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `================================================
KAIROS FLOW AGENCY • COMMERCIAL PROPOSAL & SCOPE SHEET
================================================
Client: ${activeLead.name}
Company: ${activeLead.company || 'Direct Client'}
Date: ${formatDate(new Date().toISOString())}
Email: ${activeLead.email}
Phone: ${activeLead.phone}
Disciplines: ${Array.isArray(activeLead.services) ? activeLead.services.join(', ') : activeLead.services}
Estimated Budget: ${activeLead.estimatedValue || activeLead.budget || 'TBD'}
Sprint Timeline: ${activeLead.timeline || '2 – 4 Weeks'}

DELIVERABLE SPECIFICATIONS:
${Array.isArray(activeLead.services) ? activeLead.services.map((s, i) => `${i + 1}. ${s} Sprint Architecture & Delivery`).join('\n') : `1. ${activeLead.services}`}
• 30-Day Post-Launch Bug Warranty Included
• 100% Full IP Ownership & Source Code Assignment
• Direct Founder-Led Architectural Communication

MILESTONE PAYMENT SCHEDULE:
• Milestone 1 (40%): Discovery & Architecture Sign-Off
• Milestone 2 (40%): Staging Build Review & QA Approval
• Milestone 3 (20%): Production Deployment & Final IP Handover

Agency Contacts:
• Primary Contact: ${currentUser.name} (${currentUser.role})
• Founder Lead: Desvanth (desvanth@kairosflow.agency / +91 77022 56073)
• Office: Tirupati, Andhra Pradesh, India • Global Client Delivery
================================================`;
                    navigator.clipboard.writeText(text);
                    setCopiedQuote(true);
                    setTimeout(() => setCopiedQuote(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedQuote ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B8613A] hover:bg-[#A3522E] text-white font-bold transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Branded Document Content */}
            <div className="p-6 sm:p-10 space-y-8 print:p-0">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#D9E0E5] gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Logo size={28} variant="mark" theme="light" />
                    <span className="font-display font-bold text-lg text-[#0B1F33]">Kairos Flow Agency</span>
                  </div>
                  <p className="text-xs font-mono text-[#5B6875]">Tirupati, Andhra Pradesh, India • Global Client Delivery</p>
                  <p className="text-xs font-mono text-[#5B6875]">kairosflowagency@gmail.com • +91 77022 56073</p>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="px-2.5 py-1 rounded bg-[#FBF4F0] border border-[#B8613A]/20 text-[10px] font-bold text-[#B8613A] uppercase tracking-wider">
                    Commercial Proposal
                  </span>
                  <div className="text-xs text-[#5B6875] mt-1">Date: {formatDate(new Date().toISOString())}</div>
                  <div className="text-xs font-bold text-[#0B1F33]">Ref: {activeLead.id}</div>
                </div>
              </div>

              {/* Client & Project Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] text-xs font-mono">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#5B6875] font-semibold mb-1">Prepared For</div>
                  <div className="font-bold text-[#0B1F33] text-sm">{activeLead.name}</div>
                  <div className="text-[#5B6875]">{activeLead.company || 'Direct Engagement'}</div>
                  <div className="text-[#5B6875] mt-1">{activeLead.email}</div>
                  <div className="text-[#5B6875]">{activeLead.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#5B6875] font-semibold mb-1">Scope Parameters</div>
                  <div>Investment: <strong className="text-[#B8613A]">{activeLead.estimatedValue || activeLead.budget || 'Custom Scope'}</strong></div>
                  <div>Sprint Timeline: <strong className="text-[#0B1F33]">{activeLead.timeline || '2 – 4 Weeks'}</strong></div>
                  <div>Lead Assigned: <strong className="text-[#0B1F33]">{activeLead.assignedTo || currentUser.name}</strong></div>
                  <div>Engagement: <strong className="text-[#0B1F33]">Milestone-Based Fixed Scope</strong></div>
                </div>
              </div>

              {/* Deliverable Disciplines */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#5B6875] font-bold">
                  Proposed Disciplines & Technical Sprints
                </h4>
                <div className="space-y-2">
                  {(Array.isArray(activeLead.services) ? activeLead.services : [activeLead.services]).map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-[#D9E0E5] bg-white flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0B1F33] text-white text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#0B1F33]">{s}</div>
                        <p className="text-[11px] text-[#5B6875]">
                          Full sprint architecture, implementation, automated testing, and responsive quality validation.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Schedule */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#5B6875] font-bold">
                  Structured Milestone Schedule
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                    <div className="text-[#B8613A] font-bold text-sm">40% Milestone 1</div>
                    <div className="font-bold text-[#0B1F33] mt-0.5">Discovery & Design</div>
                    <p className="text-[10px] text-[#5B6875] mt-1">Wireframes, technical architecture & design prototype sign-off.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                    <div className="text-[#B8613A] font-bold text-sm">40% Milestone 2</div>
                    <div className="font-bold text-[#0B1F33] mt-0.5">Staging Review</div>
                    <p className="text-[10px] text-[#5B6875] mt-1">Live staging environment build review & client QA sign-off.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                    <div className="text-[#B8613A] font-bold text-sm">20% Milestone 3</div>
                    <div className="font-bold text-[#0B1F33] mt-0.5">Launch & Handover</div>
                    <p className="text-[10px] text-[#5B6875] mt-1">Production deployment, DNS handover, and 100% IP transfer.</p>
                  </div>
                </div>
              </div>

              {/* Commercial Terms & Guarantees */}
              <div className="p-4 rounded-xl bg-[#FBF4F0] border border-[#B8613A]/20 space-y-2 text-xs font-mono">
                <div className="font-bold text-[#B8613A] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Agency Commitments Included</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#111827]">
                  <li>• <strong>30-Day Post-Launch Warranty:</strong> Zero-cost bug remediation after deployment.</li>
                  <li>• <strong>Complete Intellectual Property Assignment:</strong> 100% code, designs, and domain assets transferred.</li>
                  <li>• <strong>Founder-Led Oversight:</strong> Direct access to senior specialists with zero junior handoffs.</li>
                </ul>
              </div>

              {/* Document Sign-off Footer */}
              <div className="pt-6 border-t border-[#D9E0E5] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#5B6875] gap-2">
                <div>Prepared by <strong>{currentUser.name}</strong> • Kairos Flow Agency</div>
                <div>Authorized Sign-off • {new Date().getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
