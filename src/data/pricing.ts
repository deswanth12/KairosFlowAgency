import { PricingTier } from '@/types';

export const pricingTiersData: PricingTier[] = [
  {
    id: 'starter-web',
    title: 'Fast Launch Website',
    startingPriceINR: '₹15,000',
    startingPriceUSD: '$180',
    turnaround: '1 – 2 Weeks',
    description: 'High-converting, mobile-responsive landing pages and multi-section portfolio sites engineered for speed and search indexing.',
    idealFor: 'Startups, local businesses, creators, and new product launches needing immediate credibility.',
    serviceSlug: 'Web+Development',
    features: [
      'Custom Next.js & Tailwind CSS build',
      'Mobile-first 95+ Lighthouse score',
      'Lead capture form & direct WhatsApp routing',
      'On-page SEO & OpenGraph social cards',
      'Domain & SSL deployment included',
      '100% full source code ownership'
    ],
    popular: false
  },
  {
    id: 'business-portal',
    title: 'Custom Business Portal',
    startingPriceINR: '₹25,000',
    startingPriceUSD: '$300',
    turnaround: '2 – 3 Weeks',
    description: 'Dynamic commercial websites with structured catalogs, interactive appointment calendars, and automated lead triage.',
    idealFor: 'Clinics, restaurants, boutique consultancies, and service businesses replacing outdated websites.',
    serviceSlug: 'Web+Development',
    popular: true,
    features: [
      'Multi-page architecture with CMS / structured data',
      'Interactive booking, catalog, or reservation triage',
      'Direct WhatsApp & email notification dispatch',
      'Sub-second page loading speed (<0.8s)',
      '30-day post-launch technical warranty',
      'Custom brand typography & UI polish'
    ]
  },
  {
    id: 'fullstack-app',
    title: 'Full-Stack Web & Mobile App',
    startingPriceINR: '₹50,000',
    startingPriceUSD: '$600',
    turnaround: '4 – 6 Weeks',
    description: 'Custom React / Next.js web applications, client portals, SaaS dashboards, or cross-platform Flutter mobile applications.',
    idealFor: 'Founders building MVPs, custom operational dashboards, client portals, and mobile products.',
    serviceSlug: 'App+Development',
    popular: false,
    features: [
      'Next.js full-stack or Flutter cross-platform mobile',
      'User authentication & RBAC permissions',
      'PostgreSQL / SQLite database architecture',
      'Payment gateway (Stripe/Razorpay) integrations',
      'Admin operations & telemetry dashboard',
      'CI/CD automated deployment setup'
    ]
  },
  {
    id: 'ai-automation',
    title: 'AI Pipelines & Automations',
    startingPriceINR: '₹20,000',
    startingPriceUSD: '$240',
    turnaround: '2 – 3 Weeks',
    description: 'Intelligent RAG knowledge assistants, automated CRM lead triage, WhatsApp AI bots, and autonomous workflow pipelines.',
    idealFor: 'Businesses wanting 24/7 automated customer responses, internal knowledge retrieval, and workflow automation.',
    serviceSlug: 'AI+%26+Automation',
    popular: false,
    features: [
      'Grounded RAG semantic search on your company data',
      'Automated WhatsApp / Email customer response bot',
      'Adversarial prompt injection safety guardrails',
      'Sub-5ms vector semantic caching',
      'Integration with your existing CRM & tools',
      'Zero monthly lock-in — runs on your accounts'
    ]
  }
];
