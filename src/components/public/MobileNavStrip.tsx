'use client';

import { Suspense } from 'react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';

/** Sticky horizontal nav for phones — full site sections */
export function MobileNavStrip() {
  return (
    <div className="mobile-nav-strip lg:hidden -mx-1 px-1 py-2">
      <p className="text-[9px] uppercase tracking-[0.14em] text-artist-crimson font-bold mb-1.5 px-0.5">
        Navigate
      </p>
      <Suspense fallback={null}>
        <SiteSectionNav orientation="horizontal" variant="sidebar" className="mobile-nav-strip__scroll" />
      </Suspense>
    </div>
  );
}
