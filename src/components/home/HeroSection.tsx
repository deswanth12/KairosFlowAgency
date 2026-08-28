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
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { HourglassStream } from './HourglassStream';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';

export const HeroSection: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-white text-corporate-text pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-corporate-border overflow-hidden">
      {/* Subtle Background Architectural Flow & Grid */}
      <HourglassStream />
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0B1F3A 1px, transparent 1px), linear-gradient(to bottom, #0B1F3A 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-corporate-softBlue/60 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Positioning */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-corporate-softBlue border border-blue-200 text-xs font-mono tracking-tight shadow-sm">
              <span className="w-2 h-2 rounded-full bg-corporate-blue animate-pulse" />
              <span className="text-corporate-dark font-semibold">Founder-Led Agency</span>
              <span className="text-blue-300">•</span>
              <span className="text-corporate-blue font-semibold">Accepting Selected Q1/Q2 Projects</span>
            </div>

            {/* Headline: Dark Blue with refined typography */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight text-corporate-dark font-display leading-[1.08]">
                Digital products built to move your business forward.
              </h1>
              <p className="text-corporate-mutedText text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
                Websites, applications, AI systems, branding, and commercial content designed and engineered by one multidisciplinary team.
              </p>
            </div>

            {/* Dual CTAs + WhatsApp Direct */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary Button: Dark Blue with White Text */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white bg-corporate-dark hover:bg-corporate-darkHover border border-corporate-dark rounded-lg shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Secondary Button: White with Dark-Blue Border */}
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-corporate-dark bg-white hover:bg-corporate-offwhite border-2 border-corporate-dark rounded-lg shadow-sm transition-colors"
              >
                <span>View Selected Work</span>
              </Link>

              {/* WhatsApp Quick Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium text-corporate-dark hover:text-corporate-blue bg-corporate-softBlue hover:bg-blue-100/80 border border-blue-200 rounded-lg transition-colors"
                title="Chat with Founders on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-xs">WhatsApp</span>
              </a>
            </div>

            {/* Micro Trust Points under CTAs */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-mono text-corporate-mutedText">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-corporate-blue" />
                <span>Zero Junior Handoffs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-corporate-blue" />
                <span>&lt;4h Business Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-corporate-blue" />
                <span>100% IP & Code Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual System (White Card + Subtle Border) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white border border-corporate-border p-6 sm:p-8 shadow-elevated-card overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-corporate-border mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[11px] text-corporate-mutedText ml-2 tracking-wider font-semibold">KAIROS FLOW OS</span>
                </div>
                <span className="font-mono text-[11px] text-corporate-blue font-bold">EST. 2026</span>
              </div>

              {/* Core Philosophy Progress Indicators */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-corporate-mutedText">Timing (Kairos)</span>
                  <span className="text-corporate-dark font-bold">Decisive Leverage</span>
                </div>
                <div className="h-1.5 w-full bg-corporate-offwhite rounded-full overflow-hidden border border-corporate-border">
                  <div className="h-full w-4/5 bg-gradient-to-r from-corporate-dark to-corporate-blue rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-corporate-mutedText">Execution (Flow)</span>
                  <span className="text-corporate-blue font-bold">Continuous Momentum</span>
                </div>
              </div>

              {/* 3 Telemetry Pillars */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-corporate-border text-center">
                <div className="p-3 rounded-xl bg-corporate-offwhite border border-corporate-border">
                  <div className="text-xl font-bold font-display text-corporate-dark">5</div>
                  <div className="text-[10px] font-mono text-corporate-mutedText uppercase font-semibold">Specialists</div>
                </div>
                <div className="p-3 rounded-xl bg-corporate-offwhite border border-corporate-border">
                  <div className="text-xl font-bold font-display text-corporate-blue">&lt;0.8s</div>
                  <div className="text-[10px] font-mono text-corporate-mutedText uppercase font-semibold">Page Speed</div>
                </div>
                <div className="p-3 rounded-xl bg-corporate-offwhite border border-corporate-border">
                  <div className="text-xl font-bold font-display text-corporate-dark">100%</div>
                  <div className="text-[10px] font-mono text-corporate-mutedText uppercase font-semibold">In-House</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Primary Trust Cards (White with subtle #E5EAF0 borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-16 pt-12 border-t border-corporate-border">
          <div className="p-6 rounded-2xl bg-white border border-corporate-border hover:border-corporate-blue/50 hover:shadow-hover-card transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-corporate-softBlue text-corporate-blue flex items-center justify-center mb-4 border border-blue-100">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-corporate-dark mb-1.5 font-display">Strategy First</h3>
            <p className="text-xs sm:text-sm text-corporate-mutedText leading-relaxed">
              We understand your business model, unit economics, and customers before writing a single line of code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-corporate-border hover:border-corporate-blue/50 hover:shadow-hover-card transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-corporate-softBlue text-corporate-dark flex items-center justify-center mb-4 border border-blue-100">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-corporate-dark mb-1.5 font-display">Built In-House</h3>
            <p className="text-xs sm:text-sm text-corporate-mutedText leading-relaxed">
              Design, development, AI, and commercial video executed directly by five dedicated founders. Zero junior handoffs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-corporate-border hover:border-corporate-blue/50 hover:shadow-hover-card transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-corporate-softBlue text-corporate-blue flex items-center justify-center mb-4 border border-blue-100">
              <MessageSquareCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-corporate-dark mb-1.5 font-display">Clear Communication</h3>
            <p className="text-xs sm:text-sm text-corporate-mutedText leading-relaxed">
              One direct point of contact. Dedicated Slack/WhatsApp channels, weekly staging walkthroughs, and zero jargon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
