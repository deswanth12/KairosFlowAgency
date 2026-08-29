'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { ArrowUpRight, Sparkles, Layers, ArrowRight, Terminal } from 'lucide-react';

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Web', 'App', 'AI', 'Branding', 'Marketing', 'Content'];

export const FeaturedProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="selected-work" className="bg-[#F7F7F4] text-[#111827] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-4 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>/ SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
              Production Systems & Case Studies
            </h2>
            <p className="text-[#5B6875] text-base sm:text-lg mt-3 max-w-xl leading-relaxed">
              Real projects delivered across modern web architecture, autonomous AI pipelines, native mobile applications, and brand systems.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] hover:text-[#B8613A] transition-colors pb-1 border-b border-[#0B1F33]/30 hover:border-[#B8613A] self-start md:self-auto uppercase tracking-wider"
          >
            <span>/ VIEW ALL PROJECTS ({projectsData.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 font-mono">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-sm'
                  : 'bg-white hover:bg-[#FBF4F0] text-[#5B6875] hover:text-[#B8613A] border-[#D9E0E5]'
              }`}
            >
              {cat === 'All' ? `/ ALL (${projectsData.length})` : `/ ${cat.toUpperCase()}`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col bg-white border border-[#D9E0E5] rounded-2xl overflow-hidden shadow-subtle-card hover:shadow-hover-card transition-all duration-300 hover:border-[#B8613A]/40"
            >
              {/* Image Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B1F33]">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#0B1F33]/90 backdrop-blur-md text-white text-xs font-medium border border-white/15">
                    {project.category}
                  </span>
                  {project.projectType && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border backdrop-blur-md ${
                      project.projectType === 'Client Project'
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                        : project.projectType === 'Pilot System'
                        ? 'bg-blue-950/90 text-blue-300 border-blue-500/40'
                        : 'bg-[#0B1F33]/90 text-amber-300 border-amber-500/40'
                    }`}>
                      {project.projectType}
                    </span>
                  )}
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-[#B8613A] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#F7F7F4]" />
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Metric Badge Overlay */}
                {project.results?.[0] && (
                  <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-[#0B1F33]/90 backdrop-blur-md border border-white/15 text-right font-mono">
                    <div className="text-xs font-bold text-[#F7F7F4]">
                      {project.results[0].metric}
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium">
                      {project.results[0].label}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-7 sm:p-8 justify-between">
                <div>
                  <div className="text-xs font-mono text-[#5B6875] mb-2 font-semibold">
                    {project.client} • {project.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F33] tracking-tight mb-2.5 group-hover:text-[#B8613A] transition-colors font-display">
                    {project.title}
                  </h3>
                  <p className="text-[#5B6875] text-sm leading-relaxed line-clamp-2 mb-5">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6 font-mono">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] bg-[#F7F7F4] text-[#111827] rounded-md border border-[#D9E0E5]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 text-[11px] text-[#5B6875]">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 border-t border-[#D9E0E5] flex items-center justify-between font-mono">
                  <span className="text-xs text-[#5B6875]">TIMELINE: {project.duration}</span>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F33] group-hover:text-[#B8613A] transition-colors"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
