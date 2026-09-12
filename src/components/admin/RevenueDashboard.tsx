'use client';

import React, { useMemo } from 'react';
import { Lead } from '@/types';
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Target,
  Trophy,
  Clock,
  Layers,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

interface RevenueDashboardProps {
  leads: Lead[];
}

// Parse estimatedValue strings like "₹1,50,000" or "$5,000" or "₹50,000" into a number (INR)
function parseValue(val: string | undefined): number {
  if (!val) return 0;
  const cleaned = val.replace(/[₹$,\s]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  // if USD (contains $), rough conversion at ₹84
  if (val.includes('$')) return num * 84;
  return num;
}

function formatINR(val: number): string {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

function getThisMonthLeads(leads: Lead[]): Lead[] {
  const now = new Date();
  return leads.filter((l) => {
    const d = new Date(l.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
}

function getLastMonthLeads(leads: Lead[]): Lead[] {
  const now = new Date();
  const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  return leads.filter((l) => {
    const d = new Date(l.createdAt);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });
}

export const RevenueDashboard: React.FC<RevenueDashboardProps> = ({ leads }) => {
  const stats = useMemo(() => {
    const won = leads.filter((l) => l.status === 'Won' || l.status === 'In Progress' || l.status === 'Completed');
    const active = leads.filter((l) => l.status === 'In Progress');
    const completed = leads.filter((l) => l.status === 'Completed');
    const lost = leads.filter((l) => l.status === 'Lost / Closed');
    const closed = [...won, ...lost];

    const totalPipeline = leads
      .filter((l) => !['Lost / Closed'].includes(l.status))
      .reduce((sum, l) => sum + parseValue(l.estimatedValue), 0);

    const wonRevenue = won.reduce((sum, l) => sum + parseValue(l.estimatedValue), 0);

    const winRate = closed.length > 0 ? Math.round((won.length / closed.length) * 100) : 0;

    const avgDeal =
      won.length > 0 ? Math.round(wonRevenue / won.length) : 0;

    const thisMonth = getThisMonthLeads(leads);
    const lastMonth = getLastMonthLeads(leads);

    const thisMonthPipeline = thisMonth.reduce((sum, l) => sum + parseValue(l.estimatedValue), 0);
    const lastMonthPipeline = lastMonth.reduce((sum, l) => sum + parseValue(l.estimatedValue), 0);

    const pipelineTrend =
      lastMonthPipeline > 0
        ? Math.round(((thisMonthPipeline - lastMonthPipeline) / lastMonthPipeline) * 100)
        : thisMonthPipeline > 0 ? 100 : 0;

    // Stage breakdown
    const stageMap: Record<string, number> = {};
    leads.forEach((l) => {
      stageMap[l.status] = (stageMap[l.status] || 0) + 1;
    });

    // Service breakdown (value)
    const serviceMap: Record<string, number> = {};
    leads.forEach((l) => {
      const val = parseValue(l.estimatedValue);
      (l.services || []).forEach((s) => {
        serviceMap[s] = (serviceMap[s] || 0) + val / (l.services.length || 1);
      });
    });
    const topServices = Object.entries(serviceMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Stage pipeline values
    const PIPELINE_ORDER = ['New Lead', 'Contacted', 'Discovery Call', 'Proposal Sent', 'Negotiation'];
    const stagePipeline = PIPELINE_ORDER.map((stage) => ({
      stage,
      count: leads.filter((l) => l.status === stage).length,
      value: leads.filter((l) => l.status === stage).reduce((sum, l) => sum + parseValue(l.estimatedValue), 0)
    }));

    return {
      totalPipeline,
      wonRevenue,
      winRate,
      avgDeal,
      thisMonth: thisMonth.length,
      lastMonth: lastMonth.length,
      thisMonthPipeline,
      pipelineTrend,
      active: active.length,
      completed: completed.length,
      total: leads.length,
      topServices,
      stagePipeline,
      stageMap
    };
  }, [leads]);

  const KPICard = ({
    label, value, sub, icon: Icon, color, trend
  }: {
    label: string;
    value: string;
    sub?: string;
    icon: React.ElementType;
    color: string;
    trend?: number;
  }) => (
    <div className="bg-white border border-[#D9E0E5] rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-mono text-[#5B6875] uppercase tracking-wider">{label}</p>
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#0B1F33] font-display">{value}</p>
      {sub && <p className="text-[11px] text-[#5B6875] font-mono">{sub}</p>}
      {typeof trend !== 'undefined' && (
        <div className={`flex items-center gap-1 text-[11px] font-mono font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend >= 0 ? '+' : ''}{trend}% vs last month
        </div>
      )}
    </div>
  );

  const maxStageVal = Math.max(...stats.stagePipeline.map((s) => s.value), 1);
  const maxServiceVal = Math.max(...stats.topServices.map(([, v]) => v), 1);

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0B1F33] font-display">Revenue & Pipeline</h2>
          <p className="text-xs font-mono text-[#5B6875] mt-0.5">Live calculations from your CRM data</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5B6875] bg-[#F7F7F4] border border-[#D9E0E5] rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live · {leads.length} total leads
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          label="Total Pipeline"
          value={formatINR(stats.totalPipeline)}
          sub="Excl. lost/closed"
          icon={IndianRupee}
          color="bg-[#0B1F33]"
          trend={stats.pipelineTrend}
        />
        <KPICard
          label="Won / Revenue"
          value={formatINR(stats.wonRevenue)}
          sub={`${stats.completed} completed · ${stats.active} active`}
          icon={Trophy}
          color="bg-emerald-600"
        />
        <KPICard
          label="Win Rate"
          value={`${stats.winRate}%`}
          sub="Won ÷ Closed deals"
          icon={Target}
          color="bg-[#B8613A]"
        />
        <KPICard
          label="Avg Deal Size"
          value={stats.avgDeal > 0 ? formatINR(stats.avgDeal) : '—'}
          sub="Across won leads"
          icon={BarChart3}
          color="bg-violet-600"
        />
      </div>

      {/* This month highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#0B1F33] text-white rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">This Month</p>
            <p className="text-3xl font-bold font-display mt-1">{stats.thisMonth}</p>
            <p className="text-[11px] text-slate-300 font-mono mt-0.5">New leads · {formatINR(stats.thisMonthPipeline)} value</p>
          </div>
          <div className="text-right">
            <ArrowUpRight className="w-8 h-8 text-[#B8613A]" />
            <p className="text-[10px] font-mono text-slate-400 mt-1">{stats.lastMonth} last month</p>
          </div>
        </div>

        <div className="sm:col-span-2 bg-white border border-[#D9E0E5] rounded-2xl p-5">
          <p className="text-[11px] font-mono text-[#5B6875] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Pipeline by Stage
          </p>
          <div className="space-y-2">
            {stats.stagePipeline.map(({ stage, count, value }) => (
              <div key={stage} className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#5B6875] w-28 flex-shrink-0 truncate">{stage}</span>
                <div className="flex-1 h-2 bg-[#F7F7F4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0B1F33] to-[#B8613A] rounded-full transition-all duration-700"
                    style={{ width: `${Math.round((value / maxStageVal) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#0B1F33] font-semibold w-12 text-right flex-shrink-0">
                  {count > 0 ? formatINR(value) : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Services by Value */}
      <div className="bg-white border border-[#D9E0E5] rounded-2xl p-5">
        <p className="text-[11px] font-mono text-[#5B6875] uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" /> Revenue by Service Category
        </p>
        {stats.topServices.length === 0 ? (
          <p className="text-xs text-[#5B6875] font-mono">No service data yet — add estimated values to leads.</p>
        ) : (
          <div className="space-y-3">
            {stats.topServices.map(([service, value]) => (
              <div key={service} className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#0B1F33] font-semibold w-36 flex-shrink-0 truncate">{service}</span>
                <div className="flex-1 h-3 bg-[#F7F7F4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B8613A] rounded-full transition-all duration-700"
                    style={{ width: `${Math.round((value / maxServiceVal) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-[#B8613A] font-bold w-16 text-right flex-shrink-0">
                  {formatINR(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
