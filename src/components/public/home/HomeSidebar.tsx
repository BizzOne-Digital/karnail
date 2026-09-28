'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';
import { cn } from '@/lib/utils';

export function HomeSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="home-sidebar-pane text-warm-cream lg:min-h-full">
      <div className="px-1.5 py-2 border-b border-warm-cream/15">
        <Link
          href="/contact"
          className="block text-center py-2.5 text-[11px] sm:text-xs tracking-[0.16em] uppercase font-extrabold bg-[#e8c547] text-[#2f0f14] hover:bg-[#f0d060] transition-colors min-h-[44px] flex items-center justify-center border border-[#c9a83a]/80"
        >
          Contact
        </Link>
      </div>

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
