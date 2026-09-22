'use client';

import { Suspense } from 'react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';

interface SectionPageShellProps {
  children: React.ReactNode;
  showRose?: boolean;
}

export function SectionPageShell({ children, showRose = true }: SectionPageShellProps) {
  return (
    <div className="bg-page-silver text-gallery-black min-h-[50vh]">
      <div className="max-w-[1056px] mx-auto px-4 sm:px-5 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(168px,200px)_1fr] gap-6 lg:gap-8 items-start">
          <aside className="lg:sticky lg:top-24">
            <p className="text-[10px] tracking-[0.2em] uppercase text-artist-crimson font-semibold mb-3 hidden lg:block">
              Navigation
            </p>
            <Suspense fallback={null}>
              <SiteSectionNav orientation="vertical" />
            </Suspense>
          </aside>
          <div className="min-w-0 prose-content-bold">{children}</div>
        </div>
      </div>
      {showRose && <RoseThemeClose />}
    </div>
  );
}
