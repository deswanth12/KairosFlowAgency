import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Palette, 
  TrendingUp, 
  Video, 
  ArrowUpRight, 
  CheckCircle2, 
  Terminal
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cpu,
  Palette,
  TrendingUp,
  Video
};

const SERVICE_CODES: Record<string, string> = {
  'web-development': '01 / WEB ARCHITECTURE',
  'app-development': '02 / NATIVE MOBILE',
  'ai-automation': '03 / AI & AUTOMATION',
  'uiux-branding': '04 / DESIGN SYSTEMS',
  'digital-marketing': '05 / GROWTH ENGINES',
  'video-content': '06 / CINEMATOGRAPHY'
};

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="bg-[#F8FAFC] text-[#0F172A] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-3 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>/ SERVICES & DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2F] font-display">
            One engineering team. Six disciplines.
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg mt-4 leading-relaxed">
            We eliminate vendor fragmentation. From technical architecture and custom AI automation to brand systems and performance funnels, our founders lead every discipline directly.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Globe;
            const codeTag = SERVICE_CODES[service.slug] || `0${idx + 1} / CAPABILITY`;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#DCE5EF] hover:border-[#1677FF]/40 shadow-subtle-card hover:shadow-hover-card transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Technical Code */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-[#1677FF] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-[#1677FF] font-bold tracking-wider">
                      {codeTag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#071A2F] tracking-tight mb-2 group-hover:text-[#1677FF] transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Included Bullet Points */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-[#DCE5EF]">
                    {service.included.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#0F172A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#DCE5EF] flex items-center justify-between font-mono">
                  <span className="text-xs text-[#64748B]">SPECIFICATIONS</span>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#071A2F] group-hover:text-[#1677FF] transition-colors"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#1677FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
