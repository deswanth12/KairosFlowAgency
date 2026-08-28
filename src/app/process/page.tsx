import React from 'react';
import Link from 'next/link';
import { processStepsData } from '@/data/process';
import { Workflow, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Our Delivery Framework & Process | Kairos Flow Agency',
  description: 'Learn how Kairos Flow Agency executes projects from discovery to launch with our 6-stage engineering and design delivery roadmap.'
};

export default function ProcessPage() {
  return (
    <div className="bg-white text-corporate-text min-h-screen">
      {/* Top Hero Section */}
      <section className="bg-white text-corporate-text pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-corporate-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-corporate-softBlue border border-blue-200 text-xs font-mono uppercase tracking-widest text-corporate-blue mb-4 font-semibold">
            <Workflow className="w-3.5 h-3.5" />
            <span>Delivery Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-corporate-dark font-display max-w-3xl mb-6">
            The 6-Stage Delivery Framework
          </h1>
          <p className="text-corporate-mutedText text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Every digital product we engineer moves through a structured, predictable pipeline with defined client outputs and formal sign-offs at every milestone.
          </p>
        </div>
      </section>

      {/* Main Process Timeline Stages */}
      <div className="bg-corporate-offwhite py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-corporate-border">
        <div className="max-w-5xl mx-auto space-y-16">
          {processStepsData.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative bg-white border border-corporate-border rounded-2xl p-8 sm:p-12 shadow-subtle-card hover:shadow-elevated-card transition-shadow duration-300"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-corporate-border mb-8">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-corporate-blue">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-corporate-dark tracking-tight font-display">
                      {step.title}
                    </h2>
                    <div className="text-xs font-mono text-corporate-blue font-medium uppercase tracking-wider">
                      {step.subtitle}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-corporate-softBlue text-xs font-mono text-corporate-dark self-start sm:self-auto border border-blue-100 font-semibold">
                  Stage 0{idx + 1} of 06
                </div>
              </div>

              {/* Description & What Happens */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
                      Phase Overview
                    </h3>
                    <p className="text-sm text-corporate-mutedText leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
                      What Happens During This Stage
                    </h3>
                    <p className="text-sm text-corporate-text leading-relaxed">
                      {step.whatHappens}
                    </p>
                  </div>
                </div>

                {/* Key Activities Checklist */}
                <div className="md:col-span-5 bg-corporate-offwhite p-6 rounded-xl border border-corporate-border">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-corporate-dark mb-4 font-bold">
                    Key Execution Activities:
                  </h3>
                  <div className="space-y-2.5">
                    {step.keyActivities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-corporate-text">
                        <CheckCircle2 className="w-4 h-4 text-corporate-blue flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Deliverable Box */}
              <div className="p-6 rounded-xl bg-corporate-softBlue border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-corporate-blue uppercase tracking-wider font-bold mb-1">
                    Formal Client Deliverable:
                  </div>
                  <div className="text-base font-bold text-corporate-dark font-display">
                    {step.clientOutput}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-corporate-dark hover:bg-corporate-darkHover rounded-lg transition-colors self-start sm:self-auto shadow-sm"
                >
                  <span>Inquire on Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
