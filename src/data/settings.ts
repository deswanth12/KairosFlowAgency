import { SiteSettings, FAQItem } from '@/types';

export const siteSettingsData: SiteSettings = {
  agencyName: 'Kairos Flow Agency',
  tagline: 'Digital experiences built for businesses that want to move forward.',
  email: 'hello@kairosflow.agency',
  phone: '+91 77022 56073',
  whatsappNumber: '917702256073',
  address: 'Hyderabad & Bangalore, India • Global Client Delivery',
  workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
  responseExpectation: 'Within 24 hours on business days',
  socials: {
    linkedin: 'https://linkedin.com/company/kairos-flow-agency',
    twitter: 'https://twitter.com/kairosflow',
    instagram: 'https://instagram.com/kairosflow.agency',
    github: 'https://github.com/kairosflow'
  }
};

export const navLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export const faqData: FAQItem[] = [
  {
    id: 'pricing',
    category: 'Pricing',
    question: 'How do you price projects?',
    answer: 'Every project is scoped around your specific goals, functional requirements, and timeline. We provide transparent, fixed-scope milestone proposals so you know exactly what you will receive without unexpected cost overruns.'
  },
  {
    id: 'timeline',
    category: 'Timeline',
    question: 'How long does a typical project take?',
    answer: 'Most full-stack web and mobile sprint engagements range between 4 to 10 weeks, depending on complexity, third-party integrations, and asset preparation. Smaller sprint deliverables (such as brand identity or video packages) can be completed in 2 to 4 weeks.'
  },
  {
    id: 'process',
    category: 'Collaboration',
    question: 'How do we collaborate with your team day-to-day?',
    answer: 'You communicate directly with the specialist co-founders leading your project. We maintain a shared Slack or WhatsApp channel, conduct weekly video walkthroughs of your staging environment, and provide async milestone updates.'
  },
  {
    id: 'revisions',
    category: 'Revisions',
    question: 'What is your revision and approval policy?',
    answer: 'Our 6-stage process incorporates formal sign-off gates at every milestone (Discovery, Plan, Design, Build, Launch). You review and approve design wireframes and interactive prototypes before engineering begins, ensuring alignment from day one.'
  },
  {
    id: 'support',
    category: 'Support',
    question: 'What happens after the project is launched?',
    answer: 'Every project includes a 30-day post-launch warranty covering any technical bugs or adjustments. We also offer monthly maintenance and retainer agreements for teams requiring continuous feature development and marketing support.'
  },
  {
    id: 'payment',
    category: 'Payment',
    question: 'How are payments structured?',
    answer: 'Payments are structured across milestone deliverables—typically an initial deposit to initiate Discovery & Architecture, a mid-point milestone upon staging build review, and the final balance upon production deployment and IP handover.'
  }
];
