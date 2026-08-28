'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { processStepsData } from '@/data/process';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

export const ProcessPreview: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = processStepsData[activeStep];

  return (
    <section id="process" className="bg-[#F7F7F4] text-[#111827] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-3 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>/ DELIVERY FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
              Predictable sprints. Verified milestones.
            </h2>
            <p className="text-[#5B6875] text-base sm:text-lg mt-4 max-w-xl">
              A structured 6-stage roadmap ensuring every project is delivered on schedule with transparent client checkpoints at every phase.
            </p>
          </div>

          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] hover:text-[#B8613A] transition-colors pb-1 border-b border-[#0B1F33]/30 hover:border-[#B8613A] self-start md:self-auto uppercase tracking-wider"
          >
            <span>/ VIEW COMPLETE METHODOLOGY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 font-mono">
          {processStepsData.map((step, idx) => (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                activeStep === idx
                  ? 'bg-white border-[#B8613A] text-[#0B1F33] shadow-sm ring-1 ring-[#B8613A]/30'
                  : 'bg-white/60 hover:bg-white border-[#D9E0E5] text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#B8613A]">
                  {step.stepNumber}
                </span>
                {activeStep === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8613A]" />
                )}
              </div>
              <div className="text-xs font-bold text-[#0B1F33] truncate uppercase">{step.title}</div>
              <div className="text-[10px] text-[#5B6875] mt-0.5 truncate">{step.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Showcase Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D9E0E5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-subtle-card">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B8613A] uppercase tracking-widest mb-3 font-semibold">
              <span>STAGE {current.stepNumber}</span>
              <span>•</span>
              <span className="text-[#0B1F33] font-bold">{current.title}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1F33] tracking-tight mb-4 font-display">
              {current.subtitle}: What we execute
            </h3>

            <p className="text-[#5B6875] text-sm sm:text-base leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-2.5 mb-6">
              {current.keyActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111827]">
                  <CheckCircle2 className="w-4 h-4 text-[#B8613A] flex-shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F7F4] p-6 sm:p-7 rounded-xl border border-[#D9E0E5] flex flex-col justify-between h-full">
            <div>
              <div className="text-xs font-mono text-[#B8613A] uppercase tracking-wider mb-2 font-bold">
                Tangible Client Deliverables:
              </div>
              <div className="text-base font-bold text-[#0B1F33] mb-4 font-display">
                {current.clientOutput}
              </div>
              <p className="text-xs text-[#5B6875] leading-relaxed">
                Every stage concludes with an explicit milestone sign-off, ensuring 100% clarity before advancing to the next sprint.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D9E0E5] flex items-center justify-between font-mono">
              <span className="text-xs text-[#5B6875]">STAGE {activeStep + 1} OF 6</span>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % processStepsData.length)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8613A] hover:text-[#0B1F33] transition-colors"
              >
                <span>NEXT STAGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
