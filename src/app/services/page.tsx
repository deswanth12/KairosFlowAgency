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
  title: 'Services & Disciplines | Kairos Flow Agency',
  description: 'Explore Kairos Flow Agency services: Web Development, App Development, AI & Automation, UI/UX & Branding, Digital Marketing, and Video Production.'
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F7F7F4] text-[#111827] min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[#F7F7F4] text-[#111827] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-4 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
            <span>/ FULL-STACK DISCIPLINES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B1F33] font-display max-w-3xl mb-6">
            Multi-disciplinary excellence, <span className="text-[#B8613A]">unified in code.</span>
          </h1>
          <p className="text-[#5B6875] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            We deliver end-to-end digital solutions without the overhead or fragmentation of multiple disconnected agencies.
          </p>
        </div>
      </section>

      {/* Services List Breakdown */}
      <div className="bg-[#F7F7F4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
        <div className="max-w-7xl mx-auto space-y-16">
          {servicesData.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Globe;
            return (
              <section
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 bg-white border border-[#D9E0E5] rounded-2xl p-8 sm:p-12 shadow-subtle-card hover:shadow-elevated-card transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#D9E0E5] mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FBF4F0] text-[#B8613A] border border-[#B8613A]/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#B8613A] font-bold uppercase tracking-wider mb-1">
                        0{idx + 1} // CAPABILITY SPECIFICATION
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1F33] tracking-tight font-display">
                        {service.title}
                      </h2>
                      <p className="text-[#5B6875] text-sm sm:text-base mt-2 max-w-2xl">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg shadow-sm transition-colors self-start md:self-auto uppercase tracking-wider"
                  >
                    <span>/ REQUEST SCOPE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A]" />
                  </Link>
                </div>

                {/* Problem Solved & Inclusions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                  {/* Problem Solved (5 cols) */}
                  <div className="lg:col-span-5 bg-[#F7F7F4] p-6 rounded-xl border border-[#D9E0E5]">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0B1F33] mb-3 font-bold">
                      <HelpCircle className="w-4 h-4 text-[#B8613A]" />
                      <span>The Problem We Solve</span>
                    </div>
                    <p className="text-sm text-[#5B6875] leading-relaxed">
                      {service.problemSolved}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#D9E0E5]">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#0B1F33] mb-2 font-bold">
                        Ideal For:
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono">
                        {service.idealFor.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-0.5 text-[11px] bg-white text-[#111827] rounded-md border border-[#D9E0E5]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* What is Included (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#0B1F33] mb-4 font-bold">
                      What is Included in Sprint:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.included.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#111827]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A] flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deliverables Breakdown Columns */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0B1F33] mb-4 font-bold">
                    <PackageCheck className="w-4 h-4 text-[#B8613A]" />
                    <span>Standard Milestone Deliverables:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {service.deliverables.map((del, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0B1F33] mb-2 font-display">{del.title}</div>
                          <ul className="space-y-1.5 text-[11px] text-[#5B6875] font-mono">
                            {del.items.map((item, j) => (
                              <li key={j} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B8613A]" />
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
                <div className="pt-6 border-t border-[#D9E0E5] flex flex-wrap items-center justify-between gap-4 font-mono">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-[#5B6875] mr-2 font-semibold">STACK:</span>
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] bg-[#F7F7F4] text-[#111827] rounded-md border border-[#D9E0E5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work?category=${service.category.split(' ')[0]}`}
                    className="text-xs font-bold text-[#B8613A] hover:text-[#0B1F33] transition-colors inline-flex items-center gap-1"
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
