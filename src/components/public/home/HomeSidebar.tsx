'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';
import { CONTACT_EMAIL } from '@/lib/contact-info';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';

export function HomeSidebar() {
  return (
    <aside className="home-sidebar-pane text-warm-cream lg:min-h-full">
      <Link href="/" className="brand-logo-bar block px-2 py-3 sm:py-3.5" aria-label="Sukh D. H. Khokhar">
        <Image
          src={getImageUrl(BRAND_LOGO)}
          alt="Sukh D. H. Khokhar"
          width={420}
          height={88}
          priority
          className="h-10 sm:h-11 w-full max-w-[220px] mx-auto object-contain object-center"
        />
      </Link>

      <div className="px-2 py-3 sm:py-4">
        <Suspense fallback={null}>
          <SiteSectionNav orientation="vertical" variant="sidebar" />
        </Suspense>
      </div>

      <div className="px-3 py-4 mt-auto text-[10px] sm:text-[11px] leading-relaxed text-warm-cream/90 border-t border-warm-cream/15 font-medium space-y-1">
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
