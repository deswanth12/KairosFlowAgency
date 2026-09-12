'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { RefreshCw, ArrowLeft, MessageCircle } from 'lucide-react';
import { siteSettingsData } from '@/data/settings';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error in client component tree:', error);
  }, [error]);

  const whatsappPhone = siteSettingsData.whatsappNumber || '917702256073';

  return (
    <div className="bg-[#0B1F33] text-[#F7F7F4] min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-md mx-auto text-center">
        <Logo size={44} variant="mark" theme="dark" className="mb-8 mx-auto" />
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-4 border border-white/10">
          <span>Application Notice</span>
          {error.digest && (
            <span className="text-slate-400 font-mono text-[10px]">({error.digest})</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
          Something interrupted the flow.
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed mb-8">
          An unexpected runtime state occurred while rendering this view. You can reload the state or return to the main dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#B8613A] hover:bg-[#a25330] rounded-lg transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hi Desvanth, I encountered an issue on the Kairos Flow website.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/40 rounded-lg transition-colors"
            title="Report to Founder"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
