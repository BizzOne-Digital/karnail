'use client';

import Link from 'next/link';
import { BRAND_LOGO } from '@/lib/brand';

/** Centered burgundy logo for home — below the About write-up (SS2 asset) */
export function SiteBrandMark() {
  return (
    <Link href="/" className="inline-block max-w-full px-2">
      <div className="bg-[#090807] px-3 sm:px-5 py-2.5 border border-black/40">
        {/* Native img — reliable on Vercel for static /logo-burgundy.jpg */}
        <img
          src={BRAND_LOGO}
          alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
          width={640}
          height={120}
          decoding="async"
          className="block h-14 sm:h-16 md:h-[4.5rem] w-auto max-w-[min(100%,520px)] object-contain object-center mx-auto"
        />
      </div>
    </Link>
  );
}
