import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-ink text-ivory min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-md mx-auto text-center">
        <Logo size={44} variant="mark" theme="dark" className="mb-8 mx-auto" />
        <div className="text-xs font-mono uppercase tracking-widest text-champagne mb-3">
          Error 404 • Page Not Found
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ivory font-display mb-4">
          Lost in the digital flow.
        </h1>
        <p className="text-slate-light text-sm leading-relaxed mb-8">
          The page you are looking for has been relocated, archived, or does not exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-ivory bg-teal hover:bg-teal-hover rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-slate-light hover:text-ivory bg-navy border border-navy-border rounded-lg transition-colors"
          >
            <span>Explore Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
