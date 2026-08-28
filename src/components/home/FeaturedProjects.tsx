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
    <section id="selected-work" className="bg-white text-corporate-text py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-corporate-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-softBlue border border-blue-200 text-xs font-mono uppercase tracking-widest text-corporate-blue mb-3 font-semibold">
              <Layers className="w-3.5 h-3.5 text-corporate-blue" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-corporate-dark font-display">
              Selected Work & Case Studies
            </h2>
            <p className="text-corporate-mutedText text-base sm:text-lg mt-3 max-w-xl">
              Real projects delivered across modern web architecture, autonomous AI pipelines, native mobile applications, and brand systems.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-corporate-dark hover:text-corporate-blue transition-colors pb-1 border-b border-corporate-dark/30 hover:border-corporate-blue self-start md:self-auto"
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
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-corporate-dark text-white font-semibold shadow-sm'
                  : 'bg-corporate-offwhite hover:bg-corporate-softBlue text-corporate-mutedText hover:text-corporate-blue border border-corporate-border'
              }`}
            >
              {cat}
              {cat === 'All' ? ` (${projectsData.length})` : ''}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col bg-white border border-corporate-border rounded-2xl overflow-hidden shadow-subtle-card hover:shadow-hover-card transition-all duration-300 hover:border-corporate-blue/40"
            >
              {/* Image Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-corporate-dark">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-corporate-dark/90 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-corporate-blue text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Metric Badge Overlay */}
                {project.results?.[0] && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-corporate-dark/90 backdrop-blur-md border border-white/10 text-right">
                    <div className="text-xs font-bold font-mono text-corporate-sky">
                      {project.results[0].metric}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      {project.results[0].label}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
                <div>
                  <div className="text-xs font-mono text-corporate-mutedText mb-2">
                    {project.client} • {project.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-corporate-dark tracking-tight mb-2 group-hover:text-corporate-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-corporate-mutedText text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-mono bg-corporate-offwhite text-corporate-text rounded-md border border-corporate-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono text-corporate-mutedText">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-corporate-border flex items-center justify-between">
                  <span className="text-xs text-corporate-mutedText font-medium">Timeline: {project.duration}</span>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-corporate-dark group-hover:text-corporate-blue transition-colors"
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
