'use client';

import { Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';
import { SiteBrandMark } from '@/components/public/SiteBrandMark';
import { cn } from '@/lib/utils';

export function HomeSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="home-sidebar-pane text-warm-cream lg:min-h-full">
      <SiteBrandMark variant="sidebar" />

      <button
        type="button"
        className="lg:hidden w-full flex items-center justify-between px-2 py-2.5 text-[10px] uppercase tracking-[0.12em] font-bold border-b border-warm-cream/15"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Menu
        <ChevronDown size={16} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      <div className={cn('px-1.5 py-2', !open && 'hidden lg:block')}>
        <p className="sidebar-nav-heading hidden lg:block">Navigate Here</p>
        <Suspense fallback={null}>
          <SiteSectionNav orientation="vertical" variant="sidebar" />
        </Suspense>
      </div>
    </aside>
  );
}
