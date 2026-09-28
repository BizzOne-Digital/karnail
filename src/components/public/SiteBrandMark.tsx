'use client';

import Link from 'next/link';
import { BRAND_LOGO } from '@/lib/brand';

/** Centered burgundy logo for home — below the About write-up */
export function SiteBrandMark() {
  return (
    <Link href="/" className="home-brand-mark mx-auto block w-fit max-w-full">
      <div className="home-brand-mark__frame bg-[#090807] px-2.5 py-1.5 border border-black/30">
        <img
          src={BRAND_LOGO}
          alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
          decoding="async"
          className="home-brand-mark__img"
        />
      </div>
    </Link>
  );
}
