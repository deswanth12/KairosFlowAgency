import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Kairos Flow Agency',
  description: 'Privacy policy and data protection practices for Kairos Flow Agency clients and visitors.'
};

export default function PrivacyPage() {
  return (
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Top Header */}
      <section className="bg-ink text-ivory pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-light hover:text-ivory transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ivory font-display mb-4">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-slate-light text-sm font-mono">
            Last Updated: August 2026 • Kairos Flow Agency
          </p>
        </div>
      </section>

      {/* Main Privacy Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate text-sm sm:text-base leading-relaxed space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-softblack mb-3">1. Information We Collect</h2>
          <p>
            When you submit a project enquiry through our intake form or interact with our website, we collect information you voluntarily provide, including:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Your full name and professional title</li>
            <li>Your business or company name</li>
            <li>Contact information (email address, telephone / WhatsApp number)</li>
            <li>Project briefs, technical requirements, budget estimates, and reference links</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-softblack mb-3">2. How We Use Your Information</h2>
          <p>
            All submitted information is strictly used to evaluate your project requirements, prepare architectural proposals, coordinate discovery calls, and manage active client engagements. We do not sell, rent, or monetize your personal or company information to any third party.
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-softblack mb-3">3. Confidentiality & Non-Disclosure (NDA)</h2>
          <p>
            We treat all proprietary product concepts, software architectures, unreleased features, and business logic shared with Kairos Flow Agency with institutional confidentiality. Formal bilateral NDAs are readily executed upon request prior to detailed technical discovery sessions.
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-softblack mb-3">4. Data Storage & Security</h2>
          <p>
            Submitted project data is stored in secured, encrypted environments with restricted access limited exclusively to authorized agency partners. We employ industry-standard encryption protocols (HTTPS/TLS) across all data transmissions.
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-softblack mb-3">5. Contact Regarding Your Data</h2>
          <p>
            If you wish to review, update, or request the deletion of your submitted project information, please contact us directly at{' '}
            <a href="mailto:hello@kairosflow.agency" className="text-teal font-semibold hover:underline">
              hello@kairosflow.agency
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
