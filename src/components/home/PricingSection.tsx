import React from 'react';
import Link from 'next/link';
import { pricingTiersData } from '@/data/pricing';
import { CheckCircle2, ArrowUpRight, Sparkles, Clock, ShieldCheck, Terminal } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="bg-[#F7F7F4] text-[#111827] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-3 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>/ TRANSPARENT PRICING ANCHORS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
              Clear starting rates. Fixed milestone scopes.
            </h2>
            <p className="text-[#5B6875] text-base sm:text-lg mt-3 max-w-xl">
              No surprise hourly billing. Every engagement is quoted with explicit milestones, deliverables, and a 100% code ownership handover.
            </p>
          </div>

          <div className="text-xs font-mono text-[#5B6875] self-start md:self-auto bg-white px-4 py-2 rounded-lg border border-[#D9E0E5]">
            <span>Currency: <strong>INR (₹) / USD ($)</strong></span>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiersData.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between p-7 rounded-2xl bg-white border transition-all duration-300 relative ${
                tier.popular
                  ? 'border-[#B8613A] shadow-elevated-card ring-1 ring-[#B8613A]/30'
                  : 'border-[#D9E0E5] shadow-subtle-card hover:shadow-hover-card hover:border-[#B8613A]/40'
              }`}
            >
              <div>
                {/* Popular Pill */}
                {tier.popular && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B8613A] text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST REQUESTED</span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#0B1F33] font-display mb-1">
                  {tier.title}
                </h3>

                <div className="text-xs font-mono text-[#5B6875] mb-4 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#B8613A]" />
                  <span>Timeline: {tier.turnaround}</span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-[#F7F7F4] border border-[#D9E0E5] mb-5">
                  <div className="text-[10px] font-mono text-[#5B6875] uppercase font-semibold">Starting from</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1F33] font-mono">
                    {tier.startingPriceINR}
                  </div>
                  <div className="text-[11px] font-mono text-[#5B6875] mt-0.5">
                    Approx. {tier.startingPriceUSD} for international clients
                  </div>
                </div>

                <p className="text-xs text-[#5B6875] leading-relaxed mb-5">
                  {tier.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#D9E0E5] text-xs">
                  <div className="text-[10px] font-mono uppercase text-[#5B6875] font-semibold tracking-wider mb-2">
                    Scope Highlights:
                  </div>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-[#111827]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8613A] flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#D9E0E5]">
                <Link
                  href={`/contact?service=${tier.serviceSlug}`}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                    tier.popular
                      ? 'bg-[#0B1F33] hover:bg-[#132B45] text-white shadow-sm'
                      : 'bg-[#F7F7F4] hover:bg-[#FBF4F0] text-[#0B1F33] hover:text-[#B8613A] border border-[#D9E0E5]'
                  }`}
                >
                  <span>Request Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Custom Enterprise Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#D9E0E5] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-subtle-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FBF4F0] border border-[#B8613A]/20 flex items-center justify-center text-[#B8613A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#0B1F33]">Have a custom enterprise architecture or large-scale multi-month project?</span>
              <p className="text-[#5B6875] text-[11px] font-sans">We offer tailored sprint proposals with dedicated founder lead allocations.</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1F33] hover:bg-[#132B45] text-white font-bold rounded-md shadow-sm transition-colors text-xs whitespace-nowrap"
          >
            <span>Book Custom Discovery Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8613A]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
