'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, MessageCircle, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';

export const MobileConversionBar: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when scrolled past 220px
      setIsVisible(window.scrollY > 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Never display inside admin
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#0B1F33]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] animate-in slide-in-from-bottom-full duration-300">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 font-mono">
        {/* 1. Scope Estimator CTA */}
        <Link
          href="/#cost-estimator"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all text-center"
        >
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#F7F7F4]">
            <Calculator className="w-3.5 h-3.5 text-[#B8613A]" />
            <span>Estimator</span>
          </div>
          <span className="text-[9px] text-slate-300">Scope & Cost</span>
        </Link>

        {/* 2. Direct WhatsApp Founder */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm transition-all text-center"
        >
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>WhatsApp</span>
          </div>
          <span className="text-[9px] text-white/90">Founder Direct</span>
        </a>

        {/* 3. Start a Project */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#B8613A] hover:bg-[#a25330] text-white shadow-sm transition-all text-center"
        >
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <span>Start</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] text-white/90">Book Sprint</span>
        </Link>
      </div>
    </div>
  );
};
