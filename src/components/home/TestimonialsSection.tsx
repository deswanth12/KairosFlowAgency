import React from 'react';
import Link from 'next/link';
import { testimonialsData } from '@/data/testimonials';
import { Star, ShieldCheck, Quote, ArrowUpRight, Terminal } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-[#F7F7F4] text-[#111827] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-3 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>/ VERIFIED CLIENT OUTCOMES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
              Real results for ambitious businesses.
            </h2>
            <p className="text-[#5B6875] text-base sm:text-lg mt-3 max-w-xl">
              We partner directly with business owners and product leads to deliver fast, measurable commercial outcomes.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] hover:text-[#B8613A] transition-colors pb-1 border-b border-[#0B1F33]/30 hover:border-[#B8613A] self-start md:self-auto uppercase tracking-wider"
          >
            <span>/ START YOUR PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A]" />
          </Link>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#D9E0E5] shadow-subtle-card hover:shadow-hover-card hover:border-[#B8613A]/40 transition-all duration-300 relative group"
            >
              <div>
                {/* Top Row: Stars + Result Metric Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {test.resultsMetric && (
                    <span className="px-2.5 py-1 rounded-md bg-[#FBF4F0] border border-[#B8613A]/20 text-[11px] font-mono font-bold text-[#B8613A]">
                      {test.resultsMetric}
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-[#111827] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Client Info & Project Built */}
              <div className="pt-5 border-t border-[#D9E0E5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1F33] font-display">
                      {test.clientName}
                    </h4>
                    <div className="text-xs text-[#5B6875] font-mono">
                      {test.clientRole} • <strong className="text-[#0B1F33] font-sans">{test.companyName}</strong>
                    </div>
                  </div>

                  {test.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200" title="Verified client deliverable">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="mt-3 text-[11px] text-[#5B6875] font-mono line-clamp-1">
                  Built: {test.projectBuilt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
