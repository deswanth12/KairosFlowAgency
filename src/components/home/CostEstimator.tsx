'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  Zap,
  Globe,
  Layout,
  Smartphone,
  Cpu,
  Video
} from 'lucide-react';

interface ProjectTypeOption {
  id: string;
  name: string;
  serviceCategory: string;
  icon: React.ElementType;
  description: string;
  baseInr: { mvp: number; growth: number; enterprise: number };
  baseUsd: { mvp: number; growth: number; enterprise: number };
  timelines: { mvp: string; growth: string; enterprise: string };
  deliverables: string[];
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'web',
    name: 'Modern Website / Landing Page',
    serviceCategory: 'Web Development',
    icon: Globe,
    description: 'Ultra-fast Next.js 15 site with 98+ Lighthouse score, SEO, and CMS.',
    baseInr: { mvp: 18000, growth: 32000, enterprise: 65000 },
    baseUsd: { mvp: 250, growth: 450, enterprise: 900 },
    timelines: { mvp: '1 – 2 Weeks', growth: '2 – 3 Weeks', enterprise: '3 – 5 Weeks' },
    deliverables: [
      'Next.js 15 + Tailwind CSS architecture',
      'Mobile-first responsive design',
      'SEO metadata & JSON-LD schema',
      'Sub-second page load speeds'
    ]
  },
  {
    id: 'saas',
    name: 'Full-Stack Web App / SaaS Portal',
    serviceCategory: 'Web Development',
    icon: Layout,
    description: 'Custom web portal with authentication, database, payments, and dashboards.',
    baseInr: { mvp: 45000, growth: 95000, enterprise: 220000 },
    baseUsd: { mvp: 600, growth: 1300, enterprise: 3000 },
    timelines: { mvp: '3 – 4 Weeks', growth: '5 – 8 Weeks', enterprise: '8 – 12 Weeks' },
    deliverables: [
      'Role-based auth & session security',
      'PostgreSQL / Redis database layer',
      'Stripe or Razorpay payment checkout',
      'Admin analytics & telemetry portal'
    ]
  },
  {
    id: 'mobile',
    name: 'Cross-Platform Mobile App',
    serviceCategory: 'App Development',
    icon: Smartphone,
    description: 'Native iOS & Android mobile app built with React Native / Flutter.',
    baseInr: { mvp: 65000, growth: 140000, enterprise: 280000 },
    baseUsd: { mvp: 900, growth: 1900, enterprise: 3800 },
    timelines: { mvp: '4 – 6 Weeks', growth: '6 – 10 Weeks', enterprise: '10 – 14 Weeks' },
    deliverables: [
      'Single codebase for iOS and Android',
      'Offline-first synchronization',
      'Push notification integrations',
      'App Store & Play Store readiness'
    ]
  },
  {
    id: 'ai',
    name: 'AI Agent & Automation Pipeline',
    serviceCategory: 'AI & Automation',
    icon: Cpu,
    description: 'Domain-specific RAG knowledge retrieval, voice agents, and workflow automations.',
    baseInr: { mvp: 28000, growth: 65000, enterprise: 160000 },
    baseUsd: { mvp: 400, growth: 900, enterprise: 2200 },
    timelines: { mvp: '1 – 3 Weeks', growth: '3 – 5 Weeks', enterprise: '6 – 8 Weeks' },
    deliverables: [
      'Knowledge base vector indexing (RAG)',
      'Prompt injection defense guardrails',
      'WhatsApp / Slack webhook integration',
      'Automated background workflow triggers'
    ]
  },
  {
    id: 'brand',
    name: 'Brand Identity & Visual Direction',
    serviceCategory: 'UI/UX & Branding',
    icon: Video,
    description: 'Comprehensive design system, 3D/video brand reel, typography, and UI kits.',
    baseInr: { mvp: 20000, growth: 45000, enterprise: 95000 },
    baseUsd: { mvp: 300, growth: 650, enterprise: 1350 },
    timelines: { mvp: '1 – 2 Weeks', growth: '2 – 3 Weeks', enterprise: '3 – 5 Weeks' },
    deliverables: [
      'Logo suite, mark & vector guidelines',
      'Figma design tokens & UI library',
      'Commercial typography hierarchy',
      'Social & investor deck brand package'
    ]
  }
];

type ScaleLevel = 'mvp' | 'growth' | 'enterprise';

