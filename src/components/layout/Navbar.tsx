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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#F7F7F4]/95 backdrop-blur-md border-b border-[#D9E0E5] shadow-subtle-card py-3.5'
            : 'bg-[#F7F7F4]/90 backdrop-blur-sm border-b border-[#D9E0E5]/70 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-[#B8613A]/40 rounded-sm">
              <Logo size={36} variant="full" theme="light" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs font-mono tracking-tight transition-all duration-200 rounded-md ${
                      isActive
                        ? 'text-[#B8613A] bg-[#FBF4F0] font-semibold border border-[#D9E0E5]'
                        : 'text-[#111827] hover:text-[#B8613A] hover:bg-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#B8613A] rounded-full" />
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
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-[#111827] hover:text-[#B8613A] bg-white hover:bg-[#FBF4F0] border border-[#D9E0E5] rounded-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              {/* Start a Project Primary CTA: Deep Navy #0B1F33 */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B1F33] hover:bg-[#132B45] border border-[#0B1F33] rounded-md shadow-sm transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#B8613A]" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/contact"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B1F33] rounded-md"
              >
                Start
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#111827] hover:text-[#B8613A] bg-white border border-[#D9E0E5] rounded-md focus:outline-none"
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
        className={`fixed inset-0 z-40 bg-[#F7F7F4]/98 backdrop-blur-xl transition-all duration-300 sm:hidden flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-mono font-semibold tracking-widest text-[#5B6875] uppercase mb-2">/ NAVIGATION</div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between py-3 px-4 text-sm font-mono rounded-lg transition-colors border ${
                  isActive
                    ? 'text-[#B8613A] bg-white border-[#B8613A] font-semibold'
                    : 'text-[#111827] hover:text-[#B8613A] bg-white/60 border-[#D9E0E5]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B8613A]" />}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-[#D9E0E5]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-mono font-medium text-[#0B1F33] bg-white border border-[#D9E0E5] rounded-lg"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#0B1F33] rounded-lg shadow-sm"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 text-[#B8613A]" />
          </Link>

          <div className="text-center text-xs font-mono text-[#5B6875] pt-3">
            <span>{siteSettingsData.agencyName}</span>
          </div>
        </div>
      </div>
    </>
  );
};
