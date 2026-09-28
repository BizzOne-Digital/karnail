'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';

/** Centered burgundy logo for home — below the About write-up */
export function SiteBrandMark() {
  return (
    <Link href="/" className="inline-flex flex-col items-center text-center max-w-full px-2">
      <Image
        src={getImageUrl(BRAND_LOGO)}
        alt="Sukh D. H. Khokhar"
        width={520}
        height={72}
        className="brand-logo-burgundy h-12 sm:h-14 md:h-16 w-auto max-w-[min(100%,420px)] object-contain object-center"
      />
      <p className="mt-1.5 font-display text-[9px] sm:text-[10px] md:text-xs tracking-[0.22em] uppercase text-deep-oxblood font-extrabold leading-snug">
        Mystery Writer <span className="text-artist-crimson font-black">•</span> Mural Artist
      </p>
    </Link>
  );
}
