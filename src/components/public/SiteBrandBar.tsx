'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';

interface SiteBrandBarProps {
  variant?: 'header' | 'footer';
}

export function SiteBrandBar({ variant = 'header' }: SiteBrandBarProps) {
  const isFooter = variant === 'footer';

  return (
    <div className="bg-[#090807] border-b border-aged-gold/25 px-3 sm:px-4 py-2 sm:py-2.5">
      <div className="flex items-center justify-between gap-4 max-w-full">
        <Link href="/" className="block min-w-0 flex-1">
          <Image
            src={getImageUrl(BRAND_LOGO)}
            alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
            width={520}
            height={72}
            priority={!isFooter}
            className="h-9 sm:h-11 md:h-12 w-auto max-w-full object-contain object-left"
          />
        </Link>
        {isFooter && (
          <Link
            href="/contact"
            className="shrink-0 border border-aged-gold/70 text-warm-cream px-4 sm:px-6 py-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold hover:bg-aged-gold/10 transition-colors"
          >
            Contact
          </Link>
        )}
      </div>
    </div>
  );
}
