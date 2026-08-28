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
    <section id="services" className="bg-ink text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Stack Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory font-display">
            One team. Six core capabilities.
          </h2>
          <p className="text-slate-light text-base sm:text-lg mt-4 leading-relaxed">
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
                className="group relative flex flex-col justify-between p-7 rounded-xl bg-navy/40 hover:bg-navy/70 border border-navy-border hover:border-teal/50 transition-all duration-300 shadow-card-dark"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-ink border border-navy-border flex items-center justify-center text-teal group-hover:text-champagne transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-ivory tracking-tight mb-2 group-hover:text-teal transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-light text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Problem & Deliverables Checklist */}
                  <div className="mb-6 pt-4 border-t border-navy-border/60">
                    <div className="text-[11px] font-mono uppercase text-champagne tracking-wider mb-2">
                      Key Deliverables:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-light">
                      {service.included.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA Link */}
                <div className="pt-4 border-t border-navy-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {service.techStack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[10px] font-mono bg-ink text-slate-light rounded border border-ink-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ivory group-hover:text-teal transition-colors"
                  >
                    <span>Request Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Detailed Services Bar */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-ivory bg-navy/80 hover:bg-navy border border-navy-border rounded-lg transition-colors"
          >
            <span>View Full Deliverables & Technology Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-teal" />
          </Link>
        </div>
      </div>
    </section>
  );
};
