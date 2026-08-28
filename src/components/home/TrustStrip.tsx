import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  Palette, 
  TrendingUp, 
  Video,
  CheckCircle2,
  Terminal
} from 'lucide-react';

const DISCIPLINES = [
  { code: '01 / WEB ARCHITECTURE', name: 'Web Architecture', icon: Code2 },
  { code: '02 / NATIVE MOBILE', name: 'Native Mobile', icon: Smartphone },
  { code: '03 / AI & AUTOMATION', name: 'AI & Pipelines', icon: Cpu },
  { code: '04 / BRAND SYSTEMS', name: 'UI/UX & Brand', icon: Palette },
  { code: '05 / GROWTH ENGINES', name: 'Performance Funnels', icon: TrendingUp },
  { code: '06 / CINEMATOGRAPHY', name: 'Commercial Video', icon: Video }
];

export const TrustStrip: React.FC = () => {
  return (
    <div className="bg-[#F7F7F4] border-b border-[#D9E0E5] py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Multidisciplinary Trust Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#D9E0E5]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#B8613A] border border-[#D9E0E5] shadow-subtle-card">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#5B6875] font-semibold">
                / MULTIDISCIPLINARY CAPABILITY
              </div>
              <div className="text-sm font-bold text-[#0B1F33] font-mono">
                Web • Apps • AI • Design • Growth • Video
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#5B6875]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>Founder Sprints</span>
            </div>
            <span className="text-[#D9E0E5]">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>Milestone Sign-Offs</span>
            </div>
            <span className="text-[#D9E0E5]">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>100% IP Handover</span>
            </div>
          </div>
        </div>

        {/* 6 Capabilities Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 font-mono">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-[#D9E0E5] text-[#111827] hover:text-[#B8613A] hover:border-[#B8613A]/40 shadow-subtle-card transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-[#B8613A] flex-shrink-0" />
                <span className="text-xs font-semibold tracking-tight whitespace-nowrap">{item.code}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
