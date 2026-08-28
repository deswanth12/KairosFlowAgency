import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Zap, 
  MessageSquareCheck, 
  CheckCircle2,
  Clock,
  MessageCircle,
  Code2,
  Terminal
} from 'lucide-react';
import { HourglassStream } from './HourglassStream';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';

export const HeroSection: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-[#F8FAFC] text-[#0F172A] pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF] overflow-hidden">
      {/* Subtle Background Architectural Flow & Grid */}
      <HourglassStream />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #071A2F 1px, transparent 1px), linear-gradient(to bottom, #071A2F 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EFF6FF]/70 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Positioning */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Operational Status Pill with Developer Syntax */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono tracking-tight shadow-subtle-card">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="text-[#071A2F] font-semibold">STATUS: FOUNDER-LED SPRINTS</span>
              <span className="text-[#DCE5EF]">•</span>
              <span className="text-[#1677FF] font-semibold">ACCEPTING SELECTED Q1/Q2 PROJECTS</span>
            </div>

            {/* Headline: Deep Developer Navy #071A2F with Electric Blue #1677FF Phrase Highlight */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight text-[#071A2F] font-display leading-[1.08]">
                Digital products engineered for <span className="text-[#1677FF]">commercial velocity.</span>
              </h1>
              <p className="text-[#64748B] text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
                Modern web applications, native mobile apps, custom AI automation, brand systems, and commercial video engineered by five specialized leads.
              </p>
            </div>

            {/* Dual CTAs + WhatsApp Direct */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary Button: Deep Developer Navy #071A2F with White Text */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white bg-[#071A2F] hover:bg-[#0B2544] border border-[#071A2F] rounded-lg shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#38BDF8] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Secondary Button: White with Deep Navy Border */}
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-[#071A2F] bg-white hover:bg-[#F8FAFC] border-2 border-[#071A2F] rounded-lg shadow-sm transition-colors font-mono text-xs"
              >
                <span>/ VIEW SELECTED WORK</span>
              </Link>

              {/* WhatsApp Quick Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-mono text-[#071A2F] hover:text-[#1677FF] bg-white hover:bg-[#EFF6FF] border border-[#DCE5EF] rounded-lg transition-colors"
                title="Chat with Founders on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-xs">WhatsApp</span>
              </a>
            </div>

            {/* Micro Technical Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-mono text-[#64748B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>Zero Junior Handoffs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>&lt;4h SLA Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>100% Code & IP Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Architectural Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white border border-[#DCE5EF] p-6 sm:p-8 shadow-elevated-card overflow-hidden">
              {/* Terminal Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#DCE5EF] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[11px] text-[#64748B] ml-2 tracking-wider font-semibold">
                    SYS.TERMINAL // KAIROS FLOW OS
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#1677FF] font-bold">EST. 2026</span>
              </div>

              {/* Core Execution Indicators */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#64748B]">01 / TIMING (KAIROS)</span>
                  <span className="text-[#071A2F] font-bold">Decisive Leverage</span>
                </div>
                <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden border border-[#DCE5EF]">
                  <div className="h-full w-4/5 bg-gradient-to-r from-[#071A2F] to-[#1677FF] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#64748B]">02 / MOMENTUM (FLOW)</span>
                  <span className="text-[#1677FF] font-bold">Continuous Sprint</span>
                </div>
              </div>

              {/* 3 Telemetry Pillars */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DCE5EF] text-center font-mono">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF]">
                  <div className="text-lg font-bold text-[#071A2F]">5</div>
                  <div className="text-[9px] text-[#64748B] uppercase font-semibold">Specialists</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF]">
                  <div className="text-lg font-bold text-[#1677FF]">&lt;0.8s</div>
                  <div className="text-[9px] text-[#64748B] uppercase font-semibold">Latency</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF]">
                  <div className="text-lg font-bold text-[#071A2F]">100%</div>
                  <div className="text-[9px] text-[#64748B] uppercase font-semibold">In-House</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Primary Technical Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-16 pt-12 border-t border-[#DCE5EF]">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE5EF] hover:border-[#1677FF]/50 hover:shadow-hover-card transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1677FF] flex items-center justify-center border border-blue-100">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#64748B]">/ STRATEGY</span>
            </div>
            <h3 className="text-base font-bold text-[#071A2F] mb-1.5 font-display">Architecture First</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              We design the system model, data schema, and technical leverage before writing production code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE5EF] hover:border-[#1677FF]/50 hover:shadow-hover-card transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#071A2F] flex items-center justify-center border border-blue-100">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#64748B]">/ EXECUTION</span>
            </div>
            <h3 className="text-base font-bold text-[#071A2F] mb-1.5 font-display">Built In-House</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Web, apps, AI pipelines, and video delivered directly by five specialized founders. Zero junior handoffs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE5EF] hover:border-[#1677FF]/50 hover:shadow-hover-card transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1677FF] flex items-center justify-center border border-blue-100">
                <MessageSquareCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#64748B]">/ PROTOCOL</span>
            </div>
            <h3 className="text-base font-bold text-[#071A2F] mb-1.5 font-display">Transparent Sprints</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Weekly live staging walkthroughs, dedicated communications channel, and direct founder accountability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
