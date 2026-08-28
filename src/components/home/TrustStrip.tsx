import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  Palette, 
  TrendingUp, 
  Video,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

const DISCIPLINES = [
  { name: 'Web Development', icon: Code2 },
  { name: 'App Development', icon: Smartphone },
  { name: 'AI & Automation', icon: Cpu },
  { name: 'UI/UX & Branding', icon: Palette },
  { name: 'Growth Marketing', icon: TrendingUp },
  { name: 'Video & Content', icon: Video }
];

export const TrustStrip: React.FC = () => {
  return (
    <div className="bg-ink border-b border-navy-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Early Multidisciplinary Trust Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-navy-border/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-champagne border border-navy-border">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-light font-semibold">
                Built by a multidisciplinary team
              </div>
              <div className="text-sm font-bold text-ivory font-display">
                Web • Apps • AI • Design • Content
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-light">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
              <span>Founder-Led Sprints</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
              <span>Fixed Milestone Pricing</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
              <span>100% IP Handover</span>
            </div>
          </div>
        </div>

        {/* 6 Capabilities Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-navy/40 border border-navy-border/70 text-ivory-muted hover:text-ivory hover:border-teal/50 transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                <span className="text-xs font-medium tracking-tight whitespace-nowrap">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
