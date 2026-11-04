'use client';

import Link from 'next/link';

/** Non-home pages: return to homepage (full nav lives on home only). */
export function SectionBackBar() {
  return (
    <div
      className="section-back-bar sticky top-0 z-30 border-b border-warm-gray/25 bg-page-silver/95 backdrop-blur-sm"
    >
      <div className="site-content-width mx-auto px-3 sm:px-4 py-2.5">
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-[#f5c518] bg-[#e8192c] px-5 py-1.5 font-sans text-base sm:text-lg font-extrabold uppercase tracking-wide text-[#f5c518] transition-colors hover:bg-[#c8101f]"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
