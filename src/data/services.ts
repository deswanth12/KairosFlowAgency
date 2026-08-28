import { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: 'web-dev',
    slug: 'web-development',
    title: 'Web Development',
    category: 'Web Development',
    tagline: 'High-performance web applications, SaaS platforms, and editorial digital experiences.',
    shortDesc: 'Business websites, landing pages, dashboards, client portals, and bespoke web applications built for speed and conversion.',
    iconName: 'Globe',
    problemSolved: 'Slow, fragile, or generic template websites that fail to convert high-intent traffic, lack proper technical SEO, and are difficult to update.',
    included: [
      'Custom frontend architecture with Next.js & React',
      'API design and backend database integrations',
      'Headless CMS setup for effortless content management',
      'Technical SEO, speed optimization, and Core Web Vitals < 0.8s',
      'Responsive design across mobile, tablet, and desktop',
      'Interactive components and custom calculators'
    ],
    deliverables: [
      {
        title: 'Architecture & Foundation',
        items: ['Modular component library', 'Clean TypeScript codebase', 'Responsive layout system', 'Environment configurations']
      },
      {
        title: 'Performance & Security',
        items: ['95+ Google Lighthouse scores', 'SSL & security headers', 'Database caching layer', 'Continuous deployment pipeline']
      },
      {
        title: 'Launch & Handover',
        items: ['Production deployment', 'Admin/CMS documentation', 'Analytics & event tracking', '30-day post-launch warranty']
      }
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Vercel'],
    idealFor: ['High-growth startups', 'B2B SaaS companies', 'Professional service firms', 'E-commerce brands']
  },
  {
    id: 'app-dev',
    slug: 'app-development',
    title: 'App Development',
    category: 'App Development',
    tagline: 'Native and cross-platform mobile experiences engineered for fluid customer and internal workflows.',
    shortDesc: 'iOS, Android, and cross-platform applications designed for high performance, intuitive UX, and reliable offline capabilities.',
    iconName: 'Smartphone',
    problemSolved: 'Fragmented user journeys on mobile, clunky legacy interfaces, and applications that crash or feel disconnected from business backends.',
    included: [
      'Cross-platform iOS & Android engineering (React Native / Flutter)',
      'Offline-first synchronization and real-time state',
      'Native device integration (Biometrics, Push Notifications, Camera, GPS)',
      'App Store and Google Play compliance and publishing',
      'Secure token-based user authentication and data encryption',
      'In-app analytics and crash diagnostics'
    ],
    deliverables: [
      {
        title: 'Product Design & Prototype',
        items: ['Interactive mobile wireframes', 'Touch-optimized design system', 'User flow validation', 'Edge-case handling']
      },
      {
        title: 'App Engineering',
        items: ['Production-ready iOS/Android builds', 'REST/GraphQL API connectors', 'Push notification pipeline', 'State management']
      },
      {
        title: 'Store Deployment',
        items: ['App Store & Play Store approval', 'Internal TestFlight builds', 'Release management', 'Telemetry dashboards']
      }
    ],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Expo', 'Firebase', 'GraphQL', 'Tailwind Native'],
    idealFor: ['Product-first startups', 'Field service teams', 'On-demand marketplaces', 'Customer loyalty apps']
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Automation',
    category: 'AI & Automation',
    tagline: 'Practical AI integrations, automated workflows, and intelligence layers that eliminate manual bottlenecks.',
    shortDesc: 'Custom AI assistants, document intelligence, intelligent workflow automations, and data pipelines that unlock operational leverage.',
    iconName: 'Cpu',
    problemSolved: 'Costly repetitive human tasks, delayed response times to customer inquiries, messy unstructured documents, and disconnected SaaS silos.',
    included: [
      'Custom LLM chat assistants grounded on proprietary business knowledge',
      'End-to-end workflow automation (Make, n8n, custom serverless hooks)',
      'Document parsing, OCR, and automated structured data extraction',
      'CRM & ERP data synchronization pipelines',
      'AI-assisted lead qualification and automatic routing',
      'Internal knowledge base retrieval engines (RAG)'
    ],
    deliverables: [
      {
        title: 'Process Discovery & Audit',
        items: ['Bottleneck identification report', 'Automation architecture blueprint', 'Data security & privacy plan', 'ROI projection']
      },
      {
        title: 'AI & Pipeline Build',
        items: ['Trained/grounded AI endpoints', 'Multi-step automation recipes', 'Error recovery webhooks', 'API orchestrations']
      },
      {
        title: 'Operations Dashboard',
        items: ['Execution logs & telemetry', 'Failover controls', 'Team training workshop', 'Workflow maintenance guide']
      }
    ],
    techStack: ['OpenAI API', 'Anthropic Claude', 'LangChain', 'n8n', 'Python', 'Vector DBs (Pinecone/pgvector)', 'FastAPI'],
    idealFor: ['Operations-heavy businesses', 'Legal & accounting firms', 'Customer support teams', 'High-volume lead agencies']
  },
  {
    id: 'ui-ux-branding',
    slug: 'ui-ux-branding',
    title: 'UI/UX & Branding',
    category: 'UI/UX & Branding',
    tagline: 'Distinctive visual identities, design systems, and human-centered interfaces built with architectural rigor.',
    shortDesc: 'Brand identity systems, visual guidelines, intuitive interface architectures, design tokens, and comprehensive Figma prototypes.',
    iconName: 'Palette',
    problemSolved: 'Inconsistent brand perception, confusing navigation hierarchies, low user retention, and disjointed handoffs between design and engineering.',
    included: [
      'Brand strategy, visual positioning, and logo system development',
      'Comprehensive design systems with scalable Figma components',
      'User journey mapping, wireframing, and interactive prototyping',
      'Design tokens and production-ready CSS variable exports',
      'Usability testing and accessibility compliance (WCAG AA)',
      'Brand asset kits (typography, color palettes, pitch decks, icons)'
    ],
    deliverables: [
      {
        title: 'Brand Foundation',
        items: ['Primary & secondary logo marks', 'Color system & typographic scale', 'Brand guidelines manual', 'Exported vector assets']
      },
      {
        title: 'Product Interface',
        items: ['High-fidelity Figma prototypes', 'Complete component library', 'Mobile and desktop variants', 'Micro-interaction specs']
      },
      {
        title: 'Developer Handoff',
        items: ['Structured design tokens', 'Interactive state documentation', 'Asset export packs', 'Visual QA review']
      }
    ],
    techStack: ['Figma', 'Adobe Creative Suite', 'Principle', 'Design Tokens', 'Tailwind', 'Storybook'],
    idealFor: ['Rebranding enterprises', 'New venture launches', 'Complex SaaS dashboards', 'Design-conscious digital brands']
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    category: 'Digital Marketing',
    tagline: 'Data-driven customer acquisition, conversion rate optimization, and organic search dominance.',
    shortDesc: 'Performance marketing, search engine optimization (SEO), conversion funnels, content distribution, and revenue analytics.',
    iconName: 'TrendingUp',
    problemSolved: 'Wasted ad spend on low-converting audiences, stagnant organic search visibility, and lack of clarity on customer acquisition economics.',
    included: [
      'Full-funnel SEO audits, keyword strategy, and technical optimization',
      'High-converting landing page optimization and A/B split testing',
      'Targeted paid acquisition strategy (Search & Social)',
      'Conversion tracking, pixel configuration, and attribution modeling',
      'Email marketing automations and lead nurture sequences',
      'Monthly performance reporting and revenue attribution'
    ],
    deliverables: [
      {
        title: 'Strategic Roadmap',
        items: ['Competitor & market audit', 'Keyword opportunity matrix', 'Customer persona blueprints', 'Channel prioritization matrix']
      },
      {
        title: 'Campaign & Funnel Assets',
        items: ['High-converting landing pages', 'Ad creatives & copy variants', 'Automated email drip flows', 'Retargeting funnels']
      },
      {
        title: 'Analytics & Attribution',
        items: ['Custom GA4/Mixpanel dashboards', 'Event tracking infrastructure', 'Monthly growth audits', 'ROI attribution models']
      }
    ],
    techStack: ['Google Analytics 4', 'Search Console', 'Ahrefs', 'Meta Ads Manager', 'PostHog', 'HubSpot'],
    idealFor: ['Direct-to-consumer brands', 'B2B lead generation', 'Local service leaders', 'Scaling SaaS products']
  },
  {
    id: 'video-content',
    slug: 'video-content',
    title: 'Video & Content Production',
    category: 'Video & Content',
    tagline: 'High-impact brand cinematography, product explainers, social reels, and multi-format content engines.',
    shortDesc: 'Scripting, filming, professional post-production, motion design, social clips, and commercial video assets that command attention.',
    iconName: 'Video',
    problemSolved: 'Boring, low-engagement corporate media, inconsistency in social video output, and failure to communicate product value in the first 3 seconds.',
    included: [
      'High-production brand films and founder origin stories',
      'Product demo videos, UI motion walk-throughs, and 3D mockups',
      'Short-form social content engine (Reels, TikTok, YouTube Shorts)',
      'Full studio audio mastering, color grading, and sound design',
      'Storyboarding, scriptwriting, and creative direction',
      'Multi-platform content resizing and asset optimization'
    ],
    deliverables: [
      {
        title: 'Pre-Production & Scripting',
        items: ['Creative concept treatments', 'Shooting scripts & storyboards', 'Shot list & production schedule', 'Location & talent coordination']
      },
      {
        title: 'Production & Filming',
        items: ['4K multi-camera cinematography', 'Studio audio & lighting setup', 'On-location shooting', 'Raw footage library']
      },
      {
        title: 'Post-Production & Polish',
        items: ['Master 4K commercial cuts', 'Vertical social edits (9:16)', 'Custom sound design & mixing', 'Dynamic motion graphics & subtitles']
      }
    ],
    techStack: ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'After Effects', 'Cinema 4D', 'Sony Cinema Line Gear'],
    idealFor: ['Product launches', 'Personal brands & founders', 'Social-first campaigns', 'High-ticket service marketing']
  }
];
