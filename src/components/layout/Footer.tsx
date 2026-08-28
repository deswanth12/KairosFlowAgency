import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { navLinks, siteSettingsData } from '@/data/settings';
import { servicesData } from '@/data/services';
import { generateWhatsAppLink } from '@/lib/utils';
import { ArrowUpRight, MessageCircle, Mail, Phone, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <footer className="bg-ink text-slate-light border-t border-ink-border relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Positioning Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-5 focus:outline-none">
                <Logo size={36} variant="full" theme="dark" />
              </Link>
              <p className="text-sm text-slate leading-relaxed max-w-sm mb-6">
                Kairos represents the right moment. Flow represents continuous execution. We help forward-thinking businesses scale through high-performance digital products, AI systems, and brand craftsmanship.
              </p>

              {/* Status Indicator with Soft Champagne accent */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/60 border border-navy-border text-xs">
                <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
                <span className="text-ivory/90 font-medium">Accepting Selected Q3/Q4 Projects</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-navy/80 hover:bg-navy border border-navy-border rounded-lg text-slate-light hover:text-ivory transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-teal" />
              </a>
              <a
                href={`mailto:${siteSettingsData.email}`}
                className="p-2.5 bg-navy/80 hover:bg-navy border border-navy-border rounded-lg text-slate-light hover:text-ivory transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-teal" />
              </a>
              <a
                href={`tel:${siteSettingsData.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2.5 bg-navy/80 hover:bg-navy border border-navy-border rounded-lg text-slate-light hover:text-ivory transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4 text-teal" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory mb-4">Structure</h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate hover:text-ivory transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-teal" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-slate hover:text-champagne transition-colors inline-flex items-center gap-1 group"
                >
                  <Shield className="w-3 h-3 text-champagne" />
                  <span>Admin CRM</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Disciplines */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory mb-4">Disciplines</h4>
            <ul className="space-y-2.5 text-sm">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services#${svc.slug}`}
                    className="text-slate hover:text-ivory transition-colors line-clamp-1"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Office & Direct Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory mb-4">Direct Contact</h4>
            <div className="space-y-3 text-sm text-slate">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <a href={`mailto:${siteSettingsData.email}`} className="hover:text-ivory transition-colors break-all">
                  {siteSettingsData.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <a href={`tel:${siteSettingsData.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-ivory transition-colors">
                  {siteSettingsData.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                <span>{siteSettingsData.address}</span>
              </div>
              <div className="pt-2 text-xs text-slate-muted">
                {siteSettingsData.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="pt-8 border-t border-ink-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate">
          <p>© {new Date().getFullYear()} Kairos Flow Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-ivory transition-colors">
              Project Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-ivory transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
