'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { processStepsData } from '@/data/process';
import { ArrowRight, CheckCircle2, Workflow } from 'lucide-react';

export const ProcessPreview: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = processStepsData[activeStep];

  return (
    <section id="process" className="bg-navy-dark text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-3">
              <Workflow className="w-3.5 h-3.5" />
              <span>Delivery Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory font-display">
              Engineered for speed, clarity, and precision.
            </h2>
            <p className="text-slate-light text-base sm:text-lg mt-4 max-w-xl">
              A structured 6-stage roadmap ensuring every project is delivered on schedule with transparent client checkpoints at every phase.
            </p>
          </div>

          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ivory hover:text-teal transition-colors pb-1 border-b border-white/20 hover:border-teal self-start md:self-auto"
          >
            <span>Read Complete Process Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {processStepsData.map((step, idx) => (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                activeStep === idx
                  ? 'bg-navy border-teal text-ivory shadow-subtle-ivory'
                  : 'bg-ink/60 hover:bg-navy/50 border-navy-border text-slate-light'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-champagne">
                  {step.stepNumber}
                </span>
                {activeStep === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                )}
              </div>
              <div className="text-sm font-bold text-ivory">{step.title}</div>
              <div className="text-[11px] text-slate mt-0.5 truncate">{step.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Showcase Card */}
        <div className="bg-ink p-8 sm:p-10 rounded-2xl border border-navy-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-card-dark">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-teal uppercase tracking-widest mb-3">
              <span>Stage {current.stepNumber}</span>
              <span>•</span>
              <span className="text-ivory font-bold">{current.title}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-ivory tracking-tight mb-4 font-display">
              {current.subtitle}: What we do
            </h3>

            <p className="text-slate-light text-sm sm:text-base leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-2.5 mb-6">
              {current.keyActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-light">
                  <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy/60 p-6 sm:p-7 rounded-xl border border-navy-border flex flex-col justify-between h-full">
            <div>
              <div className="text-xs font-mono text-champagne uppercase tracking-wider mb-2">
                Tangible Client Deliverables:
              </div>
              <div className="text-base font-bold text-ivory mb-4">
                {current.clientOutput}
              </div>
              <p className="text-xs text-slate-light leading-relaxed">
                Every stage concludes with an explicit milestone sign-off, ensuring 100% clarity before advancing to the next phase.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-navy-border flex items-center justify-between">
              <span className="text-xs text-slate font-mono">Stage {activeStep + 1} of 6</span>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % processStepsData.length)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-ivory transition-colors"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
