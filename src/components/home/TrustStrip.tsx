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
  { code: '01 / WEB DEV', name: 'Web Development', icon: Code2 },
  { code: '02 / MOBILE', name: 'App Engineering', icon: Smartphone },
  { code: '03 / AI AGENTS', name: 'AI & Automation', icon: Cpu },
  { code: '04 / BRANDING', name: 'UI/UX Systems', icon: Palette },
  { code: '05 / GROWTH', name: 'Growth Marketing', icon: TrendingUp },
  { code: '06 / VIDEO', name: 'Cinematography', icon: Video }
];

export const TrustStrip: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] border-b border-[#DCE5EF] py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Multidisciplinary Trust Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#DCE5EF]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1677FF] border border-[#DCE5EF] shadow-subtle-card">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold">
                / MULTIDISCIPLINARY CAPABILITIES
              </div>
              <div className="text-sm font-bold text-[#071A2F] font-mono">
                Web • Apps • AI • Design • Video
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>Founder Sprints</span>
            </div>
            <span className="text-[#DCE5EF]">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>Fixed Milestone Pricing</span>
            </div>
            <span className="text-[#DCE5EF]">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>100% IP Handover</span>
            </div>
          </div>
        </div>

        {/* 6 Capabilities Pills with Mono Code Prefix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 font-mono">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-[#DCE5EF] text-[#0F172A] hover:text-[#1677FF] hover:border-[#1677FF]/40 shadow-subtle-card transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-[#1677FF] flex-shrink-0" />
                <span className="text-xs font-semibold tracking-tight whitespace-nowrap">{item.code}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
