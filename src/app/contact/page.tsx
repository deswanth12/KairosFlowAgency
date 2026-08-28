'use client';

import React, { Suspense } from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Terminal
} from 'lucide-react';

export default function ContactPage() {
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <div className="bg-[#F7F7F4] text-[#111827] min-h-screen">
      {/* Top Hero Section */}
      <section className="bg-[#F7F7F4] text-[#111827] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-4 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
            <span>/ PROJECT INTAKE & DISCOVERY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B1F33] font-display max-w-3xl mb-6">
            Start a project with <span className="text-[#B8613A]">Kairos Flow.</span>
          </h1>
          <p className="text-[#5B6875] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Fill in the structured brief below or connect directly with our founding leads via WhatsApp, Email, or Phone.
          </p>
        </div>
      </section>

      {/* Main Intake Section */}
      <div className="bg-[#F7F7F4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Channels & Guarantee (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Contact Cards */}
              <div className="bg-white border border-[#D9E0E5] rounded-2xl p-6 sm:p-8 shadow-subtle-card space-y-6">
                <h3 className="text-base font-bold text-[#0B1F33] tracking-tight uppercase tracking-wider font-mono text-xs">
                  / DIRECT CHANNELS
                </h3>

                {/* WhatsApp Direct Link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-[#F7F7F4] hover:bg-[#FBF4F0] border border-[#D9E0E5] hover:border-[#B8613A]/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono text-[#B8613A] font-semibold flex items-center gap-1">
                      <span>Fastest Response</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="text-sm font-bold text-[#0B1F33] font-display">WhatsApp Chat</div>
                    <div className="text-xs text-[#5B6875] mt-0.5">Instant lead coordinator connection</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteSettingsData.email)}&su=${encodeURIComponent('Project Inquiry | Kairos Flow Agency')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-[#F7F7F4] hover:bg-[#FBF4F0] border border-[#D9E0E5] hover:border-[#B8613A]/30 transition-all"
                  title="Click to compose in Gmail"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#B8613A] flex items-center justify-center flex-shrink-0 border border-orange-100">
                    <Mail className="w-5 h-5 text-[#B8613A]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono text-[#B8613A] font-semibold flex items-center gap-1">
                      <span>Email Us</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="text-sm font-bold text-[#0B1F33] break-all font-display">{siteSettingsData.email}</div>
                    <div className="text-xs text-[#5B6875] mt-0.5">&lt; 4 hour SLA reply guarantee</div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${siteSettingsData.phone.replace(/[^0-9+]/g, '')}`}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-[#F7F7F4] hover:bg-[#FBF4F0] border border-[#D9E0E5] hover:border-[#B8613A]/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#0B1F33] flex items-center justify-center flex-shrink-0 border border-slate-200">
                    <Phone className="w-5 h-5 text-[#B8613A]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono text-[#5B6875] font-semibold">Direct Call</div>
                    <div className="text-sm font-bold text-[#0B1F33] font-display">{siteSettingsData.phone}</div>
                    <div className="text-xs text-[#5B6875] mt-0.5">Mon–Sat, 9AM–7PM IST</div>
                  </div>
                </a>
              </div>

              {/* Response SLA & Security Box */}
              <div className="bg-[#0B1F33] text-white p-6 sm:p-7 rounded-2xl border border-[#0B1F33] shadow-elevated-card space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B8613A] uppercase tracking-wider font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Our Turnaround SLA</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We review briefs in detail within 4 business hours. If there is a mutual fit, we schedule a 25-minute technical discovery call with the founding leads.
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#B8613A] flex-shrink-0" />
                  <span>Standard NDA applied to all submissions.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Brief Form (8 cols) */}
            <div className="lg:col-span-8">
              <Suspense fallback={<div className="p-12 text-center text-[#5B6875] text-sm font-mono">Loading intake form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
