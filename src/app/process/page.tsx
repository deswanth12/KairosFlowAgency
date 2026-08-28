import React from 'react';
import Link from 'next/link';
import { processStepsData } from '@/data/process';
import { Workflow, CheckCircle2, ArrowUpRight, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Our Delivery Framework & Process | Kairos Flow Agency',
  description: 'Learn how Kairos Flow Agency executes projects from discovery to launch with our 6-stage engineering and design delivery roadmap.'
};

export default function ProcessPage() {
  return (
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Top Hero Section (Deep Ink) */}
      <section className="bg-ink text-ivory pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>Delivery Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-3xl mb-6">
            The 6-Stage Delivery Framework
          </h1>
          <p className="text-slate-light text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Every digital product we engineer moves through a structured, predictable pipeline with defined client outputs and formal sign-offs at every milestone.
          </p>
        </div>
      </section>

      {/* Main Process Timeline Stages */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        {processStepsData.map((step, idx) => (
          <div
            key={step.stepNumber}
            className="relative bg-ivory-card border border-ivory-border rounded-2xl p-8 sm:p-12 shadow-subtle-ivory"
          >
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ivory-border mb-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-champagne">
                  {step.stepNumber}
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-softblack tracking-tight font-display">
                    {step.title}
                  </h2>
                  <div className="text-xs font-mono text-teal font-medium uppercase tracking-wider">
                    {step.subtitle}
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-ivory-muted text-xs font-mono text-slate self-start sm:self-auto border border-ivory-border">
                Stage 0{idx + 1} of 06
              </div>
            </div>

            {/* Description & What Happens */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              <div className="md:col-span-7 space-y-4">
                <p className="text-sm sm:text-base text-slate leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate mb-3 font-semibold">
                    Key Activities:
                  </div>
                  <div className="space-y-2">
                    {step.keyActivities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-softblack">
                        <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tangible Client Output Card */}
              <div className="md:col-span-5 bg-ink text-ivory p-6 rounded-xl border border-navy-border shadow-card-dark flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-2">
                    Tangible Client Output:
                  </div>
                  <div className="text-sm sm:text-base font-bold text-ivory leading-snug mb-3">
                    {step.clientOutput}
                  </div>
                  <p className="text-xs text-slate-light leading-relaxed">
                    Formal approval checkpoint before proceeding to next sprint.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-border flex items-center gap-2 text-xs text-teal font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Documented Sign-Off Gate</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom CTA Banner */}
        <div className="bg-ink text-ivory p-8 sm:p-12 rounded-2xl border border-navy-border text-center shadow-card-dark">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display mb-3">
            Ready to initiate Stage 01: Discovery?
          </h3>
          <p className="text-slate-light text-sm sm:text-base max-w-md mx-auto mb-8">
            Tell us about your product goals and our founding team will prepare a structured scoping proposal within 48 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-sm transition-colors"
          >
            <span>Start a Project Brief</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
