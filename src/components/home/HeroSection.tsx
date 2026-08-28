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
  Terminal,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HourglassStream } from './HourglassStream';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';

export const HeroSection: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-[#F7F7F4] text-[#111827] pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5] overflow-hidden">
      {/* Background Hourglass Kinetic Flow Stream */}
      <HourglassStream />
      
      {/* Subtle Structural Architecture Grid with Soft Radial Mask */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0B1F33 1px, transparent 1px), linear-gradient(to bottom, #0B1F33 1px, transparent 1px)',
          backgroundSize: '56px 56px'
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#FBF4F0]/90 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Core Positioning & Headlines */}
          <div className="lg:col-span-7 space-y-8">
            {/* Positioning Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono tracking-wide shadow-subtle-card">
              <span className="w-2 h-2 rounded-full bg-[#B8613A] animate-pulse" />
              <span className="text-[#0B1F33] font-bold tracking-wider">DESIGN + ENGINEERING + AI + GROWTH</span>
              <span className="text-[#D9E0E5] hidden sm:inline">•</span>
              <span className="text-[#5B6875] font-medium hidden sm:inline">Q1/Q2 SPRINTS ACTIVE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-5">
              <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-extrabold tracking-[-0.04em] text-[#0B1F33] font-display leading-[1.04]">
                We build digital experiences that move businesses <span className="text-[#B8613A]">forward.</span>
              </h1>
              <p className="text-[#5B6875] text-lg sm:text-xl font-normal leading-[1.65] max-w-2xl">
                Websites, apps, AI systems, brands, and digital experiences engineered by one focused founding team. Zero junior handoffs. Zero account managers.
              </p>
            </div>

            {/* Dual CTAs + WhatsApp Direct */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary Button: Deep Navy #0B1F33 */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white bg-[#0B1F33] hover:bg-[#132B45] border border-[#0B1F33] rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#B8613A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Secondary Button: White with Deep Navy Border */}
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-[#0B1F33] bg-white hover:bg-[#F7F7F4] border-2 border-[#0B1F33] rounded-xl shadow-subtle-card hover:shadow-sm transition-all font-mono text-xs"
              >
                <span>/ VIEW OUR WORK</span>
              </Link>

              {/* WhatsApp Direct Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-mono text-[#0B1F33] hover:text-[#B8613A] bg-white hover:bg-[#FBF4F0] border border-[#D9E0E5] rounded-xl shadow-subtle-card transition-colors"
                title="Chat directly with Founders on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-xs">WhatsApp</span>
              </a>
            </div>

            {/* Micro Technical Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#5B6875]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A]" />
                <span>5 Founding Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B8613A]" />
                <span>&lt;4h SLA Response</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8613A]" />
                <span>100% Code & IP Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white border border-[#D9E0E5] p-6 sm:p-8 shadow-elevated-card overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#D9E0E5] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B8613A]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3E5C76]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0B1F33]" />
                  <span className="font-mono text-[11px] text-[#5B6875] ml-2 tracking-wider font-semibold">
                    SYS.DISCIPLINES // KAIROS FLOW
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#B8613A] font-bold">FOUNDER-LED</span>
              </div>

              {/* Kairos & Flow Progress Indicators */}
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#5B6875]">01 / TIMING (KAIROS)</span>
                    <span className="text-[#0B1F33] font-bold">Opportune Leverage</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F7F7F4] rounded-full overflow-hidden border border-[#D9E0E5]">
                    <div className="h-full w-4/5 bg-gradient-to-r from-[#0B1F33] to-[#B8613A] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#5B6875]">02 / MOMENTUM (FLOW)</span>
                    <span className="text-[#B8613A] font-bold">Relentless Execution</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F7F7F4] rounded-full overflow-hidden border border-[#D9E0E5]">
                    <div className="h-full w-full bg-gradient-to-r from-[#B8613A] to-[#3E5C76] rounded-full" />
                  </div>
                </div>
              </div>

              {/* 3 Telemetry Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[#D9E0E5] text-center font-mono">
                <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                  <div className="text-xl font-bold text-[#0B1F33]">5</div>
                  <div className="text-[9px] text-[#5B6875] uppercase font-semibold mt-0.5">Founders</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                  <div className="text-xl font-bold text-[#B8613A]">&lt;0.8s</div>
                  <div className="text-[9px] text-[#5B6875] uppercase font-semibold mt-0.5">Latency</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5]">
                  <div className="text-xl font-bold text-[#0B1F33]">100%</div>
                  <div className="text-[9px] text-[#5B6875] uppercase font-semibold mt-0.5">In-House</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Primary Pillars with Editorial Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-[#D9E0E5]">
          <div className="p-7 rounded-2xl bg-white border border-[#D9E0E5] hover:border-[#B8613A]/50 hover:shadow-hover-card transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#FBF4F0] text-[#B8613A] flex items-center justify-center border border-[#B8613A]/20">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#5B6875] tracking-wider">/ ARCHITECTURE</span>
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33] mb-2 font-display">Engineering First</h3>
            <p className="text-sm text-[#5B6875] leading-relaxed">
              We architect the system schema, API contracts, and commercial logic before writing production code.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-[#D9E0E5] hover:border-[#B8613A]/50 hover:shadow-hover-card transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#FBF4F0] text-[#0B1F33] flex items-center justify-center border border-[#B8613A]/20">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#5B6875] tracking-wider">/ MULTIDISCIPLINARY</span>
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33] mb-2 font-display">One Unified Team</h3>
            <p className="text-sm text-[#5B6875] leading-relaxed">
              Web, apps, AI pipelines, brand systems, and video delivered by 5 dedicated leads. Zero vendor fragmentation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-[#D9E0E5] hover:border-[#B8613A]/50 hover:shadow-hover-card transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#FBF4F0] text-[#B8613A] flex items-center justify-center border border-[#B8613A]/20">
                <MessageSquareCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#5B6875] tracking-wider">/ ACCOUNTABILITY</span>
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33] mb-2 font-display">Transparent Sprints</h3>
            <p className="text-sm text-[#5B6875] leading-relaxed">
              Weekly live staging walkthroughs, dedicated communications channel, and direct founder accountability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
