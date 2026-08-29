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
    <div className="bg-[#F7F7F4] text-[#111827] min-h-screen">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-[#F7F7F4] text-[#111827] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#5B6875] hover:text-[#B8613A] transition-colors mb-8 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>/ BACK TO ALL WORK</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4 font-mono">
            <span className="px-3 py-1 rounded-full bg-white text-[#B8613A] text-xs font-semibold border border-[#D9E0E5] shadow-subtle-card">
              {project.category}
            </span>
            {project.projectType && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                project.projectType === 'Client Project'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : project.projectType === 'Pilot System'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {project.projectType}
              </span>
            )}
            <span className="text-[#D9E0E5]">•</span>
            <span className="text-xs text-[#5B6875]">{project.industry}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B1F33] font-display max-w-4xl mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[#5B6875] max-w-3xl font-normal leading-relaxed mb-10">
            {project.tagline}
          </p>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#D9E0E5] text-xs font-mono">
            <div>
              <div className="text-[#5B6875] uppercase tracking-wider mb-1 font-semibold">CLIENT</div>
              <div className="text-[#0B1F33] font-bold text-sm font-sans">{project.client}</div>
            </div>
            <div>
              <div className="text-[#5B6875] uppercase tracking-wider mb-1 font-semibold">TIMELINE</div>
              <div className="text-[#0B1F33] font-bold text-sm font-sans">{project.duration} ({project.year})</div>
            </div>
            <div>
              <div className="text-[#5B6875] uppercase tracking-wider mb-1 font-semibold">SCOPE</div>
              <div className="text-[#0B1F33] font-bold text-sm font-sans">{project.role}</div>
            </div>
            <div>
              <div className="text-[#5B6875] uppercase tracking-wider mb-1 font-semibold">DEPLOYMENT</div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#B8613A] hover:text-[#0B1F33] font-bold text-sm transition-colors"
                >
                  <span>LIVE PLATFORM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[#5B6875]">PRIVATE ENTERPRISE</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-elevated-card border border-[#D9E0E5] bg-[#0B1F33]">
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
          <div className="bg-white border border-[#D9E0E5] rounded-2xl p-8 mb-16 shadow-subtle-card">
            <div className="text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-6 font-bold">
              / MEASURABLE BUSINESS OUTCOMES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              {project.results.map((r, i) => (
                <div key={i} className="sm:border-r last:border-r-0 border-[#D9E0E5] pr-4">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#0B1F33] mb-1">
                    {r.metric}
                  </div>
                  <div className="text-xs text-[#5B6875] font-medium">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card">
            <div className="text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-3 font-semibold">
              01 // THE STRATEGIC CHALLENGE
            </div>
            <h3 className="text-xl font-bold text-[#0B1F33] mb-4 font-display">What was blocking scale?</h3>
            <p className="text-[#5B6875] text-sm leading-relaxed">{project.challenge}</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0B1F33] text-white border border-[#0B1F33] shadow-elevated-card">
            <div className="text-xs font-mono uppercase tracking-wider text-[#B8613A] mb-3 font-semibold">
              02 // THE ENGINEERING EXECUTION
            </div>
            <h3 className="text-xl font-bold text-white mb-4 font-display">How Kairos Flow executed</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Process Roadmap */}
        {project.process && project.process.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#0B1F33] mb-8 font-display">
              Execution Sprints & Milestones
            </h3>
            <div className="space-y-3">
              {project.process.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D9E0E5]"
                >
                  <span className="font-mono text-xs font-bold text-[#B8613A] mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-sm text-[#111827] font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Product Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#0B1F33] mb-8 font-display">
            Architecture & Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#D9E0E5] flex flex-col justify-between shadow-subtle-card"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FBF4F0] border border-[#B8613A]/20 flex items-center justify-center text-[#B8613A] font-mono text-xs font-bold mb-4">
                    {i + 1}
                  </div>
                  <h4 className="text-base font-bold text-[#0B1F33] mb-2 font-display">{feat.title}</h4>
                  <p className="text-xs text-[#5B6875] leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="p-8 rounded-2xl bg-white border border-[#D9E0E5] mb-20 shadow-subtle-card">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-4 font-bold">
            / PRODUCTION INFRASTRUCTURE & STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-[#F7F7F4] border border-[#D9E0E5] text-xs font-mono text-[#111827] font-medium shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#0B1F33] mb-8 font-display">
              Visual Artifacts & Telemetry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#D9E0E5] bg-[#0B1F33] shadow-sm"
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
        <div className="pt-12 border-t border-[#D9E0E5] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 text-left"
          >
            <div className="text-xs text-[#5B6875] uppercase font-semibold">/ NEXT PROJECT</div>
            <div className="text-sm font-bold text-[#0B1F33] group-hover:text-[#B8613A] transition-colors flex items-center gap-1 font-sans">
              <span>{nextProject.title}</span>
              <ArrowUpRight className="w-4 h-4 text-[#B8613A]" />
            </div>
          </Link>

          <Link
            href={`/contact?service=${encodeURIComponent(project.category)}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg shadow-sm transition-colors uppercase tracking-wider"
          >
            <span>/ INQUIRE ON SYSTEM LIKE THIS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
