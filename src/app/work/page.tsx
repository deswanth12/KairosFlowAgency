'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { Layers, Search, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

const CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Web',
  'App',
  'AI',
  'Branding',
  'Marketing',
  'Content'
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter((project) => {
    const matchesCat = activeCategory === 'All' || project.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.client.toLowerCase().includes(q) ||
      project.summary.toLowerCase().includes(q) ||
      project.techStack.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Top Hero Section (Dark Editorial) */}
      <section className="bg-ink text-ivory pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-3xl mb-6">
            Work engineered for commercial outcomes.
          </h1>
          <p className="text-slate-light text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Explore how we partner with enterprise teams and high-growth founders to design, build, and deploy production-ready digital products.
          </p>
        </div>
      </section>

      {/* Main Content Area (Warm Ivory) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Controls: Search + Filter Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-8 border-b border-ivory-border">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
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
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, stack, or client..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-md bg-ivory-card border border-ivory-border text-softblack focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs font-mono text-slate mb-8">
          Showing {filteredProjects.length} of {projectsData.length} projects
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-ivory-card rounded-2xl border border-ivory-border p-8">
            <Filter className="w-8 h-8 text-slate mx-auto mb-3" />
            <h3 className="text-lg font-bold text-softblack mb-1">No matching projects found</h3>
            <p className="text-xs text-slate mb-6">Try adjusting your category filter or search keywords.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-ivory bg-ink rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col bg-ivory-card border border-ivory-border rounded-xl overflow-hidden shadow-subtle-ivory hover:shadow-elevated-ivory transition-all duration-300 hover:border-teal/50"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-dark">
                  <Image
                    src={project.thumbnail || project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-ink/90 text-ivory text-[11px] font-mono border border-white/10">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded bg-champagne text-ink text-[10px] font-bold">
                        Featured
                      </span>
                    )}
                  </div>
                  {project.results?.[0] && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-ink/90 backdrop-blur-md text-right border border-white/10">
                      <span className="text-xs font-bold font-mono text-champagne">
                        {project.results[0].metric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[11px] font-mono text-slate mb-1">
                      {project.client} • {project.year}
                    </div>
                    <h3 className="text-lg font-bold text-softblack tracking-tight mb-2 group-hover:text-teal transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate leading-relaxed line-clamp-2 mb-4">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 text-[10px] font-mono bg-ivory-muted text-slate-dark rounded border border-ivory-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-ivory-border flex items-center justify-between">
                    <span className="text-[11px] text-slate font-medium">{project.duration}</span>
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-softblack group-hover:text-teal transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
