import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'strata-fintech',
    slug: 'strata-wealth-platform',
    title: 'Strata Wealth Management',
    tagline: 'Modernizing high-net-worth portfolio management with an editorial web portal & real-time analytics.',
    category: 'Web',
    client: 'Strata Capital Partners',
    industry: 'Financial Services & Wealth Management',
    year: '2025',
    duration: '8 Weeks',
    role: 'Full-Stack Web Architecture, UI/UX Design & API Integration',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    summary: 'A bespoke, institutional-grade web platform engineered to give private wealth clients real-time portfolio visualization, tax-lot reporting, and direct advisor messaging.',
    challenge: 'Strata was operating on legacy client portals with slow load times (>4.2s), clunky PDF exports, and fragmented mobile access, resulting in high support ticket volumes and poor client onboarding retention.',
    solution: 'Kairos Flow designed and built a headless Next.js web application with server-side rendering, sub-second charting via WebGL/Canvas, encrypted document vaulting, and a refined editorial UI.',
    process: [
      'Discovery & stakeholder interviews across 15 high-net-worth advisors',
      'Design of a dark-mode first design system with warm ivory typography accents',
      'Next.js 15 App Router architecture with secure edge authentication',
      'Real-time WebSocket data feeds for index & portfolio fluctuations',
      'Rigorous penetration testing and SOC2 compliance audits'
    ],
    features: [
      {
        title: 'Real-Time Portfolio Telemetry',
        description: 'Instant visualization of multi-asset allocations, yield curves, and historical performance with sub-second recalculation.'
      },
      {
        title: 'Biometric Encrypted Vault',
        description: 'Secure client document repository with automated watermarking and zero-knowledge encryption for tax statements.'
      },
      {
        title: 'Advisor Direct Line',
        description: 'Context-aware asynchronous messaging interface linking clients directly to their dedicated wealth manager.'
      }
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Chart.js', 'Framer Motion'],
    results: [
      { metric: '0.64s', label: 'Average Page Load Speed' },
      { metric: '+142%', label: 'Mobile Client Engagement' },
      { metric: '-68%', label: 'Support Inquiries on Reporting' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://stratacapital.example.com',
    featured: true
  },
  {
    id: 'lumina-ai',
    slug: 'lumina-intelligent-intake',
    title: 'Lumina Legal AI & Workflow Engine',
    tagline: 'Autonomous contract parsing, risk grading, and document workflow automation for enterprise legal teams.',
    category: 'AI',
    client: 'Lumina Global Advisory',
    industry: 'Legal Tech & Enterprise SaaS',
    year: '2025',
    duration: '10 Weeks',
    role: 'AI Pipeline Architecture, LLM Prompt Engineering & Custom Webhook Orchestration',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    summary: 'A proprietary AI-powered intake and document intelligence engine that parses 100+ page NDAs, vendor agreements, and compliance briefs in seconds with strict citations.',
    challenge: 'Corporate attorneys were spending 18+ hours per week manually redlining standard contracts and hunting across internal drives for precedence clauses.',
    solution: 'We engineered a localized retrieval-augmented generation (RAG) system with custom clause risk classifiers, automated Slack/Teams review triggers, and deep CRM synchronization.',
    process: [
      'Document taxonomy definition across 500+ legal templates',
      'Embedding generation pipeline with hybrid keyword + semantic search',
      'Multi-agent verification workflow to eliminate hallucination risks',
      'Custom n8n and Python worker infrastructure with automatic failover',
      'End-to-end user evaluation with 40 practicing attorneys'
    ],
    features: [
      {
        title: 'Precision Clause Extraction',
        description: 'Automatically flags non-standard indemnification, liability caps, and termination rights with direct source page anchors.'
      },
      {
        title: 'Interactive Redline Assistant',
        description: 'Attorneys can ask questions in natural language and receive legally sound alternative clause suggestions.'
      },
      {
        title: 'Multi-Channel Dispatch',
        description: 'Instant notification webhooks to Slack, Microsoft Teams, and enterprise document management systems.'
      }
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'OpenAI GPT-4o', 'pgvector', 'Next.js', 'Tailwind CSS'],
    results: [
      { metric: '82%', label: 'Reduction in First-Pass Review Time' },
      { metric: '100%', label: 'Citation Traceability' },
      { metric: '14,000+', label: 'Documents Processed Monthly' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://lumina-legal.example.com',
    featured: true
  },
  {
    id: 'kora-health',
    slug: 'kora-health-mobile-app',
    title: 'Kora Preventive Health Companion',
    tagline: 'Cross-platform mobile application for personalized metabolic tracking, daily habit coaching, and lab telemetry.',
    category: 'App',
    client: 'Kora Bio Labs',
    industry: 'HealthTech & Consumer Wellness',
    year: '2024',
    duration: '12 Weeks',
    role: 'Mobile Product Strategy, React Native Engineering & Bluetooth Sensor Sync',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    summary: 'A consumer health application that connects to continuous glucose monitors (CGMs) and wearable sensors to deliver actionable metabolic insights without medical overwhelm.',
    challenge: 'Users found existing health apps cluttered with raw data graphs, overwhelming alerts, and high battery consumption caused by unoptimized Bluetooth polling.',
    solution: 'Kairos Flow designed an ultra-clean, soothing interface with adaptive color tones, background low-energy BLE sync, and AI-driven metabolic score cards.',
    features: [
      {
        title: 'Zero-Latency Sensor Sync',
        description: 'Optimized BLE background protocol synchronizing continuous biomarker data with <1.5% daily battery consumption.'
      },
      {
        title: 'Actionable Habit Loops',
        description: 'Micro-coaching prompts triggered precisely after meals and sleep cycles based on real-time biometric response.'
      },
      {
        title: 'Offline-First Vault',
        description: 'Full biometric history remains accessible and searchable offline with local encrypted SQLite storage.'
      }
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'Node.js', 'GraphQL', 'AWS Cognito'],
    results: [
      { metric: '4.9 ★', label: 'App Store Rating (1,200+ Reviews)' },
      { metric: '64%', label: 'Day-30 Retention Rate' },
      { metric: '1.2s', label: 'Average Sync Latency' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'aethel-brand',
    slug: 'aethel-architectural-rebrand',
    title: 'Aethel Studio & Spatial Design Identity',
    tagline: 'Comprehensive visual identity, typographic design system, and editorial showcase for an architectural practice.',
    category: 'Branding',
    client: 'Aethel Architecture Partners',
    industry: 'Architecture, Interior & Spatial Design',
    year: '2024',
    duration: '6 Weeks',
    role: 'Brand Identity, Typographic System, Guidelines & Web Experience',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    summary: 'A quiet, confident brand identity crafted for a premier architectural firm known for minimalist residential estates and cultural institutions.',
    challenge: 'Aethel had outgrown their initial visual branding, which felt too technical and failed to communicate their bespoke spatial craftsmanship and premium positioning to private clients.',
    solution: 'We developed an architectural identity anchored in geometric balance, warm earthy materiality, custom typography, tactile print collateral, and a minimalist web gallery.',
    features: [
      {
        title: 'Bespoke Monogram System',
        description: 'A structural monogram inspired by structural beams and negative space, functioning seamlessly from blueprints to luxury signage.'
      },
      {
        title: 'Editorial Print & Digital Guidelines',
        description: 'Comprehensive 84-page brand manual detailing typography rules, grid alignment, image treatment, and tactile paper stocks.'
      },
      {
        title: 'Interactive Project Portfolio',
        description: 'A high-definition image gallery with smooth horizontal transitions and editorial project narratives.'
      }
    ],
    techStack: ['Figma', 'Adobe InDesign', 'Illustrator', 'Next.js', 'Tailwind CSS'],
    results: [
      { metric: '3.4x', label: 'Increase in High-Value Private Inquiries' },
      { metric: '100%', label: 'Consistent Cross-Platform Brand Asset Rollout' },
      { metric: 'Design Award', label: 'Featured in Global Spatial Design Annual' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'nexus-scale',
    slug: 'nexus-b2b-growth-campaign',
    title: 'Nexus Data Cloud — Enterprise Acquisition',
    tagline: 'Full-funnel B2B performance marketing, technical SEO overhaul, and conversion funnel optimization.',
    category: 'Marketing',
    client: 'Nexus Cloud Infrastructure',
    industry: 'Cloud Computing & DevOps',
    year: '2025',
    duration: '16 Weeks',
    role: 'Growth Strategy, Conversion Rate Optimization, Technical SEO & Paid Funnels',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    summary: 'A targeted B2B customer acquisition campaign combining deep technical content architecture, interactive cloud cost calculators, and segmented paid search campaigns.',
    challenge: 'Nexus was experiencing high customer acquisition costs (CAC > $1,400) on paid search due to broad targeting and low landing page conversion rates (1.1%).',
    solution: 'We engineered targeted high-intent landing pages, rewrote the technical documentation SEO structure, built an interactive ROI calculator, and restructured Google & LinkedIn campaign funnels.',
    features: [
      {
        title: 'Interactive TCO Calculator',
        description: 'Prospective clients can calculate exact AWS/GCP migration cost savings in 30 seconds and receive a customized PDF report.'
      },
      {
        title: 'Technical Content Pillars',
        description: '18 high-authority architectural breakdown guides targeting engineering leaders, ranking in top 3 Google positions.'
      },
      {
        title: 'Multi-Touch Attribution',
        description: 'Server-side conversion tracking linking CRM pipeline progression to initial ad touchpoints.'
      }
    ],
    techStack: ['Google Ads', 'LinkedIn Campaign Manager', 'PostHog', 'Next.js', 'HubSpot CRM', 'SEMrush'],
    results: [
      { metric: '-54%', label: 'Reduction in Qualified Cost-Per-Lead' },
      { metric: '+210%', label: 'Organic Search Traffic Growth' },
      { metric: '$4.2M', label: 'New Attributable Pipeline Generated' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 'vanguard-cinematics',
    slug: 'vanguard-brand-film-series',
    title: 'Vanguard Industrial — Cinematic Brand Showcase',
    tagline: 'Brand films, engineering process documentaries, and 4K commercial reels for industrial precision hardware.',
    category: 'Content',
    client: 'Vanguard Robotics & Precision Tooling',
    industry: 'Advanced Manufacturing & Robotics',
    year: '2024',
    duration: '4 Weeks',
    role: 'Creative Direction, 4K Cinematography, Sound Design & Short-Form Content Engine',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    summary: 'A cinematic video series capturing the extreme precision, craftsmanship, and robotics technology behind Vanguard’s aerospace-grade manufacturing facilities.',
    challenge: 'Vanguard struggled to convey their cutting-edge technological superiority to overseas enterprise buyers who could not visit their physical cleanrooms in person.',
    solution: 'Kairos Flow conducted a multi-day cinema shoot, producing a 90-second flagship brand film, 6 modular capability vignettes, and a vertical social series optimized for digital distribution.',
    features: [
      {
        title: 'Micro-Cinematography',
        description: 'Ultra high-speed macro cinematography revealing sub-micron robotic welding and precision laser etching.'
      },
      {
        title: 'Custom Sound Design',
        description: 'Bespoke industrial soundscapes composed from authentic cleanroom acoustic recordings and mechanical synthesis.'
      },
      {
        title: 'Social Cutdown Package',
        description: '15 vertical video assets formatted for LinkedIn and YouTube Shorts showcasing individual manufacturing breakthroughs.'
      }
    ],
    techStack: ['Sony FX6 Cinema Line', 'DaVinci Resolve Studio', 'After Effects', 'Pro Tools', 'DJI Ronin Gimbal'],
    results: [
      { metric: '450,000+', label: 'Combined Commercial Impressions' },
      { metric: '+85%', label: 'Investor & Enterprise Meeting Conversions' },
      { metric: '100% 4K HDR', label: 'Master Delivery Quality' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  }
];
