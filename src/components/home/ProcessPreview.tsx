'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { processStepsData } from '@/data/process';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

export const ProcessPreview: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = processStepsData[activeStep];

  return (
    <section id="process" className="bg-[#F8FAFC] text-[#0F172A] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-3 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>/ DELIVERY FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2F] font-display">
              Predictable sprints. Verified milestones.
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg mt-4 max-w-xl">
              A structured 6-stage roadmap ensuring every project is delivered on schedule with transparent client checkpoints at every phase.
            </p>
          </div>

          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#071A2F] hover:text-[#1677FF] transition-colors pb-1 border-b border-[#071A2F]/30 hover:border-[#1677FF] self-start md:self-auto uppercase tracking-wider"
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
                  ? 'bg-white border-[#1677FF] text-[#071A2F] shadow-sm ring-1 ring-[#1677FF]/30'
                  : 'bg-white/60 hover:bg-white border-[#DCE5EF] text-[#64748B] hover:text-[#071A2F]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1677FF]">
                  {step.stepNumber}
                </span>
                {activeStep === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]" />
                )}
              </div>
              <div className="text-xs font-bold text-[#071A2F] truncate uppercase">{step.title}</div>
              <div className="text-[10px] text-[#64748B] mt-0.5 truncate">{step.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Showcase Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#DCE5EF] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-subtle-card">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#1677FF] uppercase tracking-widest mb-3 font-semibold">
              <span>STAGE {current.stepNumber}</span>
              <span>•</span>
              <span className="text-[#071A2F] font-bold">{current.title}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#071A2F] tracking-tight mb-4 font-display">
              {current.subtitle}: What we execute
            </h3>

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-2.5 mb-6">
              {current.keyActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A]">
                  <CheckCircle2 className="w-4 h-4 text-[#1677FF] flex-shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F8FAFC] p-6 sm:p-7 rounded-xl border border-[#DCE5EF] flex flex-col justify-between h-full">
            <div>
              <div className="text-xs font-mono text-[#1677FF] uppercase tracking-wider mb-2 font-bold">
                Tangible Client Deliverables:
              </div>
              <div className="text-base font-bold text-[#071A2F] mb-4 font-display">
                {current.clientOutput}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Every stage concludes with an explicit milestone sign-off, ensuring 100% clarity before advancing to the next sprint.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DCE5EF] flex items-center justify-between font-mono">
              <span className="text-xs text-[#64748B]">STAGE {activeStep + 1} OF 6</span>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % processStepsData.length)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677FF] hover:text-[#071A2F] transition-colors"
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
