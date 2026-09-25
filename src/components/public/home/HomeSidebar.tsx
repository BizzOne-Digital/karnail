'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact-info';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';

export function HomeSidebar() {
  return (
    <aside className="home-sidebar-pane text-warm-cream lg:min-h-full">
      <div className="px-1.5 py-2 border-b border-warm-cream/15">
        <Link
          href="/contact"
          className="block text-center py-2 text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-bold bg-aged-gold/90 text-deep-oxblood hover:bg-[#e8c547] transition-colors"
        >
          Contact
        </Link>
      </div>

      <div className="px-1.5 py-2">
        <Suspense fallback={null}>
          <SiteSectionNav orientation="vertical" variant="sidebar" />
        </Suspense>
      </div>

      <div className="px-2 py-3 mt-auto text-[9px] sm:text-[10px] leading-relaxed text-warm-cream/95 border-t border-warm-cream/15 font-semibold space-y-1">
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
