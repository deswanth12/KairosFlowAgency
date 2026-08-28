import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Layers, 
  Zap, 
  MessageSquareCheck, 
  CheckCircle2,
  Clock,
  Code2
} from 'lucide-react';
import { HourglassStream } from './HourglassStream';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-ink text-ivory pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-border overflow-hidden">
      {/* Background Architectural Canvas & Subtle Grid */}
      <HourglassStream />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #F4F1EA 1px, transparent 1px), linear-gradient(to bottom, #F4F1EA 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-navy/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Positioning */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/90 border border-navy-border text-xs font-mono tracking-tight shadow-subtle-dark">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-slate-light">Founder-Led Agency</span>
              <span className="text-navy-border">•</span>
              <span className="text-champagne font-semibold">Q1/Q2 Sprint Availability</span>
            </div>

            {/* Punchy, Non-Generic Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-ivory font-display leading-[1.08]">
                Digital products built to move your business forward.
              </h1>
              <p className="text-slate-light text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
                Websites, applications, AI systems, branding, and commercial content designed and engineered by one multidisciplinary team.
              </p>
            </div>

            {/* Dual CTAs + WhatsApp Direct */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#selected-work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-ivory-muted hover:text-ivory bg-navy/60 hover:bg-navy border border-navy-border rounded-lg transition-all duration-200"
              >
                <span>View Our Work</span>
              </Link>

              <a
                href="https://wa.me/917702256073?text=Hi%20Desvanth%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Kairos%20Flow."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-mono text-slate-light hover:text-champagne transition-colors sm:self-center"
              >
                <span>WhatsApp Founder</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
              </a>
            </div>

            {/* Turnaround & SLA Note */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal" />
                <span>Response within 24 hours</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                <span>100% IP & Code Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual System around Hourglass / Stream */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-navy/60 border border-navy-border p-6 sm:p-8 backdrop-blur-sm shadow-card-dark overflow-hidden">
              {/* Geometric Frame Header */}
              <div className="flex items-center justify-between pb-5 border-b border-navy-border/80 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-teal/60" />
                  <span className="font-mono text-[11px] text-slate ml-2 tracking-wider">KAIROS FLOW OS</span>
                </div>
                <span className="font-mono text-[11px] text-champagne font-bold">EST. 2026</span>
              </div>

              {/* Core Philosophy Block */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-light">Timing (Kairos)</span>
                  <span className="text-teal font-semibold">Decisive Opportunity</span>
                </div>
                <div className="h-1 w-full bg-ink rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-teal to-champagne rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-light">Execution (Flow)</span>
                  <span className="text-champagne font-semibold">Continuous Momentum</span>
                </div>
              </div>

              {/* 3 Telemetry Pillars */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-navy-border/80 text-center">
                <div className="p-2.5 rounded-lg bg-ink/70 border border-navy-border">
                  <div className="text-lg sm:text-xl font-bold font-display text-ivory">5</div>
                  <div className="text-[10px] font-mono text-slate-light uppercase">Specialists</div>
                </div>
                <div className="p-2.5 rounded-lg bg-ink/70 border border-navy-border">
                  <div className="text-lg sm:text-xl font-bold font-display text-teal">&lt;0.8s</div>
                  <div className="text-[10px] font-mono text-slate-light uppercase">Page Speed</div>
                </div>
                <div className="p-2.5 rounded-lg bg-ink/70 border border-navy-border">
                  <div className="text-lg sm:text-xl font-bold font-display text-champagne">100%</div>
                  <div className="text-[10px] font-mono text-slate-light uppercase">In-House</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Primary Trust Cards Immediately Under Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-16 pt-12 border-t border-navy-border/80">
          <div className="p-6 rounded-xl bg-navy/40 border border-navy-border/80 hover:border-teal/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-ink text-teal flex items-center justify-center mb-4 border border-navy-border">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ivory mb-1 font-display">Strategy First</h3>
            <p className="text-xs sm:text-sm text-slate-light leading-relaxed">
              We understand your business model, unit economics, and customers before writing a single line of code.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy/40 border border-navy-border/80 hover:border-teal/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-ink text-champagne flex items-center justify-center mb-4 border border-navy-border">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ivory mb-1 font-display">Built In-House</h3>
            <p className="text-xs sm:text-sm text-slate-light leading-relaxed">
              Design, development, AI, and commercial video executed directly by five dedicated founders. Zero junior handoffs.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy/40 border border-navy-border/80 hover:border-teal/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-ink text-teal flex items-center justify-center mb-4 border border-navy-border">
              <MessageSquareCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ivory mb-1 font-display">Clear Communication</h3>
            <p className="text-xs sm:text-sm text-slate-light leading-relaxed">
              One direct point of contact. Dedicated Slack/WhatsApp channels, weekly staging walkthroughs, and zero jargon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
