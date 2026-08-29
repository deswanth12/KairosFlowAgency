import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Terminal } from 'lucide-react';
import { siteSettingsData } from '@/data/settings';

export const metadata = {
  title: 'Privacy Policy & Terms | Kairos Flow Agency',
  description: 'Privacy policy, client data governance, and non-disclosure standards for Kairos Flow Agency.'
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F7F7F4] text-[#111827] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5B6875] hover:text-[#0B1F33] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>/ BACK TO HOME</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-4 font-semibold shadow-subtle-card">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B8613A]" />
          <span>/ LEGAL & CLIENT DATA STANDARDS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B1F33] font-display mb-6">
          Privacy Policy & Client Data Standards
        </h1>
        <p className="text-[#5B6875] text-sm font-mono mb-12">
          Effective Date: 2026 • Kairos Flow Agency Governance Standards
        </p>

        <div className="space-y-10 text-[#5B6875] text-sm sm:text-base leading-relaxed border-t border-[#D9E0E5] pt-10">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1F33] font-display">1. Information We Collect</h2>
            <p>
              When you submit a project brief or interact with our AI Consultant, we collect only the project details necessary to assess and execute your engagement:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-mono text-xs text-[#111827]">
              <li>Full Name, Company / Venture Name, Email, and WhatsApp/Phone Number.</li>
              <li>Functional specifications, project descriptions, target timelines, and budget ranges.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1F33] font-display">2. Non-Disclosure & Strict Confidentiality</h2>
            <p>
              We treat all client concepts, proprietary architectures, and business briefs as strictly confidential under strict non-disclosure obligations. We never sell, rent, or distribute client contact data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1F33] font-display">3. 100% Intellectual Property & Code Ownership</h2>
            <p>
              Upon milestone completion and balance settlement, 100% of all intellectual property, bespoke source code, Figma design files, database architectures, and media assets belong entirely to the client with zero vendor lock-in.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1F33] font-display">4. Official Communication Channel</h2>
            <p>
              Official correspondence is conducted strictly through our verified company inbox <strong className="text-[#0B1F33] font-mono">{siteSettingsData.email}</strong> and founder phone lines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
