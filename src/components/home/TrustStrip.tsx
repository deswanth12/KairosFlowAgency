import React from 'react';
import { ShieldCheck, Zap, Sparkles, Terminal } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-navy-dark text-slate-light border-y border-navy-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Discipline Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs font-mono uppercase tracking-wider">
            <span className="px-3 py-1 bg-ink/80 border border-ink-border rounded text-ivory font-semibold">Web</span>
            <span className="text-navy-border">•</span>
            <span className="px-3 py-1 bg-ink/80 border border-ink-border rounded text-ivory font-semibold">Apps</span>
            <span className="text-navy-border">•</span>
            <span className="px-3 py-1 bg-ink/80 border border-ink-border rounded text-ivory font-semibold">AI & Automation</span>
            <span className="text-navy-border">•</span>
            <span className="px-3 py-1 bg-ink/80 border border-ink-border rounded text-ivory font-semibold">Branding</span>
            <span className="text-navy-border">•</span>
            <span className="px-3 py-1 bg-ink/80 border border-ink-border rounded text-ivory font-semibold">Growth Marketing</span>
            <span className="text-navy-border">•</span>
            <span className="px-3 py-1 bg-ink/80 border border-ink-border rounded text-ivory font-semibold">Video</span>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 sm:gap-8 text-xs text-slate-light">
            <div className="flex items-center gap-2">
              <span className="font-mono text-champagne font-bold text-sm">100%</span>
              <span>Founder Led</span>
            </div>
            <div className="h-4 w-px bg-navy-border" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-teal font-bold text-sm">&lt; 0.8s</span>
              <span>Lighthouse Target</span>
            </div>
            <div className="h-4 w-px bg-navy-border" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-ivory font-bold text-sm">4 Hours</span>
              <span>Inquiry SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
