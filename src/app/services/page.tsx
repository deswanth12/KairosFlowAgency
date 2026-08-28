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
  PackageCheck,
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

export const metadata = {
  title: 'Services & Capabilities | Kairos Flow Agency',
  description: 'Explore Kairos Flow Agency services: Web Development, App Development, AI & Automation, UI/UX & Branding, Digital Marketing, and Video Production.'
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[#F8FAFC] text-[#0F172A] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-4 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>/ FULL-STACK DISCIPLINES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#071A2F] font-display max-w-3xl mb-6">
            Multi-disciplinary excellence, <span className="text-[#1677FF]">unified in code.</span>
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            We deliver end-to-end digital solutions without the overhead or fragmentation of multiple disconnected agencies.
          </p>
        </div>
      </section>

      {/* Services List Breakdown */}
      <div className="bg-[#F8FAFC] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto space-y-16">
          {servicesData.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Globe;
            return (
              <section
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 bg-white border border-[#DCE5EF] rounded-2xl p-8 sm:p-12 shadow-subtle-card hover:shadow-elevated-card transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#DCE5EF] mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#1677FF] border border-blue-100 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#1677FF] font-bold uppercase tracking-wider mb-1">
                        0{idx + 1} // CAPABILITY SPECIFICATION
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071A2F] tracking-tight font-display">
                        {service.title}
                      </h2>
                      <p className="text-[#64748B] text-sm sm:text-base mt-2 max-w-2xl">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono font-bold text-white bg-[#071A2F] hover:bg-[#0B2544] rounded-lg shadow-sm transition-colors self-start md:self-auto uppercase tracking-wider"
                  >
                    <span>/ REQUEST SCOPE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                  </Link>
                </div>

                {/* Problem Solved & Inclusions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                  {/* Problem Solved (5 cols) */}
                  <div className="lg:col-span-5 bg-[#F8FAFC] p-6 rounded-xl border border-[#DCE5EF]">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#071A2F] mb-3 font-bold">
                      <HelpCircle className="w-4 h-4 text-[#1677FF]" />
                      <span>The Problem We Solve</span>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {service.problemSolved}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#DCE5EF]">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#071A2F] mb-2 font-bold">
                        Ideal For:
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono">
                        {service.idealFor.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-0.5 text-[11px] bg-white text-[#0F172A] rounded-md border border-[#DCE5EF]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* What is Included (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#071A2F] mb-4 font-bold">
                      What is Included in Sprint:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.included.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F172A]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF] flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deliverables Breakdown Columns */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#071A2F] mb-4 font-bold">
                    <PackageCheck className="w-4 h-4 text-[#1677FF]" />
                    <span>Standard Milestone Deliverables:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {service.deliverables.map((del, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF] flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#071A2F] mb-2 font-display">{del.title}</div>
                          <ul className="space-y-1.5 text-[11px] text-[#64748B] font-mono">
                            {del.items.map((item, j) => (
                              <li key={j} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]" />
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
                <div className="pt-6 border-t border-[#DCE5EF] flex flex-wrap items-center justify-between gap-4 font-mono">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-[#64748B] mr-2 font-semibold">STACK:</span>
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] bg-[#F8FAFC] text-[#0F172A] rounded-md border border-[#DCE5EF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work?category=${service.category.split(' ')[0]}`}
                    className="text-xs font-bold text-[#1677FF] hover:text-[#071A2F] transition-colors inline-flex items-center gap-1"
                  >
                    <span>/ VIEW {service.title.toUpperCase()} REPOSITORIES</span>
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
