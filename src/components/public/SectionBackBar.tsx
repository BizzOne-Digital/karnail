'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/** Non-home pages: return to homepage (full nav lives on home only). */
export function SectionBackBar() {
  return (
    <div
      className="section-back-bar sticky top-0 z-30 border-b border-warm-gray/25 bg-page-silver/95 backdrop-blur-sm"
    >
      <div className="site-content-width mx-auto px-3 sm:px-4 py-2.5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-artist-crimson hover:text-deep-oxblood transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} aria-hidden />
          Back
        </Link>
      </div>
    </div>
  );
}
