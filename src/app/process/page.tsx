import React from 'react';
import Link from 'next/link';
import { processStepsData } from '@/data/process';
import { Workflow, CheckCircle2, ArrowUpRight, Terminal } from 'lucide-react';

export const metadata = {
  title: 'Our Delivery Framework & Process | Kairos Flow Agency',
  description: 'Learn how Kairos Flow Agency executes projects from discovery to launch with our 6-stage engineering and design delivery roadmap.'
};

export default function ProcessPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* Top Hero Section */}
      <section className="bg-[#F8FAFC] text-[#0F172A] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-4 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>/ SPRINT METHODOLOGY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#071A2F] font-display max-w-3xl mb-6">
            The 6-Stage <span className="text-[#1677FF]">Delivery Framework</span>
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Every digital product we engineer moves through a structured, predictable pipeline with defined client outputs and formal sign-offs at every milestone.
          </p>
        </div>
      </section>

      {/* Main Process Timeline Stages */}
      <div className="bg-[#F8FAFC] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-5xl mx-auto space-y-16">
          {processStepsData.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative bg-white border border-[#DCE5EF] rounded-2xl p-8 sm:p-12 shadow-subtle-card hover:shadow-elevated-card transition-shadow duration-300"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE5EF] mb-8 font-mono">
                <div className="flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1677FF]">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#071A2F] tracking-tight font-display">
                      {step.title}
                    </h2>
                    <div className="text-xs text-[#1677FF] font-semibold uppercase tracking-wider">
                      {step.subtitle}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#F8FAFC] text-xs text-[#071A2F] self-start sm:self-auto border border-[#DCE5EF] font-semibold">
                  PHASE 0{idx + 1} // 06
                </div>
              </div>

              {/* Description & What Happens */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-semibold">
                      Phase Overview
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-semibold">
                      What Happens During This Stage
                    </h3>
                    <p className="text-sm text-[#0F172A] leading-relaxed">
                      {step.whatHappens}
                    </p>
                  </div>
                </div>

                {/* Key Activities Checklist */}
                <div className="md:col-span-5 bg-[#F8FAFC] p-6 rounded-xl border border-[#DCE5EF]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#071A2F] mb-4 font-bold">
                    Key Execution Activities:
                  </h3>
                  <div className="space-y-2.5">
                    {step.keyActivities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F172A]">
                        <CheckCircle2 className="w-4 h-4 text-[#1677FF] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Deliverable Box */}
              <div className="p-6 rounded-xl bg-[#EFF6FF] border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-[#1677FF] uppercase tracking-wider font-bold mb-1">
                    Formal Client Deliverable:
                  </div>
                  <div className="text-base font-bold text-[#071A2F] font-display">
                    {step.clientOutput}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-white bg-[#071A2F] hover:bg-[#0B2544] rounded-lg transition-colors self-start sm:self-auto shadow-sm uppercase tracking-wider"
                >
                  <span>/ INQUIRE ON SPRINT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
