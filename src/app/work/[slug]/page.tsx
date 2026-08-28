import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ExternalLink
} from 'lucide-react';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Kairos Flow Agency',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Kairos Flow Case Study`,
      description: project.summary,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-[#F8FAFC] text-[#0F172A] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#1677FF] transition-colors mb-8 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>/ BACK TO ALL WORK</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4 font-mono">
            <span className="px-3 py-1 rounded-full bg-white text-[#1677FF] text-xs font-semibold border border-[#DCE5EF] shadow-subtle-card">
              {project.category}
            </span>
            <span className="text-[#DCE5EF]">•</span>
            <span className="text-xs text-[#64748B]">{project.industry}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#071A2F] font-display max-w-4xl mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[#64748B] max-w-3xl font-normal leading-relaxed mb-10">
            {project.tagline}
          </p>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#DCE5EF] text-xs font-mono">
            <div>
              <div className="text-[#64748B] uppercase tracking-wider mb-1 font-semibold">CLIENT</div>
              <div className="text-[#071A2F] font-bold text-sm font-sans">{project.client}</div>
            </div>
            <div>
              <div className="text-[#64748B] uppercase tracking-wider mb-1 font-semibold">TIMELINE</div>
              <div className="text-[#071A2F] font-bold text-sm font-sans">{project.duration} ({project.year})</div>
            </div>
            <div>
              <div className="text-[#64748B] uppercase tracking-wider mb-1 font-semibold">SCOPE</div>
              <div className="text-[#071A2F] font-bold text-sm font-sans">{project.role}</div>
            </div>
            <div>
              <div className="text-[#64748B] uppercase tracking-wider mb-1 font-semibold">DEPLOYMENT</div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#1677FF] hover:text-[#071A2F] font-bold text-sm transition-colors"
                >
                  <span>LIVE PLATFORM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[#64748B]">PRIVATE ENTERPRISE</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-elevated-card border border-[#DCE5EF] bg-[#071A2F]">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Editorial Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Results Banner */}
        {project.results && project.results.length > 0 && (
          <div className="bg-white border border-[#DCE5EF] rounded-2xl p-8 mb-16 shadow-subtle-card">
            <div className="text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-6 font-bold">
              / MEASURABLE BUSINESS OUTCOMES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              {project.results.map((r, i) => (
                <div key={i} className="sm:border-r last:border-r-0 border-[#DCE5EF] pr-4">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#071A2F] mb-1">
                    {r.metric}
                  </div>
                  <div className="text-xs text-[#64748B] font-medium">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-white border border-[#DCE5EF] shadow-subtle-card">
            <div className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-3 font-semibold">
              01 // THE TECHNICAL CHALLENGE
            </div>
            <h3 className="text-xl font-bold text-[#071A2F] mb-4 font-display">What was blocking scale?</h3>
            <p className="text-[#64748B] text-sm leading-relaxed">{project.challenge}</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#071A2F] text-white border border-[#071A2F] shadow-elevated-card">
            <div className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3 font-semibold">
              02 // THE STRATEGIC SOLUTION
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-display">How Kairos Flow executed</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Process Roadmap */}
        {project.process && project.process.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#071A2F] mb-8 font-display">
              Execution Sprints & Milestones
            </h3>
            <div className="space-y-3">
              {project.process.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#DCE5EF]"
                >
                  <span className="font-mono text-xs font-bold text-[#1677FF] mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-sm text-[#0F172A] font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Product Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#071A2F] mb-8 font-display">
            Architecture & Features Delivered
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#DCE5EF] flex flex-col justify-between shadow-subtle-card"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-[#1677FF] font-mono text-xs font-bold mb-4">
                    {i + 1}
                  </div>
                  <h4 className="text-base font-bold text-[#071A2F] mb-2 font-display">{feat.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="p-8 rounded-2xl bg-white border border-[#DCE5EF] mb-20 shadow-subtle-card">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-4 font-bold">
            / PRODUCTION INFRASTRUCTURE & STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#DCE5EF] text-xs font-mono text-[#0F172A] font-medium shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#071A2F] mb-8 font-display">
              Visual Artifacts & Telemetry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#DCE5EF] bg-[#071A2F] shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery asset ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation & CTA Banner */}
        <div className="pt-12 border-t border-[#DCE5EF] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 text-left"
          >
            <div className="text-xs text-[#64748B] uppercase font-semibold">/ NEXT PROJECT</div>
            <div className="text-sm font-bold text-[#071A2F] group-hover:text-[#1677FF] transition-colors flex items-center gap-1 font-sans">
              <span>{nextProject.title}</span>
              <ArrowUpRight className="w-4 h-4 text-[#1677FF]" />
            </div>
          </Link>

          <Link
            href={`/contact?service=${encodeURIComponent(project.category)}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#071A2F] hover:bg-[#0B2544] rounded-lg shadow-sm transition-colors uppercase tracking-wider"
          >
            <span>/ INQUIRE ON SYSTEM LIKE THIS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
