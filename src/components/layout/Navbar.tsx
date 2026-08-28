'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { navLinks, siteSettingsData } from '@/data/settings';
import { generateWhatsAppLink } from '@/lib/utils';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Hide public navbar completely inside the private Admin CRM
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ink/90 backdrop-blur-md border-b border-ink-border/80 shadow-card-dark py-3.5'
            : 'bg-ink/70 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-teal/40 rounded-sm">
              <Logo size={34} variant="full" theme="dark" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 rounded-md ${
                      isActive
                        ? 'text-ivory bg-white/5'
                        : 'text-slate-light hover:text-ivory hover:bg-white/[0.03]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-teal rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Quick Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-light hover:text-ivory bg-navy/40 hover:bg-navy border border-navy-border rounded-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-teal" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              {/* Start a Project Primary CTA */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover border border-teal-border rounded-md shadow-sm transition-all duration-200 hover:shadow-glow-teal"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/contact"
                className="px-3 py-1.5 text-xs font-semibold text-ivory bg-teal rounded-md"
              >
                Start
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-light hover:text-ivory bg-white/5 hover:bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl transition-all duration-300 sm:hidden flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-semibold tracking-widest text-slate uppercase mb-2">Navigation</div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-ivory bg-white/10 border-l-2 border-teal'
                    : 'text-slate-light hover:text-ivory hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal" />}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-ink-border">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-ivory bg-navy border border-navy-border rounded-lg"
          >
            <MessageCircle className="w-4 h-4 text-teal" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-ivory bg-teal rounded-lg shadow-sm"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="text-center text-xs text-slate pt-3">
            <span>{siteSettingsData.agencyName}</span>
          </div>
        </div>
      </div>
    </>
  );
};
