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
  Layers, 
  Sparkles,
  HelpCircle,
  PackageCheck
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cpu,
  Palette,
  TrendingUp,
  Video
};

export const metadata = {
  title: 'Services & Capabilities | Kairos Flow Agency',
  description: 'Explore Kairos Flow Agency services: Web Development, App Development, AI & Automation, UI/UX & Branding, Digital Marketing, and Video Production.'
};

export default function ServicesPage() {
  return (
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Hero Banner (Deep Ink) */}
      <section className="bg-ink text-ivory pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Agency Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-3xl mb-6">
            Multi-disciplinary excellence, unified under one roof.
          </h1>
          <p className="text-slate-light text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            We deliver end-to-end digital solutions without the overhead or fragmentation of multiple disconnected agencies.
          </p>
        </div>
      </section>

      {/* Services List Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {servicesData.map((service, idx) => {
          const Icon = ICON_MAP[service.iconName] || Globe;
          return (
            <section
              key={service.id}
              id={service.slug}
              className="scroll-mt-28 bg-ivory-card border border-ivory-border rounded-2xl p-8 sm:p-12 shadow-subtle-ivory"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-ivory-border mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-ink text-teal border border-navy-border flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-champagne font-bold uppercase tracking-wider mb-1">
                      Capability 0{idx + 1}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-softblack tracking-tight font-display">
                      {service.title}
                    </h2>
                    <p className="text-slate text-sm sm:text-base mt-2 max-w-2xl">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-sm transition-colors self-start md:self-auto"
                >
                  <span>Request Service Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Problem Solved & Inclusions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                {/* Problem Solved (5 cols) */}
                <div className="lg:col-span-5 bg-ivory-muted/60 p-6 rounded-xl border border-ivory-border">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate mb-3 font-semibold">
                    <HelpCircle className="w-4 h-4 text-teal" />
                    <span>The Problem We Solve</span>
                  </div>
                  <p className="text-sm text-softblack leading-relaxed">
                    {service.problemSolved}
                  </p>

                  <div className="mt-6 pt-4 border-t border-ivory-border">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate mb-2 font-semibold">
                      Ideal For:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.idealFor.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 text-[11px] font-mono bg-ivory text-softblack rounded border border-ivory-border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* What is Included (7 cols) */}
                <div className="lg:col-span-7">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate mb-4 font-semibold">
                    What is Included:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.included.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-softblack">
                        <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverables Breakdown Columns */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate mb-4 font-semibold">
                  <PackageCheck className="w-4 h-4 text-champagne" />
                  <span>Standard Milestone Deliverables:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.deliverables.map((del, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-ivory border border-ivory-border flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-softblack mb-2">{del.title}</div>
                        <ul className="space-y-1.5 text-[11px] text-slate">
                          {del.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-teal" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Strip */}
              <div className="pt-6 border-t border-ivory-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-slate mr-2">Production Stack:</span>
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono bg-ivory text-softblack rounded border border-ivory-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work?category=${service.category.split(' ')[0]}`}
                  className="text-xs font-semibold text-teal hover:text-softblack transition-colors inline-flex items-center gap-1"
                >
                  <span>View {service.title} Case Studies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
