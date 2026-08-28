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
    <div className="bg-white text-corporate-text min-h-screen">
      {/* Hero Banner */}
      <section className="bg-white text-corporate-text pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-corporate-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-corporate-softBlue border border-blue-200 text-xs font-mono uppercase tracking-widest text-corporate-blue mb-4 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Agency Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-corporate-dark font-display max-w-3xl mb-6">
            Multi-disciplinary excellence, unified under one roof.
          </h1>
          <p className="text-corporate-mutedText text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            We deliver end-to-end digital solutions without the overhead or fragmentation of multiple disconnected agencies.
          </p>
        </div>
      </section>

      {/* Services List Breakdown */}
      <div className="bg-corporate-offwhite py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-corporate-border">
        <div className="max-w-7xl mx-auto space-y-16">
          {servicesData.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Globe;
            return (
              <section
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 bg-white border border-corporate-border rounded-2xl p-8 sm:p-12 shadow-subtle-card hover:shadow-elevated-card transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-corporate-border mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-corporate-softBlue text-corporate-blue border border-blue-100 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-corporate-blue font-bold uppercase tracking-wider mb-1">
                        Capability 0{idx + 1}
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-corporate-dark tracking-tight font-display">
                        {service.title}
                      </h2>
                      <p className="text-corporate-mutedText text-sm sm:text-base mt-2 max-w-2xl">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-corporate-dark hover:bg-corporate-darkHover rounded-lg shadow-sm transition-colors self-start md:self-auto"
                  >
                    <span>Request Service Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Problem Solved & Inclusions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                  {/* Problem Solved (5 cols) */}
                  <div className="lg:col-span-5 bg-corporate-offwhite p-6 rounded-xl border border-corporate-border">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-corporate-dark mb-3 font-bold">
                      <HelpCircle className="w-4 h-4 text-corporate-blue" />
                      <span>The Problem We Solve</span>
                    </div>
                    <p className="text-sm text-corporate-mutedText leading-relaxed">
                      {service.problemSolved}
                    </p>

                    <div className="mt-6 pt-4 border-t border-corporate-border">
                      <div className="text-xs font-mono uppercase tracking-wider text-corporate-dark mb-2 font-bold">
                        Ideal For:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.idealFor.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-0.5 text-[11px] font-mono bg-white text-corporate-text rounded-md border border-corporate-border"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* What is Included (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="text-xs font-mono uppercase tracking-wider text-corporate-dark mb-4 font-bold">
                      What is Included:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.included.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-corporate-text">
                          <CheckCircle2 className="w-4 h-4 text-corporate-blue flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deliverables Breakdown Columns */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-corporate-dark mb-4 font-bold">
                    <PackageCheck className="w-4 h-4 text-corporate-blue" />
                    <span>Standard Milestone Deliverables:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {service.deliverables.map((del, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-corporate-offwhite border border-corporate-border flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-corporate-dark mb-2 font-display">{del.title}</div>
                          <ul className="space-y-1.5 text-[11px] text-corporate-mutedText">
                            {del.items.map((item, j) => (
                              <li key={j} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-corporate-blue" />
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
                <div className="pt-6 border-t border-corporate-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-corporate-mutedText mr-2 font-semibold">Production Stack:</span>
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-mono bg-corporate-offwhite text-corporate-text rounded-md border border-corporate-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work?category=${service.category.split(' ')[0]}`}
                    className="text-xs font-semibold text-corporate-blue hover:text-corporate-dark transition-colors inline-flex items-center gap-1"
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
    </div>
  );
}
