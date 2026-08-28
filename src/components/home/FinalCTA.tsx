'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';
import { ArrowUpRight, MessageCircle, Mail, Clock, Check, Terminal } from 'lucide-react';

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
    <section className="bg-[#0B1F33] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Copper ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#B8613A]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-slate-200 mb-8 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#B8613A] animate-pulse" />
          <span>STATUS: ACCEPTING SELECTED Q1/Q2 PROJECTS</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display max-w-2xl mb-6 leading-tight">
          Have an ambitious idea? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F7F7F4] to-[#B8613A]">
            Let’s build it right.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-10">
          Whether you need a modern web application, an autonomous AI pipeline, a mobile app, or a complete brand system, our founding team is ready to execute.
        </p>

        {/* Triple Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-6 font-mono">
          {/* Primary Action: White Button with Deep Navy Text */}
          <Link
            href="/contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold text-[#0B1F33] bg-white hover:bg-[#F7F7F4] rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider"
          >
            <span>/ START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 text-[#B8613A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* WhatsApp Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-colors uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>

          {/* Email Us Button */}
          <button
            type="button"
            onClick={handleEmailClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all uppercase tracking-wider"
            title="Click to compose in Gmail or copy address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-[#B8613A]" />
                <span>Email Us</span>
              </>
            )}
          </button>
        </div>

        {/* SLA and Direct Contact */}
        <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mb-4">
          <Clock className="w-3.5 h-3.5 text-[#B8613A]" />
          <span>Average SLA response: &lt; 4 hours during business days</span>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Direct inbox: <span className="text-white font-semibold">{siteSettingsData.email}</span>
        </div>
      </div>
    </section>
  );
};
