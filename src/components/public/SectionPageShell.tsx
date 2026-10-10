'use client';

import { RoseThemeClose } from '@/components/public/RoseThemeClose';

interface SectionPageShellProps {
  children: React.ReactNode;
  showRose?: boolean;
}

/** Inner page layout — single column; back bar + full nav are on home only (see PublicLayoutChrome). */
export function SectionPageShell({ children, showRose = true }: SectionPageShellProps) {
  return (
    <div className="bg-page-silver text-gallery-black">
      <div className="site-content-width mx-auto px-2 sm:px-2.5 py-2 sm:py-3 max-w-full overflow-x-hidden">
        <div className="min-w-0 w-full px-0 sm:px-1 py-1 prose-content-bold prose-mobile-readable">
          {children}
          {showRose && <RoseThemeClose className="mt-2" />}
        </div>
      </div>
    </div>
  );
}
