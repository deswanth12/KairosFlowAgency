'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';
import { ArrowUpRight, MessageCircle, Mail, Clock, Check, Copy } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = siteSettingsData.email;
    
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    // Open Gmail web compose in a new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent('Project Inquiry | Kairos Flow Agency')}&body=${encodeURIComponent(
      'Hi Kairos Flow Team,\n\nI would like to discuss a project regarding:\n- Project Scope:\n- Estimated Timeline:\n- Target Budget:\n\nBest regards,\n'
    )}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-ink text-ivory py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Availability Badge with soft Champagne accent */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/80 border border-navy-border text-xs font-mono text-slate-light mb-8">
          <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          <span className="text-ivory">Currently Accepting Selected Projects</span>
        </div>

        {/* Recommended Copy from Spec */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-2xl mb-6">
          Have an idea? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory via-teal-subtle to-teal">
            Let’s build it.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-light max-w-xl font-normal leading-relaxed mb-10">
          Whether you need a full-scale web application, an autonomous AI pipeline, a mobile app, or a complete brand overhaul, we are ready to execute.
        </p>

        {/* Triple Action CTA Buttons: Start a Project, WhatsApp Us, Email Us */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-6">
          <Link
            href="/contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-lg shadow-elevated-ivory transition-all duration-200 hover:shadow-glow-teal"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-slate-light hover:text-ivory bg-navy/80 hover:bg-navy border border-navy-border rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-teal" />
            <span>WhatsApp Us</span>
          </a>

          <button
            type="button"
            onClick={handleEmailClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-slate-light hover:text-ivory bg-ink-surface hover:bg-navy border border-ink-border hover:border-teal/40 rounded-lg transition-all"
            title="Click to compose in Gmail or copy address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-teal" />
                <span className="text-teal font-semibold">Copied {siteSettingsData.email}!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-teal" />
                <span>Email Us</span>
              </>
            )}
          </button>
        </div>

        {/* Copied notification / helper text */}
        <div className="flex items-center gap-2 text-xs text-slate font-mono mb-4">
          <Clock className="w-3.5 h-3.5 text-champagne" />
          <span>Average response time: &lt; 4 hours during business days</span>
        </div>

        <div className="text-[11px] font-mono text-slate-muted">
          Direct inbox: <span className="text-slate-light">{siteSettingsData.email}</span>
        </div>
      </div>
    </section>
  );
};
