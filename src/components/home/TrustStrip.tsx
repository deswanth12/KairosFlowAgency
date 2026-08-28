import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  Palette, 
  TrendingUp, 
  Video,
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
    <div className="bg-corporate-offwhite border-b border-corporate-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Multidisciplinary Trust Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-corporate-border/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-corporate-blue border border-corporate-border shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-corporate-mutedText font-semibold">
                Built by a multidisciplinary team
              </div>
              <div className="text-sm font-bold text-corporate-dark font-display">
                Web • Apps • AI • Design • Content
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-corporate-mutedText">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-corporate-blue" />
              <span>Founder-Led Sprints</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-corporate-blue" />
              <span>Fixed Milestone Pricing</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-corporate-blue" />
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
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-corporate-border text-corporate-text hover:text-corporate-blue hover:border-corporate-blue/40 shadow-subtle-card transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-corporate-blue flex-shrink-0" />
                <span className="text-xs font-medium tracking-tight whitespace-nowrap">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
