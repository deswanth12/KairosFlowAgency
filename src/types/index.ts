export type ServiceCategory = 
  | 'Web Development'
  | 'App Development'
  | 'AI & Automation'
  | 'UI/UX & Branding'
  | 'Digital Marketing'
  | 'Video & Content';

export type ProjectCategory = 
  | 'Web'
  | 'App'
  | 'AI'
  | 'Branding'
  | 'Marketing'
  | 'Content';

export type LeadStatus =
  | 'New Lead'
  | 'Contacted'
  | 'Discovery Call'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'In Progress'
  | 'Completed'
  | 'Lost / Closed';

export type LeadPriority = 'High' | 'Medium' | 'Low';
export type ProposalStatus = 'Not Started' | 'Draft' | 'Sent' | 'Approved' | 'Declined';
export type PaymentStatus = 'Pending Deposit' | 'Deposit Paid' | 'Milestone Paid' | 'Fully Paid' | 'N/A';

export interface ProjectResult {
  metric: string;
  label: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  client: string;
  industry: string;
  year: string;
  duration: string;
  role: string;
  heroImage: string;
  thumbnail: string;
  summary: string;
  challenge: string;
  solution: string;
  process?: string[];
  features: CaseStudyFeature[];
  techStack: string[];
  results: ProjectResult[];
  gallery?: string[];
  liveUrl?: string;
  featured: boolean;
}

export interface ServiceDeliverable {
  title: string;
  items: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  tagline: string;
  category: ServiceCategory;
  iconName: string;
  problemSolved: string;
  included: string[];
  deliverables: ServiceDeliverable[];
  techStack: string[];
  idealFor: string[];
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  quote?: string;
  photo: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    email?: string;
  };
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  whatHappens: string;
  clientOutput: string;
  keyActivities: string[];
}

export interface LeadNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  description: string;
  budget?: string;
  timeline?: string;
  referenceLinks?: string;
  hearAbout?: string;
  status: LeadStatus;
  priority?: LeadPriority;
  assignedTo?: string;
  estimatedValue?: string;
  followUpDate?: string;
  lastContactedDate?: string;
  proposalStatus?: ProposalStatus;
  paymentStatus?: PaymentStatus;
  notes?: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  agencyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  workingHours: string;
  responseExpectation: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}
