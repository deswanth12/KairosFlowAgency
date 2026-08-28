import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Calendar, 
  Clock, 
  Briefcase, 
  Tag 
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
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Top Breadcrumb & Hero (Deep Ink) */}
      <section className="bg-ink text-ivory pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-light hover:text-ivory transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Work</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded bg-navy text-teal text-xs font-mono font-medium border border-navy-border">
              {project.category}
            </span>
            <span className="text-slate">•</span>
            <span className="text-xs font-mono text-slate-light">{project.industry}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-4xl mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-light max-w-3xl font-normal leading-relaxed mb-10">
            {project.tagline}
          </p>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-navy-border text-xs">
            <div>
              <div className="text-slate font-mono uppercase tracking-wider mb-1">Client</div>
              <div className="text-ivory font-semibold text-sm">{project.client}</div>
            </div>
            <div>
              <div className="text-slate font-mono uppercase tracking-wider mb-1">Timeline</div>
              <div className="text-ivory font-semibold text-sm">{project.duration} ({project.year})</div>
            </div>
            <div>
              <div className="text-slate font-mono uppercase tracking-wider mb-1">Role / Scope</div>
              <div className="text-ivory font-semibold text-sm">{project.role}</div>
            </div>
            <div>
              <div className="text-slate font-mono uppercase tracking-wider mb-1">Live Product</div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal hover:text-ivory font-semibold text-sm transition-colors"
                >
                  <span>Visit Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-slate-light">Private Enterprise</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-elevated-ivory border border-ivory-border bg-navy-dark">
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
          <div className="bg-ivory-card border border-ivory-border rounded-2xl p-8 mb-16 shadow-subtle-ivory">
            <div className="text-xs font-mono uppercase tracking-widest text-slate mb-6">
              Measurable Business Impact
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              {project.results.map((r, i) => (
                <div key={i} className="sm:border-r last:border-r-0 border-ivory-border pr-4">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-softblack mb-1">
                    {r.metric}
                  </div>
                  <div className="text-xs text-slate font-medium">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="p-8 rounded-2xl bg-ivory-card border border-ivory-border shadow-subtle-ivory">
            <div className="text-xs font-mono uppercase tracking-wider text-slate mb-3 font-semibold">
              01 • The Problem & Challenge
            </div>
            <h3 className="text-xl font-bold text-softblack mb-4">What was holding the business back?</h3>
            <p className="text-slate text-sm leading-relaxed">{project.challenge}</p>
          </div>

          <div className="p-8 rounded-2xl bg-ink text-ivory border border-navy-border shadow-card-dark">
            <div className="text-xs font-mono uppercase tracking-wider text-teal mb-3 font-semibold">
              02 • The Strategic Solution
            </div>
            <h3 className="text-xl font-bold text-ivory mb-4">How Kairos Flow executed</h3>
            <p className="text-slate-light text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Process Roadmap */}
        {project.process && project.process.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-softblack mb-8 font-display">
              Execution Sprints & Milestones
            </h3>
            <div className="space-y-3">
              {project.process.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-ivory-card border border-ivory-border"
                >
                  <span className="font-mono text-xs font-bold text-champagne mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-sm text-softblack font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Product Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-softblack mb-8 font-display">
            Key Architecture & Features Delivered
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-ivory-card border border-ivory-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-ivory-muted border border-ivory-border flex items-center justify-center text-teal font-mono text-xs font-bold mb-4">
                    {i + 1}
                  </div>
                  <h4 className="text-base font-bold text-softblack mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="p-8 rounded-2xl bg-ivory-muted border border-ivory-border mb-20">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate mb-4 font-semibold">
            Technology & Infrastructure
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-ivory-card border border-ivory-border text-xs font-mono text-softblack font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-softblack mb-8 font-display">
              Visual Highlights & Artifacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden border border-ivory-border bg-navy-dark"
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
        <div className="pt-12 border-t border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 text-left"
          >
            <div className="text-xs text-slate font-mono uppercase">Next Project</div>
            <div className="text-sm font-bold text-softblack group-hover:text-teal transition-colors flex items-center gap-1">
              <span>{nextProject.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href={`/contact?service=${encodeURIComponent(project.category)}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-sm transition-colors"
          >
            <span>Request a Project Like This</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
