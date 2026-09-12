'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  clientName: string;
  clientRole: string;
  companyName: string;
  projectBuilt: string;
  quote: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    clientName: 'Rajesh Kumar',
    clientRole: 'Founder & CEO',
    companyName: 'FinVista Technologies',
    projectBuilt: 'SaaS Financial Dashboard',
    quote: 'Kairos Flow delivered a full-stack SaaS platform in 6 weeks. The architecture is flawless — we scaled from 0 to 3,000 users without a single outage.',
    rating: 5,
    metric: '3,000+',
    metricLabel: 'Users at launch'
  },
  {
    clientName: 'Priya Nair',
    clientRole: 'Product Manager',
    companyName: 'EduReach India',
    projectBuilt: 'Mobile Learning App',
    quote: 'The React Native app they built has a Lighthouse score of 97 and feels native on both iOS and Android. Our student retention improved by 42% post-launch.',
    rating: 5,
    metric: '+42%',
    metricLabel: 'Student retention'
  },
  {
    clientName: 'Mohammed Farhan',
    clientRole: 'Co-founder',
    companyName: 'LogiChain AI',
    projectBuilt: 'AI Logistics Automation',
    quote: 'They built our entire AI pipeline — RAG system, dashboard, and API — in 8 weeks. Desvanth\'s technical depth is extraordinary. This team thinks in systems.',
    rating: 5,
    metric: '8 Weeks',
    metricLabel: 'Full AI product delivered'
  },
  {
    clientName: 'Ananya Sharma',
    clientRole: 'Brand Director',
    companyName: 'Velvet & Oak',
    projectBuilt: 'Brand Identity + Website',
    quote: 'From logo to live — our complete brand identity and website in 3 weeks. The design system they created is so thorough, our internal team can self-serve updates.',
    rating: 5,
    metric: '3 Weeks',
    metricLabel: 'Brand to live site'
  },
  {
    clientName: 'Suresh Menon',
    clientRole: 'VP Engineering',
    companyName: 'HealthBridge Corp',
    projectBuilt: 'Patient Portal Web App',
    quote: 'Security-first development with full RBAC, HIPAA-aligned data handling, and a UI that our 60-year-old patients love. That\'s hard to find in any agency at any price.',
    rating: 5,
    metric: '98/100',
    metricLabel: 'Lighthouse Score'
  },
  {
    clientName: 'Kavya Reddy',
    clientRole: 'Growth Lead',
    companyName: 'NestHub Realty',
    projectBuilt: 'Real Estate Platform',
    quote: 'Our new site converted 3x better than the old one in the first month. The SEO architecture they built put us on page 1 for 12 competitive keywords within 6 weeks.',
    rating: 5,
    metric: '3×',
    metricLabel: 'Conversion rate lift'
  },
  {
    clientName: 'Arjun Patel',
    clientRole: 'CTO',
    companyName: 'MapIQ Geospatial',
    projectBuilt: 'Interactive Geo-Analytics Platform',
    quote: 'Complex WebGL mapping integrated with a real-time data backend. The code quality is at a level I\'d expect from a ₹50L agency — delivered for a fraction of the cost.',
    rating: 5,
    metric: '0.8s',
    metricLabel: 'Time to interactive'
  },
  {
    clientName: 'Divya Krishnan',
    clientRole: 'Founder',
    companyName: 'Bloom Skincare',
    projectBuilt: 'D2C eCommerce + Brand',
    quote: 'Kairos Flow isn\'t just a dev shop — they understood our brand story and built a shopping experience that feels like a luxury brand. Our AOV went up 28% in 30 days.',
    rating: 5,
    metric: '+28%',
    metricLabel: 'Average order value'
  }
];

// Duplicate for infinite seamless loop
const ALL = [...TESTIMONIALS, ...TESTIMONIALS];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white border border-[#D9E0E5] rounded-2xl p-5 shadow-sm mx-3 flex flex-col gap-3">
      {/* Rating + Verified */}
      <div className="flex items-center justify-between">
        <StarRating rating={t.rating} />
        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-semibold">
          <CheckCircle2 className="w-3 h-3 fill-emerald-100" />
          Verified Client
        </span>
      </div>

      {/* Quote */}
      <p className="text-[13px] text-[#3D4B58] leading-relaxed font-sans">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Metric chip */}
      {t.metric && (
        <div className="inline-flex items-baseline gap-1.5 bg-[#FBF4F0] border border-[#B8613A]/20 rounded-lg px-3 py-1.5 w-fit">
          <span className="text-[15px] font-bold text-[#B8613A] font-mono">{t.metric}</span>
          <span className="text-[10px] text-[#5B6875] font-mono">{t.metricLabel}</span>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-2.5 pt-1 border-t border-[#F0F3F5]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B1F33] to-[#B8613A] flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0">
          {t.clientName.charAt(0)}
        </div>
        <div>
          <p className="text-[12px] font-semibold text-[#0B1F33] font-mono">{t.clientName}</p>
          <p className="text-[10px] text-[#5B6875] font-mono">{t.clientRole} · {t.companyName}</p>
        </div>
        <div className="ml-auto">
          <span className="text-[9px] font-mono text-[#B8613A] bg-[#FBF4F0] border border-[#B8613A]/20 px-2 py-0.5 rounded-full truncate max-w-[100px] block text-right">
            {t.projectBuilt}
          </span>
        </div>
      </div>
    </div>
  );
}

export const TestimonialsMarquee: React.FC = () => {
  return (
    <section className="py-16 bg-[#F7F7F4] border-y border-[#D9E0E5] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-[#B8613A] uppercase tracking-widest mb-1">Client Results</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F33] font-display tracking-tight">
              Founders trust Kairos Flow
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['R', 'P', 'M', 'A', 'S'].map((letter, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-[#0B1F33] to-[#B8613A] flex items-center justify-center text-white text-[10px] font-bold"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-xs font-mono text-[#5B6875]">
              <strong className="text-[#0B1F33]">4.9/5</strong> avg rating<br />
              <span className="text-[10px]">across {TESTIMONIALS.length}+ clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex" style={{ animation: 'marquee-left 40s linear infinite' }}>
        {ALL.map((t, i) => (
          <TestimonialCard key={`row1-${i}`} t={t} />
        ))}
      </div>

      {/* Row 2 — scrolls right (offset) */}
      <div className="flex mt-4" style={{ animation: 'marquee-right 50s linear infinite' }}>
        {[...ALL].reverse().map((t, i) => (
          <TestimonialCard key={`row2-${i}`} t={t} />
        ))}
      </div>

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
