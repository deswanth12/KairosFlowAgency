import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'evalmesh',
    slug: 'evalmesh-ai-proxy-gateway',
    title: 'EvalMesh AI Security & Proxy Gateway',
    tagline: 'Enterprise proxy gateway turning AI agents into secure, deterministic, and cost-efficient services.',
    category: 'AI',
    client: 'Open Source / Enterprise AI',
    industry: 'AI Security & Cloud Infrastructure',
    year: '2026',
    duration: '8 Weeks',
    role: 'System Architecture & Core Engineering (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    summary: 'An open-source proxy gateway engineered to harden generative AI and LLM agents with real-time Web Application Firewalls (WAF), automated PII redaction, 5ms semantic caching, and continuous CI/CD regression testing.',
    challenge: 'Enterprises deploying LLM agents were suffering from unpredictable cloud API token bills, latency bottlenecks, data leakage risks, and lack of regression testing when LLM prompts drifted.',
    solution: 'Designed and built EvalMesh in Python and FastAPI, implementing an intelligent proxy layer that intercepts LLM calls, strips sensitive PII on-the-fly, serves cached responses in <5ms via semantic embeddings, and blocks malicious injection prompts with a real-time WAF.',
    process: [
      'Architected high-throughput async proxy router in Python & FastAPI',
      'Engineered sub-5ms vector semantic cache to reduce redundant LLM API costs',
      'Implemented real-time prompt injection firewall & regex PII sanitizers',
      'Developed automated CI/CD benchmark suite for continuous prompt evaluation'
    ],
    features: [
      {
        title: '5ms Semantic Caching Engine',
        description: 'Matches incoming queries against previous vector embeddings, saving up to 60% of third-party LLM API consumption.'
      },
      {
        title: 'Real-Time Prompt Injection WAF',
        description: 'Analyzes adversarial user prompts to prevent jailbreaks, system prompt extractions, and unauthorized tool calls.'
      },
      {
        title: 'Automated PII Redaction Pipeline',
        description: 'Anonymizes emails, credit cards, SSNs, and phone numbers before payloads reach external cloud models.'
      }
    ],
    techStack: ['Python', 'FastAPI', 'Vector Embeddings', 'Redis', 'Docker', 'AsyncIO', 'WAF Architecture'],
    results: [
      { metric: '<5ms', label: 'Semantic Cache Response Time' },
      { metric: '60%', label: 'LLM Token Cost Reduction' },
      { metric: '100%', label: 'Deterministic PII Anonymization' }
    ],
    liveUrl: 'https://github.com/deswanth12/EvalMesh',
    featured: true
  },
  {
    id: 'janai',
    slug: 'janai-citizen-welfare-platform',
    title: 'JanAI Citizen Welfare & Public Assistance Platform',
    tagline: 'Modular citizen welfare platform deployed for public service workflows and citizen assistance.',
    category: 'AI',
    client: 'Public Services / State Welfare Pilot',
    industry: 'GovTech & Public Welfare',
    year: '2026',
    duration: '10 Weeks',
    role: 'Full-Stack Architecture & AI Integration (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    summary: 'A modular citizen welfare and public schemes intelligence platform engineered for Andhra Pradesh deployment, simplifying complex welfare scheme eligibility, automated citizen triage, and regional language assistance.',
    challenge: 'Citizens faced friction understanding hundreds of state government welfare schemes, required criteria, and document verification processes due to fragmented bureaucratic portals.',
    solution: 'Engineered an accessible, conversational public welfare engine with localized language understanding, dynamic scheme matching algorithms, and automated document eligibility checklists.',
    features: [
      {
        title: 'Dynamic Scheme Eligibility Matcher',
        description: 'Analyzes user income, family demographics, and location to immediately present matching welfare benefits.'
      },
      {
        title: 'Multilingual Regional Voice & Text',
        description: 'Enables rural citizens to interact in Telugu and English with audio feedback and simple form assistance.'
      },
      {
        title: 'Automated Verification Checklist',
        description: 'Generates step-by-step document guidance to prevent citizen application rejections at local service centers.'
      }
    ],
    techStack: ['JavaScript', 'React', 'Node.js', 'NLP APIs', 'Tailwind CSS', 'PostgreSQL'],
    results: [
      { metric: '<10s', label: 'Scheme Eligibility Resolution' },
      { metric: '100%', label: 'Automated Validation Pass' },
      { metric: 'Pilot-Ready', label: 'Public State Deployment' }
    ],
    liveUrl: 'https://github.com/deswanth12/JanAI',
    featured: true
  },
  {
    id: 'signlang',
    slug: 'signlang-ai-computer-vision-translator',
    title: 'SignLang AI Real-Time Vision Translator',
    tagline: 'Real-time AI sign language translator with 3D hand tracking and multi-language speech synthesis.',
    category: 'AI',
    client: 'Accessibility & Assistive Tech',
    industry: 'Computer Vision & Healthcare Accessibility',
    year: '2025',
    duration: '6 Weeks',
    role: 'Computer Vision & Core Python (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    summary: 'A real-time AI Sign Language Translator powered by Google MediaPipe computer vision, Flask, and Web Speech Synthesis, featuring dual-hand 3D tracking, sentence accumulation, and interactive learning quizzes.',
    challenge: 'Hearing-impaired individuals frequently encounter severe communication barriers in daily public interactions where human interpreters are unavailable.',
    solution: 'Built a lightweight, browser-accessible vision pipeline that captures webcam video, maps 21 3D hand landmarks per hand, translates gestures into structured sentences, and synthesizes audible speech in real time.',
    features: [
      {
        title: 'Dual-Hand 3D Landmark Tracking',
        description: 'Tracks 42 simultaneous hand and finger joints at 30+ FPS directly through standard consumer webcams.'
      },
      {
        title: 'Sentence Accumulator & Context Engine',
        description: 'Transforms continuous individual sign gestures into grammatically coherent conversational phrases.'
      },
      {
        title: 'Multi-Language Audio Synthesis',
        description: 'Speaks out translated sentences immediately using browser speech synthesis APIs for two-way conversations.'
      }
    ],
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'Flask', 'Web Speech API', 'JavaScript', 'Tailwind CSS'],
    results: [
      { metric: '30+ FPS', label: 'Real-Time Vision Latency' },
      { metric: '96.4%', label: 'Gesture Classification Accuracy' },
      { metric: 'Zero Hardware', label: 'Runs on Standard Webcams' }
    ],
    liveUrl: 'https://github.com/deswanth12/singlangbydeshu',
    featured: true
  },
  {
    id: 'ember-oak',
    slug: 'ember-oak-destination-restaurant',
    title: 'Ember & Oak Destination Dining Portal',
    tagline: 'High-finesse editorial web application for a premier destination restaurant in Tirupati.',
    category: 'Web',
    client: 'Ember & Oak Restaurant',
    industry: 'Hospitality & Fine Dining',
    year: '2026',
    duration: '4 Weeks',
    role: 'Lead Full-Stack Web Development (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    summary: 'A bespoke, editorial digital experience engineered for Ember & Oak Tirupati featuring rich visual culinary galleries, interactive digital menus, direct WhatsApp reservation dispatch, and sub-second page performance.',
    challenge: 'The restaurant needed a luxury digital presence that matched its destination-level culinary finesse and enabled seamless table booking without third-party commission fees.',
    solution: 'Designed and engineered an ultra-fast Next.js web application with warm editorial typography, interactive category filtering, and direct WhatsApp table reservation routing.',
    features: [
      {
        title: 'Interactive Culinary Menu Catalog',
        description: 'Categorized food and beverage menus with dietary badges, high-resolution photography, and pricing.'
      },
      {
        title: 'Commission-Free WhatsApp Reservations',
        description: 'Pre-fills guest date, time, party size, and table preferences directly into the restaurant’s booking desk WhatsApp.'
      },
      {
        title: 'Sub-Second Editorial Performance',
        description: 'Optimized Next.js image pipeline achieving a 99 Lighthouse performance score and 0.6s load time.'
      }
    ],
    techStack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'WhatsApp API'],
    results: [
      { metric: '0.6s', label: 'Page Load Speed' },
      { metric: '+85%', label: 'Direct WhatsApp Bookings' },
      { metric: '0%', label: 'Third-Party Commission Paid' }
    ],
    liveUrl: 'https://github.com/deswanth12/Ember-Oak-Tirupati-restaurant-with-destination-level-finesse.',
    featured: true
  },
  {
    id: 'sagiro',
    slug: 'sagiro-mobile-app',
    title: 'Sagiro Mobile Application Suite',
    tagline: 'Cross-platform mobile utility application built with Flutter, SQLite caching, and compliance.',
    category: 'App',
    client: 'Mobile Utility / Sagiro Systems',
    industry: 'Mobile Software & Utility Tools',
    year: '2025',
    duration: '8 Weeks',
    role: 'Mobile Engineering & Dart Development (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    summary: 'A fast, cross-platform mobile utility application engineered in Dart & Flutter featuring offline SQLite data synchronization, fluid micro-interactions, and compliant privacy architecture.',
    challenge: 'Creating a lightweight mobile utility that functions completely offline, minimizes battery drain, and maintains rapid 60 FPS UI performance across both budget and flagship devices.',
    solution: 'Architected with Flutter and local SQLite database stores, implementing strict state management, low memory footprints, and standalone privacy policy web endpoints.',
    features: [
      {
        title: 'Offline-First SQLite Architecture',
        description: 'Ensures instantaneous access and data updates without requiring active internet connectivity.'
      },
      {
        title: 'Smooth 60 FPS Native Rendering',
        description: 'Custom Flutter widgets and sliver animations optimized for low RAM consumption.'
      },
      {
        title: 'Dedicated Privacy & Compliance Subsystem',
        description: 'Complete data protection governance with standalone hosting at sagiro-privacy.'
      }
    ],
    techStack: ['Dart', 'Flutter', 'SQLite', 'Android SDK', 'Git', 'HTML5'],
    results: [
      { metric: '60 FPS', label: 'Consistent UI Performance' },
      { metric: '100%', label: 'Offline Feature Reliability' },
      { metric: '<15MB', label: 'Lightweight Binary Size' }
    ],
    liveUrl: 'https://github.com/deswanth12/sagiro',
    featured: true
  },
  {
    id: 'cybersecurity-toolkit',
    slug: 'cyber-security-toolkit',
    title: 'Professional Cyber Security Toolkit',
    tagline: 'Network vulnerability scanner, packet auditor, and security management utility.',
    category: 'AI',
    client: 'Security & DevOps Utility',
    industry: 'Cyber Security & Network Diagnostics',
    year: '2025',
    duration: '5 Weeks',
    role: 'Python & Network Systems Engineering (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    summary: 'A Python-engineered Cyber Security Suite providing network port auditing, packet analysis, SQLite credential vaulting, and multi-threaded vulnerability diagnostics.',
    challenge: 'Security administrators and developers needed a lightweight, standalone desktop toolkit to conduct immediate network diagnostics without setting up complex enterprise server stacks.',
    solution: 'Built a multi-threaded Python application integrating Tkinter UI with low-level socket programming, automated port ranges scanning, and local encrypted SQLite logging.',
    features: [
      {
        title: 'Multi-Threaded Port Scanner',
        description: 'Rapidly audits TCP/UDP ports to discover open services and potential network misconfigurations.'
      },
      {
        title: 'Encrypted SQLite Audit Vault',
        description: 'Stores scan history, IP audit logs, and vulnerability reports securely on local disk.'
      },
      {
        title: 'Standalone Cross-Platform GUI',
        description: 'Clean Tkinter interface enabling one-click diagnostic runs on Windows and Linux.'
      }
    ],
    techStack: ['Python', 'Socket Programming', 'SQLite', 'Tkinter', 'Threading', 'Network Protocols'],
    results: [
      { metric: 'Multi-Threaded', label: 'Parallel Port Scanning' },
      { metric: 'Zero Cloud', label: '100% Local Data Privacy' },
      { metric: 'Instant', label: 'Diagnostic Report Export' }
    ],
    liveUrl: 'https://github.com/deswanth12/Cyber-Security-Toolkit',
    featured: false
  },
  {
    id: 'dental-clinic',
    slug: 'an-dental-clinic-platform',
    title: 'A&N Dental Clinic Patient Portal',
    tagline: 'Modern patient appointment scheduling and dental care management web application.',
    category: 'Web',
    client: 'Healthcare & Clinical Practice',
    industry: 'Healthcare & Medical Web Services',
    year: '2025',
    duration: '4 Weeks',
    role: 'Frontend & Patient Flow Design (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    summary: 'A patient-first healthcare web portal for dental clinics featuring treatment breakdowns, doctor bios, transparent pricing guides, and instant appointment booking via WhatsApp.',
    challenge: 'Dental patients often experience appointment booking friction and uncertainty regarding treatment costs and procedure requirements.',
    solution: 'Engineered an accessible web platform with clear visual procedure guides, dentist credentials, emergency consultation buttons, and direct appointment dispatching.',
    features: [
      {
        title: 'Interactive Treatment Directory',
        description: 'Explains dental procedures, estimated durations, and pre-appointment care in plain language.'
      },
      {
        title: 'Direct WhatsApp Appointment Triage',
        description: 'Enables patients to request consultation slots with automated slot selection.'
      },
      {
        title: 'Mobile-Optimized Responsive Layout',
        description: 'Fast, responsive interface ensuring seamless access for patients on smartphones.'
      }
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'WhatsApp API', 'Vercel'],
    results: [
      { metric: '0.7s', label: 'Mobile Page Speed' },
      { metric: '+65%', label: 'Online Appointment Inquiries' },
      { metric: '100%', label: 'Mobile Responsive Score' }
    ],
    liveUrl: 'https://github.com/deswanth12/an-detalclinic',
    featured: false
  },
  {
    id: 'luxury-hotel',
    slug: 'luxury-hotel-suites-portal',
    title: 'Grand Luxury Hotel & Suites Experience',
    tagline: 'Editorial hospitality web portal featuring immersive suite galleries and reservation booking.',
    category: 'Web',
    client: 'Luxury Hospitality & Suites',
    industry: 'Tourism & Premium Hospitality',
    year: '2026',
    duration: '4 Weeks',
    role: 'Frontend Engineering & UI Craft (Desvanth)',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    summary: 'A refined hospitality digital showcase designed for luxury hotel stays in Tirupati, presenting suite virtual tours, amenities, dining packages, and frictionless room inquiries.',
    challenge: 'Differentiating a luxury hotel in a competitive pilgrimage market by conveying high-touch comfort, pristine amenities, and tailored concierge services.',
    solution: 'Crafted an editorial layout with high-resolution imagery, smooth section transitions, room comparison matrices, and direct concierge booking.',
    features: [
      {
        title: 'Immersive Suite Showcase',
        description: 'Visual galleries detailing square footage, bed configurations, view orientations, and amenities.'
      },
      {
        title: 'Concierge Direct Booking',
        description: 'Streamlined booking inquiry flow connecting guests with hotel front desk in seconds.'
      },
      {
        title: 'Location & Pilgrimage Guides',
        description: 'Built-in local travel insights and temple distance guides for arriving guests.'
      }
    ],
    techStack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    results: [
      { metric: '98', label: 'Lighthouse Performance' },
      { metric: '+120%', label: 'Direct Stay Inquiries' },
      { metric: '0.5s', label: 'Time-to-Interactive' }
    ],
    liveUrl: 'https://github.com/deswanth12/luxury-hotel',
    featured: false
  }
];
