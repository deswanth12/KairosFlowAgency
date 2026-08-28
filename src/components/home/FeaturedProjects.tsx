'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { ArrowUpRight, Sparkles, Layers, ArrowRight } from 'lucide-react';

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Web', 'App', 'AI', 'Branding', 'Marketing', 'Content'];

export const FeaturedProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="selected-work" className="bg-ivory text-softblack py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
              <Layers className="w-3.5 h-3.5 text-teal" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-softblack font-display">
              Selected Work & Case Studies
            </h2>
            <p className="text-slate text-base sm:text-lg mt-3 max-w-xl">
              Real projects delivered across modern web architecture, autonomous AI pipelines, native mobile applications, and brand identity.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-softblack hover:text-teal transition-colors pb-1 border-b border-softblack/30 hover:border-teal self-start md:self-auto"
          >
            <span>Explore All Projects ({projectsData.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-ink text-ivory shadow-sm'
                  : 'bg-ivory-card hover:bg-ivory-muted text-slate hover:text-softblack border border-ivory-border'
              }`}
            >
              {cat}
              {cat === 'All' ? ` (${projectsData.length})` : ''}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="group flex flex-col bg-ivory-card border border-ivory-border rounded-xl overflow-hidden shadow-subtle-ivory hover:shadow-elevated-ivory transition-all duration-300 hover:border-teal/50"
            >
              {/* Image Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-dark">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-ink/90 backdrop-blur-md text-ivory text-xs font-mono font-medium border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded bg-champagne/90 backdrop-blur-md text-ink text-[11px] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-ink" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Metric Badge Overlay */}
                {project.results?.[0] && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-ink/90 backdrop-blur-md border border-white/10 text-right">
                    <div className="text-xs font-bold font-mono text-champagne">
                      {project.results[0].metric}
                    </div>
                    <div className="text-[10px] text-slate-light">
                      {project.results[0].label}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
                <div>
                  <div className="text-xs font-mono text-slate mb-2">
                    {project.client} • {project.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-softblack tracking-tight mb-2 group-hover:text-teal transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono bg-ivory-muted text-slate-dark rounded border border-ivory-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono text-slate">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-ivory-border flex items-center justify-between">
                  <span className="text-xs text-slate font-medium">Timeline: {project.duration}</span>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-softblack group-hover:text-teal transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
