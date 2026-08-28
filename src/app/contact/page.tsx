'use client';

import React, { Suspense } from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';

export default function ContactPage() {
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Top Hero Section (Deep Ink) */}
      <section className="bg-ink text-ivory pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-4">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Project Intake & Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-3xl mb-6">
            Start a project with Kairos Flow.
          </h1>
          <p className="text-slate-light text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Fill in the structured brief below or connect directly with our founding leads via WhatsApp, Email, or Phone.
          </p>
        </div>
      </section>

      {/* Main Intake Section (Warm Ivory) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels & Guarantee (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-ivory-card border border-ivory-border rounded-2xl p-6 sm:p-8 shadow-subtle-ivory space-y-6">
              <h3 className="text-base font-bold text-softblack tracking-tight uppercase tracking-wider font-mono text-xs text-slate">
                Direct Communication
              </h3>

              {/* WhatsApp Direct Link */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-xl bg-ivory hover:bg-ivory-muted border border-ivory-border transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-subtle text-teal flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-teal font-semibold flex items-center gap-1">
                    <span>Fastest Response</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="text-sm font-bold text-softblack">WhatsApp Chat</div>
                  <div className="text-xs text-slate mt-0.5">Instant lead coordinator connection</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteSettingsData.email)}&su=${encodeURIComponent('Project Inquiry | Kairos Flow Agency')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-xl bg-ivory hover:bg-ivory-muted border border-ivory-border transition-all"
                title="Click to compose in Gmail"
              >
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-teal font-semibold flex items-center gap-1">
                    <span>Email Us</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="text-sm font-bold text-softblack break-all">{siteSettingsData.email}</div>
                  <div className="text-xs text-slate mt-0.5">&lt; 4 hour reply guarantee</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${siteSettingsData.phone.replace(/[^0-9+]/g, '')}`}
                className="group flex items-start gap-4 p-4 rounded-xl bg-ivory hover:bg-ivory-muted border border-ivory-border transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-teal" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate font-semibold">Direct Call</div>
                  <div className="text-sm font-bold text-softblack">{siteSettingsData.phone}</div>
                  <div className="text-xs text-slate mt-0.5">Mon–Sat, 9AM–7PM IST</div>
                </div>
              </a>
            </div>

            {/* Response SLA & Security Box */}
            <div className="bg-ink text-ivory p-6 sm:p-7 rounded-2xl border border-navy-border shadow-card-dark space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-champagne uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Our Turnaround SLA</span>
              </div>
              <p className="text-xs text-slate-light leading-relaxed">
                We review briefs in detail within 4 business hours. If there is a mutual fit, we schedule a 25-minute technical discovery call with the founding leads.
              </p>

              <div className="pt-3 border-t border-navy-border flex items-center gap-2 text-xs text-slate-light">
                <ShieldCheck className="w-4 h-4 text-teal flex-shrink-0" />
                <span>Standard NDA applied to all submissions.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form (8 cols) */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="p-12 text-center text-slate text-sm">Loading intake form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
