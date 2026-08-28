'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { Layers, Search, ArrowUpRight, Filter, Terminal } from 'lucide-react';

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
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* Top Hero Section */}
      <section className="bg-[#F8FAFC] text-[#0F172A] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-4 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>/ CURATED REPOSITORIES & CASE STUDIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#071A2F] font-display max-w-3xl mb-6">
            Work engineered for <span className="text-[#1677FF]">commercial scale.</span>
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Explore how we partner with enterprise teams and high-growth founders to design, build, and deploy production-ready digital products.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-[#F8FAFC] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto">
          {/* Controls: Search + Filter Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-8 border-b border-[#DCE5EF]">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-[#071A2F] text-white border-[#071A2F] shadow-sm'
                      : 'bg-white hover:bg-[#EFF6FF] text-[#64748B] hover:text-[#1677FF] border-[#DCE5EF]'
                  }`}
                >
                  {cat === 'All' ? `/ ALL (${projectsData.length})` : `/ ${cat.toUpperCase()}`}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, stack, or client..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-lg bg-white border border-[#DCE5EF] text-[#0F172A] focus:outline-none focus:border-[#1677FF] shadow-sm font-sans"
              />
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-xs font-mono text-[#64748B] mb-8">
            SHOWING {filteredProjects.length} OF {projectsData.length} REPOSITORIES
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#DCE5EF] p-8 shadow-sm">
              <Filter className="w-8 h-8 text-[#64748B] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#071A2F] mb-1 font-display">No matching projects found</h3>
              <p className="text-xs text-[#64748B] mb-6">Try adjusting your category filter or search keywords.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-mono font-bold text-white bg-[#071A2F] rounded-lg shadow-sm"
              >
                / RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col bg-white border border-[#DCE5EF] rounded-2xl overflow-hidden shadow-subtle-card hover:shadow-hover-card transition-all duration-300 hover:border-[#1677FF]/40"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071A2F]">
                    <Image
                      src={project.thumbnail || project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#071A2F]/90 text-white text-[11px] border border-white/15">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-[#1677FF] text-white text-[10px] font-bold shadow-sm">
                          FEATURED
                        </span>
                      )}
                    </div>
                    {project.results?.[0] && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#071A2F]/90 backdrop-blur-md text-right border border-white/15 font-mono">
                        <span className="text-xs font-bold text-[#38BDF8]">
                          {project.results[0].metric}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] font-mono text-[#64748B] mb-1">
                        {project.client} • {project.year}
                      </div>
                      <h3 className="text-lg font-bold text-[#071A2F] tracking-tight mb-2 group-hover:text-[#1677FF] transition-colors font-display">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4">
                        {project.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4 font-mono">
                        {project.techStack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] bg-[#F8FAFC] text-[#0F172A] rounded border border-[#DCE5EF]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#DCE5EF] flex items-center justify-between font-mono">
                      <span className="text-[11px] text-[#64748B]">{project.duration}</span>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#071A2F] group-hover:text-[#1677FF] transition-colors"
                      >
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#1677FF]" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