const SCALE_CONFIG: Record<ScaleLevel, { title: string; subtitle: string }> = {
  mvp: {
    title: 'MVP / Lean Sprint',
    subtitle: 'Fast delivery for initial launch & market validation.'
  },
  growth: {
    title: 'Growth / Scaling',
    subtitle: 'Comprehensive feature set with integrations & custom UI.'
  },
  enterprise: {
    title: 'Custom Enterprise',
    subtitle: 'High-availability, bespoke security, and dedicated architecture.'
  }
};

export const CostEstimator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('web');
  const [selectedScale, setSelectedScale] = useState<ScaleLevel>('mvp');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const activeProject = PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];

  const estimatedCost = currency === 'INR' 
    ? activeProject.baseInr[selectedScale] 
    : activeProject.baseUsd[selectedScale];

  const formattedCost = currency === 'INR'
    ? `₹${estimatedCost.toLocaleString('en-IN')}`
    : `$${estimatedCost.toLocaleString('en-US')}`;

  const estimatedTimeline = activeProject.timelines[selectedScale];

  // BUG-04 FIX: Map project+scale to a matching budget RANGE label so ContactForm can pre-fill the <select>.
  // Raw prices like "₹18,000" never match entries like "₹15,000 – ₹40,000 (Rapid Web & Brand Sprint)".
  const BUDGET_LABEL_MAP: Record<string, Record<ScaleLevel, string>> = {
    web: {
      mvp:        '₹15,000 – ₹40,000 (Rapid Web & Brand Sprint)',
      growth:     '₹40,000 – ₹1,00,000 (Custom Web Portal & AI)',
      enterprise: '₹1,00,000 – ₹2,50,000 (Full-Stack Web / Mobile App)'
    },
    saas: {
      mvp:        '₹40,000 – ₹1,00,000 (Custom Web Portal & AI)',
      growth:     '₹1,00,000 – ₹2,50,000 (Full-Stack Web / Mobile App)',
      enterprise: '₹2,50,000+ (Enterprise Digital Transformation)'
    },
    mobile: {
      mvp:        '₹40,000 – ₹1,00,000 (Custom Web Portal & AI)',
      growth:     '₹1,00,000 – ₹2,50,000 (Full-Stack Web / Mobile App)',
      enterprise: '₹2,50,000+ (Enterprise Digital Transformation)'
    },
    ai: {
      mvp:        '₹15,000 – ₹40,000 (Rapid Web & Brand Sprint)',
      growth:     '₹40,000 – ₹1,00,000 (Custom Web Portal & AI)',
      enterprise: '₹1,00,000 – ₹2,50,000 (Full-Stack Web / Mobile App)'
    },
    brand: {
      mvp:        '₹15,000 – ₹40,000 (Rapid Web & Brand Sprint)',
      growth:     '₹40,000 – ₹1,00,000 (Custom Web Portal & AI)',
      enterprise: '₹1,00,000 – ₹2,50,000 (Full-Stack Web / Mobile App)'
    }
  };

  const BUDGET_LABEL_MAP_USD: Record<string, Record<ScaleLevel, string>> = {
    web: {
      mvp:        'Under $1,000 (Rapid Web & Brand Sprint)',
      growth:     '$1,000 – $2,500 (Custom Web Portal & AI)',
      enterprise: '$2,500 – $5,000 (Full-Stack Web / Mobile App)'
    },
    saas: {
      mvp:        '$1,000 – $2,500 (Custom Web Portal & AI)',
      growth:     '$2,500 – $5,000 (Full-Stack Web / Mobile App)',
      enterprise: '$5,000+ (Enterprise Scale)'
    },
    mobile: {
      mvp:        '$1,000 – $2,500 (Custom Web Portal & AI)',
      growth:     '$2,500 – $5,000 (Full-Stack Web / Mobile App)',
      enterprise: '$5,000+ (Enterprise Scale)'
    },
    ai: {
      mvp:        'Under $1,000 (Rapid Web & Brand Sprint)',
      growth:     '$1,000 – $2,500 (Custom Web Portal & AI)',
      enterprise: '$2,500 – $5,000 (Full-Stack Web / Mobile App)'
    },
    brand: {
      mvp:        'Under $1,000 (Rapid Web & Brand Sprint)',
      growth:     '$1,000 – $2,500 (Custom Web Portal & AI)',
      enterprise: '$2,500 – $5,000 (Full-Stack Web / Mobile App)'
    }
  };

  const budgetLabel = currency === 'INR'
    ? (BUDGET_LABEL_MAP[selectedType]?.[selectedScale] ?? `₹${estimatedCost.toLocaleString('en-IN')}`)
    : (BUDGET_LABEL_MAP_USD[selectedType]?.[selectedScale] ?? `$${estimatedCost.toLocaleString('en-US')}`);

  const contactHref = `/contact?service=${encodeURIComponent(activeProject.serviceCategory)}&budget=${encodeURIComponent(budgetLabel)}&timeline=${encodeURIComponent(estimatedTimeline)}`;

  return (
    // BUG-07 FIX: Add id="cost-estimator" so hash-link /#cost-estimator scrolls here correctly
    <section id="cost-estimator" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF4F0] border border-[#B8613A]/20 text-[11px] font-mono text-[#B8613A] uppercase tracking-widest mb-3 font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>/ INSTANT SCOPE & COST ESTIMATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B1F33] tracking-tight">
              Transparent scoping. <span className="text-[#B8613A]">Zero guesswork.</span>
            </h2>
            <p className="text-[#5B6875] text-sm sm:text-base max-w-xl mt-2">
              Select your project discipline and target scale to calculate an immediate baseline estimate and sprint timeline.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[#F7F7F4] p-1 rounded-xl border border-[#D9E0E5] font-mono text-xs">
            <span className="text-[#5B6875] px-2 text-[11px] uppercase tracking-wider font-semibold">Currency:</span>
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                currency === 'INR'
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'text-[#5B6875] hover:text-[#0B1F33]'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Interactive Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selections */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Discipline Select */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-3 font-semibold">
                Step 1: Choose Your Project Discipline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#FBF4F0] border-[#B8613A] ring-1 ring-[#B8613A]/30 shadow-sm'
                          : 'bg-[#F7F7F4] border-[#D9E0E5] hover:border-[#B8613A]/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#0B1F33] text-white' : 'bg-white text-[#5B6875] border border-[#D9E0E5]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-[#0B1F33] font-display">
                          {type.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#5B6875] leading-relaxed">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Complexity / Scale */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-3 font-semibold">
                Step 2: Choose Complexity / Scale Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['mvp', 'growth', 'enterprise'] as ScaleLevel[]).map((scale) => {
                  const isSelected = selectedScale === scale;
                  const config = SCALE_CONFIG[scale];
                  return (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => setSelectedScale(scale)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-sm'
                          : 'bg-[#F7F7F4] text-[#111827] border-[#D9E0E5] hover:border-[#B8613A]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#0B1F33]'}`}>
                          {config.title}
                        </span>
                        {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#B8613A]" />}
                      </div>
                      <p className={`text-[10px] leading-tight ${isSelected ? 'text-white/80' : 'text-[#5B6875]'}`}>
                        {config.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1F33] text-white border border-[#0B1F33] shadow-elevated-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B8613A] font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ESTIMATED SCOPE SUMMARY</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/90">
                  Fixed Milestone Scope
                </span>
              </div>

              {/* Price & Timeline Banner */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1">
                    Starting From
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                    {formattedCost}
                  </div>
                  <div className="text-[10px] font-mono text-[#B8613A] mt-0.5">
                    Transparent milestone billing
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-1">
                    Sprint Delivery
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight flex items-center gap-1.5 mt-1">
                    <Clock className="w-4 h-4 text-[#B8613A]" />
                    <span>{estimatedTimeline}</span>
                  </div>
                  <div className="text-[10px] font-mono text-white/70 mt-1">
                    6-stage QA review gates
                  </div>
                </div>
              </div>

              {/* Deliverables Included */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/80 mb-3 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#B8613A]" />
                  <span>Key Deliverables Included</span>
                </div>
                <ul className="space-y-2 text-xs text-white/90">
                  {activeProject.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>30-day post-launch warranty & complete IP ownership</span>
                  </li>
                </ul>
              </div>

              {/* Action CTA Button */}
              <div className="pt-4 border-t border-white/10 space-y-3 font-mono">
                <Link
                  href={contactHref}
                  className="group w-full py-3.5 px-6 rounded-xl bg-[#B8613A] hover:bg-[#A3522E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>Lock in This Scope & Inquire</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="text-center text-[10px] text-white/60">
                  Transfers directly to our intake form with pre-filled scope.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
