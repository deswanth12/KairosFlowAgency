'use client';

import React, { useState } from 'react';
import { faqData } from '@/data/settings';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('pricing');
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-ivory text-softblack py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-ivory-border">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal" />
            <span>Transparency & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-softblack font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-slate text-sm sm:text-base mt-3 leading-relaxed">
            Clear expectations on pricing, delivery timelines, revisions, and ongoing support before we start.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-ivory-card border border-ivory-border rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-champagne font-bold uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <span className="text-slate">•</span>
                    <span className="text-sm sm:text-base font-bold text-softblack tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-slate text-xs sm:text-sm leading-relaxed border-t border-ivory-border/60">
                    <p className="mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="mt-12 p-6 rounded-xl bg-ivory-muted border border-ivory-border text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-xs font-bold text-softblack">Have a specific question not listed here?</div>
            <div className="text-xs text-slate mt-0.5">Connect directly with our lead team on WhatsApp.</div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
