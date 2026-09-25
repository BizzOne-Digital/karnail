'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/contact-info';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';
import { cn } from '@/lib/utils';

export function HomeSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="home-sidebar-pane text-warm-cream lg:min-h-full">
      <div className="px-1.5 py-2 border-b border-warm-cream/15">
        <Link
          href="/contact"
          className="block text-center py-2.5 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-bold bg-aged-gold/90 text-deep-oxblood hover:bg-[#e8c547] transition-colors min-h-[44px] flex items-center justify-center"
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
        <Suspense fallback={null}>
          <SiteSectionNav orientation="vertical" variant="sidebar" />
        </Suspense>
      </div>

      <div className="px-2 py-3 mt-auto text-[10px] sm:text-[11px] leading-relaxed text-warm-cream/95 border-t border-warm-cream/15 font-semibold space-y-1 break-all sm:break-normal">
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-aged-gold transition-colors">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          <a href="https://www.mysteryoftherose.com" target="_blank" rel="noopener noreferrer" className="hover:text-aged-gold transition-colors">
            www.mysteryoftherose.com
          </a>
        </p>
        <p>
          <a href="https://www.artpal.com/sukh2" target="_blank" rel="noopener noreferrer" className="hover:text-aged-gold transition-colors">
            www.artpal.com/sukh2
          </a>
        </p>
      </div>
    </aside>
  );
}
