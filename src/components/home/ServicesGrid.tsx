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
  Layers
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cpu,
  Palette,
  TrendingUp,
  Video
};

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="bg-corporate-offwhite text-corporate-text py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-corporate-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-corporate-softBlue border border-blue-200 text-xs font-mono uppercase tracking-widest text-corporate-blue mb-3 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Stack Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-corporate-dark font-display">
            One team. Six core capabilities.
          </h2>
          <p className="text-corporate-mutedText text-base sm:text-lg mt-4 leading-relaxed">
            We eliminate vendor fragmentation. From technical architecture and custom AI automation to brand cinematography and performance funnels, our founders lead every discipline directly.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Globe;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white hover:bg-white border border-corporate-border hover:border-corporate-blue/40 shadow-subtle-card hover:shadow-hover-card transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-corporate-softBlue border border-blue-100 flex items-center justify-center text-corporate-blue group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-corporate-mutedText tracking-widest font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-corporate-dark tracking-tight mb-2 group-hover:text-corporate-blue transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-corporate-mutedText text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Included Bullet Points */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-corporate-border">
                    {service.included.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-corporate-text">
                        <CheckCircle2 className="w-3.5 h-3.5 text-corporate-blue flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-corporate-border flex items-center justify-between">
                  <span className="text-xs text-corporate-mutedText font-mono">End-to-end delivery</span>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-dark group-hover:text-corporate-blue transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
