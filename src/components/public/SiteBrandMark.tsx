'use client';

import Link from 'next/link';
import { BRAND_LOGO } from '@/lib/brand';

/** Centered burgundy logo for home — below the About write-up (SS2 asset) */
export function SiteBrandMark() {
  return (
    <div className="w-full flex justify-center items-center">
      <Link href="/" className="mx-auto shrink-0">
        <div className="bg-[#090807] px-2 sm:px-3 py-1.5 sm:py-2 border border-black/30">
          <img
            src={BRAND_LOGO}
            alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
            width={640}
            height={120}
            decoding="async"
            className="block h-9 sm:h-10 md:h-11 w-auto max-w-[min(100%,300px)] sm:max-w-[340px] object-contain object-center mx-auto"
          />
        </div>
      </Link>
    </div>
  );
}
