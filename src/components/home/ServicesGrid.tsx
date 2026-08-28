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
  'ai-automation': '03 / AI & PIPELINES',
  'uiux-branding': '04 / BRAND SYSTEMS',
  'digital-marketing': '05 / GROWTH ENGINES',
  'video-content': '06 / CINEMATOGRAPHY'
};

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="bg-[#F7F7F4] text-[#111827] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-3 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
            <span>/ SERVICES & DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
            One engineering team. Six disciplines.
          </h2>
          <p className="text-[#5B6875] text-base sm:text-lg mt-4 leading-relaxed">
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
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#D9E0E5] hover:border-[#B8613A]/40 shadow-subtle-card hover:shadow-hover-card transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Technical Code */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF4F0] border border-[#B8613A]/20 flex items-center justify-center text-[#B8613A] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-[#B8613A] font-bold tracking-wider">
                      {codeTag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0B1F33] tracking-tight mb-2 group-hover:text-[#B8613A] transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-[#5B6875] text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Included Bullet Points */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-[#D9E0E5]">
                    {service.included.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#111827]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#D9E0E5] flex items-center justify-between font-mono">
                  <span className="text-xs text-[#5B6875]">SPECIFICATIONS</span>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B1F33] group-hover:text-[#B8613A] transition-colors"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
