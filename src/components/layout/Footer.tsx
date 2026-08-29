'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { navLinks, siteSettingsData } from '@/data/settings';
import { servicesData } from '@/data/services';
import { generateWhatsAppLink } from '@/lib/utils';
import { ArrowUpRight, MessageCircle, Mail, Phone, MapPin, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide public footer completely inside the private Admin CRM
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <footer className="bg-[#0B1F33] text-slate-300 border-t border-[#0B1F33] relative overflow-hidden">
      {/* Subtle top copper ambient highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#B8613A]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Positioning Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-5 focus:outline-none">
                <Logo size={36} variant="full" theme="dark" />
              </Link>
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
                Kairos represents the opportune moment. Flow represents continuous execution. We partner with founders and enterprises to build high-performance digital products, AI systems, and brand authority.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-mono">
                <span className="w-2 h-2 rounded-full bg-[#B8613A] animate-pulse" />
                <span className="font-semibold">STATUS: ACCEPTING SELECT PROJECTS</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteSettingsData.email)}&su=${encodeURIComponent('Project Inquiry | Kairos Flow Agency')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-[#B8613A]" />
              </a>
              <a
                href={`tel:${siteSettingsData.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4 text-[#B8613A]" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#B8613A] mb-4">/ STRUCTURE</h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#B8613A]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Disciplines */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#B8613A] mb-4">/ DISCIPLINES</h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services#${svc.slug}`}
                    className="text-slate-300 hover:text-white transition-colors line-clamp-1"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Office & Direct Contact */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#B8613A] mb-4">/ DIRECT COMMS</h4>
            <div className="space-y-3 text-xs font-mono text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#B8613A] flex-shrink-0 mt-0.5" />
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteSettingsData.email)}&su=${encodeURIComponent('Project Inquiry | Kairos Flow Agency')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors break-all font-semibold"
                  title="Click to compose in Gmail"
                >
                  {siteSettingsData.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#B8613A] flex-shrink-0 mt-0.5" />
                <a href={`tel:${siteSettingsData.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {siteSettingsData.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8613A] flex-shrink-0 mt-0.5" />
                <span>{siteSettingsData.address}</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                {siteSettingsData.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Kairos Flow Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Project Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
