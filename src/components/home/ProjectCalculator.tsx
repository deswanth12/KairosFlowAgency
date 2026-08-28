'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Check, Sparkles } from 'lucide-react';

interface DisciplineOption {
  id: string;
  name: string;
  category: string;
  baseWeeks: number;
  description: string;
}

const DISCIPLINES: DisciplineOption[] = [
  { id: 'web', name: 'Custom Next.js Web App', category: 'Web', baseWeeks: 4, description: 'SaaS portal, marketing site, or dashboard' },
  { id: 'mobile', name: 'Mobile App (iOS & Android)', category: 'App', baseWeeks: 6, description: 'Cross-platform React Native / Flutter' },
  { id: 'ai', name: 'Custom AI & Automation Pipeline', category: 'AI', baseWeeks: 3, description: 'LLM agents, RAG, and n8n workflows' },
  { id: 'branding', name: 'Brand Identity & Design System', category: 'Branding', baseWeeks: 3, description: 'Logo, typography, guidelines & Figma UI' },
  { id: 'marketing', name: 'Growth Marketing & SEO Funnel', category: 'Marketing', baseWeeks: 4, description: 'Full-funnel CRO, analytics & ad strategy' },
  { id: 'video', name: '4K Commercial & Video Content Engine', category: 'Video', baseWeeks: 2, description: 'Brand films, 3D motion & social reels' }
];

const TIMELINE_PREFERENCES = [
  { id: 'rapid', name: 'Rapid Sprint (Accelerated)', multiplier: 0.8, note: 'Dedicated dual-lead sprint focus' },
  { id: 'standard', name: 'Standard Delivery', multiplier: 1.0, note: 'Balanced iterative sprint cadence' },
  { id: 'phased', name: 'Phased Multi-Quarter', multiplier: 1.3, note: 'Longer staged milestone rollout' }
];

export const ProjectCalculator: React.FC = () => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(['web']);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');

  const toggleDiscipline = (id: string) => {
    if (selectedDisciplines.includes(id)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter((d) => d !== id));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, id]);
    }
  };

  const totalRawWeeks = selectedDisciplines.reduce((acc, id) => {
    const d = DISCIPLINES.find((item) => item.id === id);
    return acc + (d ? d.baseWeeks : 0);
  }, 0);

  // Parallel sprint efficiency discount for multi-discipline engagements
  const multiDisciplineDiscount = selectedDisciplines.length > 1 ? 0.75 : 1.0;
  const timelineMulti = TIMELINE_PREFERENCES.find((t) => t.id === selectedTimeline)?.multiplier || 1.0;
  const estimatedWeeks = Math.max(2, Math.round(totalRawWeeks * multiDisciplineDiscount * timelineMulti));

  const selectedNames = selectedDisciplines
    .map((id) => DISCIPLINES.find((d) => d.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const contactParams = new URLSearchParams({
    services: selectedDisciplines.map((id) => DISCIPLINES.find((d) => d.id === id)?.category || '').join(','),
    timeline: `${estimatedWeeks} Weeks (${selectedTimeline})`
  }).toString();

  return (
    <section className="bg-ivory text-softblack py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto">
        <div className="bg-ivory-card border border-ivory-border rounded-2xl p-8 sm:p-12 shadow-elevated-ivory">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
              <Calculator className="w-3.5 h-3.5 text-teal" />
              <span>Interactive Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-softblack font-display">
              Estimate your project timeline & scope
            </h2>
            <p className="text-slate text-sm sm:text-base mt-2">
              Select your required capabilities to preview how our multi-disciplinary sprint model optimizes delivery time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Options (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Step 1: Disciplines */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate mb-3 font-semibold">
                  1. Select Required Capabilities (Multi-select)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DISCIPLINES.map((d) => {
                    const isSelected = selectedDisciplines.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggleDiscipline(d.id)}
                        className={`p-4 rounded-xl text-left transition-all duration-200 border flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-ink text-ivory border-ink shadow-sm'
                            : 'bg-ivory hover:bg-ivory-muted text-softblack border-ivory-border'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-mono text-champagne mb-0.5">{d.category}</div>
                          <div className="text-sm font-bold tracking-tight">{d.name}</div>
                          <div className={`text-xs mt-1 ${isSelected ? 'text-slate-light' : 'text-slate'}`}>
                            {d.description}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-1 border ${
                            isSelected ? 'bg-teal border-teal text-ivory' : 'border-ivory-borderDark bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Timeline Preference */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate mb-3 font-semibold">
                  2. Desired Pace & Cadence
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIMELINE_PREFERENCES.map((t) => {
                    const isSelected = selectedTimeline === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTimeline(t.id)}
                        className={`p-3.5 rounded-lg text-left transition-all duration-200 border ${
                          isSelected
                            ? 'bg-ink text-ivory border-ink'
                            : 'bg-ivory hover:bg-ivory-muted text-softblack border-ivory-border'
                        }`}
                      >
                        <div className="text-xs font-bold mb-0.5">{t.name}</div>
                        <div className={`text-[11px] ${isSelected ? 'text-slate-light' : 'text-slate'}`}>
                          {t.note}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Card (4 cols) */}
            <div className="lg:col-span-4 bg-ink text-ivory p-6 sm:p-8 rounded-2xl border border-navy-border shadow-card-dark flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-navy-border mb-6">
                  <span className="text-xs font-mono text-slate-light uppercase tracking-wider">Estimated Sprint</span>
                  <span className="px-2 py-0.5 rounded bg-navy text-[11px] text-teal font-mono">
                    {selectedDisciplines.length} Disciplines
                  </span>
                </div>

                <div className="text-center py-4 bg-navy/50 rounded-xl border border-navy-border mb-6">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-ivory mb-1">
                    ~{estimatedWeeks} <span className="text-xl font-normal text-slate-light">Weeks</span>
                  </div>
                  <div className="text-xs text-teal font-mono">
                    Parallel Founder Execution
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-light mb-6">
                  <div className="flex items-center justify-between">
                    <span>Selected Scope:</span>
                    <span className="text-ivory font-medium truncate max-w-[160px]">{selectedDisciplines.length} items</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sprint Milestones:</span>
                    <span className="text-ivory font-medium">Weekly Staging</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>IP & Code Ownership:</span>
                    <span className="text-champagne font-medium">100% Client Owned</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?${contactParams}`}
                className="w-full group inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg transition-all duration-200 shadow-sm"
              >
                <span>Launch This Brief</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
