'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Clock, 
  Lock, 
  Code2, 
  Sparkles 
} from 'lucide-react';

interface ComparisonRow {
  dimension: string;
  traditional: string;
  kairos: string;
  highlight: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: 'Team Structure',
    traditional: 'Junior devs & outsourced interns assigned post-sale. Bloated account manager layers.',
    kairos: '5 Dedicated Founding Leads execute directly. Zero junior handoffs or subcontractors.',
    highlight: 'Founder-Led'
  },
  {
    dimension: 'Delivery Velocity',
    traditional: '3–6 month waterfall cycles. Slow change requests and endless scope debates.',
    kairos: '14–28 day focused sprint cycles. Live working staging environment deployed by Day 7.',
    highlight: '2–4x Faster'
  },
  {
    dimension: 'Tech Stack & Architecture',
    traditional: 'Generic WordPress / Shopify templates, third-party plugin bloat, sluggish loads.',
    kairos: 'Next.js 15, TypeScript, Tailwind CSS, PyTorch AI, Docker, Edge KV. Sub-second LCP.',
    highlight: 'Zero Bloat'
  },
  {
    dimension: 'Communication & SLA',
    traditional: '48h ticketing turnaround through non-technical middle managers.',
    kairos: 'Direct private WhatsApp & Slack channel with Founders. Guaranteed <4h SLA response.',
    highlight: '<4h Response'
  },
  {
    dimension: 'IP Rights & Code Ownership',
    traditional: 'Proprietary vendor lock-in, retained rights, or steep handover ransom fees.',
    kairos: '100% complete IP and clean Git repository ownership transferred to you upon delivery.',
    highlight: '100% Yours'
  },
  {
    dimension: 'Commercial Transparency',
    traditional: 'Unpredictable hourly billing, hidden maintenance retainers, and surprise invoices.',
    kairos: 'Fixed milestone pricing in INR (₹) or USD ($). You approve every sprint before payment.',
    highlight: 'Milestone-Based'
  }
];

export const AgencyComparison: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<'kairos' | 'traditional'>('kairos');

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F4] border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-4 font-semibold shadow-subtle-card">
            <Sparkles className="w-3.5 h-3.5 text-[#B8613A]" />
            <span>/ THE ENGINEERING DIFFERENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
            Traditional Agency vs. Kairos Flow
          </h2>
          <p className="text-[#5B6875] text-base sm:text-lg mt-3 leading-relaxed">
            Why high-growth founders and serious brands choose our direct senior engineering model over bloated agency retainers.
          </p>
        </div>

        {/* Mobile View: Clean Toggle between Kairos and Traditional */}
        <div className="block md:hidden">
          <div className="flex rounded-xl bg-white p-1 border border-[#D9E0E5] mb-6 shadow-xs font-mono text-xs">
            <button
              onClick={() => setMobileTab('kairos')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                mobileTab === 'kairos'
                  ? 'bg-[#0B1F33] text-white shadow-xs'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              ✦ Kairos Flow Model
            </button>
            <button
              onClick={() => setMobileTab('traditional')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                mobileTab === 'traditional'
                  ? 'bg-red-950 text-white shadow-xs'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              ✕ Traditional Agencies
            </button>
          </div>

          <div className="space-y-3">
            {COMPARISON_DATA.map((row, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border ${
                  mobileTab === 'kairos'
                    ? 'bg-white border-[#B8613A]/30 shadow-subtle-card'
                    : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#5B6875] uppercase tracking-wider">
                    {row.dimension}
                  </span>
                  {mobileTab === 'kairos' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FBF4F0] text-[#B8613A] border border-[#B8613A]/30">
                      {row.highlight}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-700">
                      Common Pitfall
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2.5">
                  {mobileTab === 'kairos' ? (
                    <div className="p-1 rounded bg-[#B8613A]/10 text-[#B8613A] flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="p-1 rounded bg-red-100 text-red-600 flex-shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <p className="text-xs text-[#111827] leading-relaxed">
                    {mobileTab === 'kairos' ? row.kairos : row.traditional}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Comprehensive Comparison Matrix */}
        <div className="hidden md:block bg-white rounded-2xl border border-[#D9E0E5] shadow-elevated-card overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-[#D9E0E5] bg-[#F7F7F4] text-xs font-mono font-bold">
            <div className="col-span-4 p-5 text-[#5B6875] uppercase tracking-wider">
              OPERATIONAL DIMENSION
            </div>
            <div className="col-span-4 p-5 text-[#5B6875] uppercase tracking-wider border-l border-[#D9E0E5] bg-red-50/30">
              TRADITIONAL AGENCIES / FREELANCERS
            </div>
            <div className="col-span-4 p-5 text-[#0B1F33] uppercase tracking-wider border-l border-[#D9E0E5] bg-[#FBF4F0] flex items-center justify-between">
              <span className="text-[#B8613A]">✦ KAIROS FLOW ARCHITECTURE</span>
              <span className="px-2 py-0.5 rounded bg-[#B8613A] text-white text-[10px]">FOUNDER-LED</span>
            </div>
          </div>

          {/* Table Body Rows */}
          {COMPARISON_DATA.map((row, idx) => (
            <div 
              key={idx}
              className={`grid grid-cols-12 border-b border-[#D9E0E5] last:border-b-0 hover:bg-[#F7F7F4]/40 transition-colors text-xs ${
                idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
              }`}
            >
              {/* Dimension */}
              <div className="col-span-4 p-5 flex flex-col justify-center">
                <span className="font-bold text-[#0B1F33] font-display text-sm">
                  {row.dimension}
                </span>
                <span className="font-mono text-[10px] text-[#B8613A] mt-1 font-semibold">
                  / {row.highlight}
                </span>
              </div>

              {/* Traditional */}
              <div className="col-span-4 p-5 border-l border-[#D9E0E5] flex items-start gap-2.5 text-[#5B6875] bg-red-50/10 leading-relaxed">
                <div className="p-1 rounded bg-red-100/60 text-red-600 flex-shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{row.traditional}</span>
              </div>

              {/* Kairos Flow */}
              <div className="col-span-4 p-5 border-l border-[#D9E0E5] bg-[#FBF4F0]/30 flex items-start gap-2.5 text-[#0B1F33] font-medium leading-relaxed">
                <div className="p-1 rounded bg-[#B8613A]/10 text-[#B8613A] flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{row.kairos}</span>
              </div>
            </div>
          ))}

          {/* Bottom Card Summary CTA */}
          <div className="p-6 bg-[#0B1F33] text-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#B8613A] flex-shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  Zero Retainer Lock-In • Complete Source Ownership
                </div>
                <div className="text-[11px] text-slate-300">
                  Sprint deliverables inspected and verified weekly on live staging.
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B8613A] hover:bg-[#a25330] text-white text-xs font-bold shadow-sm transition-all flex-shrink-0"
            >
              <span>Build With Founding Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
