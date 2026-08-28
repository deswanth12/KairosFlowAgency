import React from 'react';
import Link from 'next/link';
import { HourglassStream } from './HourglassStream';
import { ArrowUpRight, Compass, ShieldCheck, MessageSquare, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-center bg-ink text-ivory overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-border/40">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F4F1EA 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      {/* Brand Particle Stream Canvas */}
      <HourglassStream />

      {/* Subtle top spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Editorial Positioning Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy/70 border border-navy-border text-xs font-medium tracking-wide text-slate-light mb-8 shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
          <span className="text-ivory font-mono text-[11px] uppercase tracking-wider">Kairos Flow Agency</span>
          <span className="text-slate">•</span>
          <span className="text-slate-light">Design Studio & Digital Engineering</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ivory max-w-4xl leading-[1.12] mb-6 font-display">
          Digital experiences built for businesses that{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-ivory via-teal-subtle to-teal">
            want to move forward.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-slate-light max-w-2xl font-normal leading-relaxed mb-10">
          Websites, applications, AI systems, branding and content, designed and built by one multidisciplinary team.
        </p>

        {/* Dual Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
          <Link
            href="/contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-elevated-ivory transition-all duration-200"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-ivory bg-navy/80 hover:bg-navy border border-navy-border rounded-lg transition-all duration-200 hover:border-slate"
          >
            <span>View Our Work</span>
          </Link>
        </div>

        {/* 3 Core Trust Cards Under Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 border-t border-navy-border/60 w-full max-w-4xl text-left">
          <div className="p-5 rounded-xl bg-navy/30 border border-navy-border/70 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-ink border border-navy-border flex items-center justify-center text-teal flex-shrink-0 mt-0.5">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-ivory tracking-tight mb-1">Strategy First</div>
              <div className="text-[11px] text-slate-light leading-relaxed">
                We understand the business before building.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-navy/30 border border-navy-border/70 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-ink border border-navy-border flex items-center justify-center text-teal flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-ivory tracking-tight mb-1">Built In-House</div>
              <div className="text-[11px] text-slate-light leading-relaxed">
                Design, development and content under one team.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-navy/30 border border-navy-border/70 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-ink border border-navy-border flex items-center justify-center text-teal flex-shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-ivory tracking-tight mb-1">Clear Communication</div>
              <div className="text-[11px] text-slate-light leading-relaxed">
                One team. One point of contact. No confusion.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Anchor */}
      <a
        href="#selected-work"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate hover:text-ivory transition-colors flex flex-col items-center gap-1 text-[11px] font-mono uppercase tracking-widest"
        aria-label="Scroll to featured work"
      >
        <span>Explore Work</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
