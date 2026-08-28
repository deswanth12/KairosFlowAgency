import { ProcessStep } from '@/types';

export const processStepsData: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discover',
    subtitle: 'Context & Goals',
    description: 'We understand your business model, customer dynamics, technical landscape, and immediate goals before proposing a solution.',
    whatHappens: 'In-depth stakeholder alignment sessions, technical infrastructure audit, user journey mapping, and requirement scoping.',
    clientOutput: 'Comprehensive Project Brief, Requirements Specification, and Architecture Matrix.',
    keyActivities: [
      'Founder Alignment & Business Model Assessment',
      'Target Audience & User Persona Mapping',
      'Technical Feasibility & Integration Audit',
      'Scope Matrix & Success Criteria Definition'
    ]
  },
  {
    stepNumber: '02',
    title: 'Plan',
    subtitle: 'Scope & Deliverables',
    description: 'We define exact scope, sprint priorities, milestones, tech stack selections, and realistic delivery timelines.',
    whatHappens: 'System architecture design, component inventory planning, API contract definition, and sprint schedule gating.',
    clientOutput: 'Fixed Scope Proposal, Detailed Sprint Roadmap, Milestone Schedule, and Deliverables Contract.',
    keyActivities: [
      'Feature Prioritization & MVP Scoping',
      'Data Model & API Contract Specification',
      'Milestone Timeline with Weekly Checkpoints',
      'Fixed Deliverables Agreement'
    ]
  },
  {
    stepNumber: '03',
    title: 'Design',
    subtitle: 'Visuals & Experience',
    description: 'We create the visual and experience direction with high-fidelity interactive prototypes, design systems, and brand assets.',
    whatHappens: 'Wireframing, typography and color exploration, Figma component system construction, and interactive prototype testing.',
    clientOutput: 'High-Fidelity Interactive Figma Prototype, Complete Design System, and Brand Assets.',
    keyActivities: [
      'Information Architecture & Wireframes',
      'Design System & Design Token Engineering',
      'Interactive Micro-interactions & Motion Specs',
      'Client Design Review & Formal Sign-off'
    ]
  },
  {
    stepNumber: '04',
    title: 'Build',
    subtitle: 'Development & Testing',
    description: 'We develop, test, and refine the product with modular TypeScript code, secure backends, and weekly preview environments.',
    whatHappens: 'Frontend component development, backend API endpoints, database migrations, third-party integrations, and staging previews.',
    clientOutput: 'Interactive Staging Environment, Working Product Builds, and Weekly Progress Demos.',
    keyActivities: [
      'Next.js / React Full-Stack Development',
      'Database Modeling & Secure API Integrations',
      'Automated Test Suites & Type Safety QA',
      'Interactive Staging Preview Environments'
    ]
  },
  {
    stepNumber: '05',
    title: 'Launch',
    subtitle: 'Deployment & Verification',
    description: 'We deploy and verify everything with thorough cross-browser QA, accessibility validation, SEO configuration, and handover.',
    whatHappens: 'Lighthouse performance optimization, SSL verification, analytics event tracking setup, and admin training handover.',
    clientOutput: 'Live Production URL, Admin/CMS Access Credentials, Codebase Repository Transfer, and 30-Day Launch Warranty.',
    keyActivities: [
      'End-to-End Performance & Security QA',
      'Technical SEO, OG Tags & Analytics Setup',
      'Zero-Downtime Production Deployment',
      'Client Admin Training & Code Documentation'
    ]
  },
  {
    stepNumber: '06',
    title: 'Support',
    subtitle: 'Ongoing Availability',
    description: 'We stay available after launch with proactive maintenance, security patches, performance monitoring, and iterative feature scaling.',
    whatHappens: 'Real-time telemetry monitoring, user feedback analysis, conversion funnel tuning, and continuous maintenance availability.',
    clientOutput: '30-Day Post-Launch Warranty, Maintenance Retainer Options, and Ongoing Developer Direct Line.',
    keyActivities: [
      '30-Day Post-Launch Warranty & Bug Fixes',
      'Quarterly Security & Dependency Updates',
      'Conversion Rate Optimization (CRO)',
      'Feature Enhancements & Scaling Support'
    ]
  }
];
