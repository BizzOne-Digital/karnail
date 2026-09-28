'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BRAND_LOGO } from '@/lib/brand';

/** Centered burgundy logo for home — below the About write-up */
export function SiteBrandMark() {
  return (
    <Link href="/" className="inline-block max-w-full px-2">
      <div className="bg-[#090807] px-3 sm:px-5 py-2.5 border border-black/40">
        <Image
          src={BRAND_LOGO}
          alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
          width={640}
          height={120}
          unoptimized
          className="h-14 sm:h-16 md:h-[4.5rem] w-auto max-w-[min(100%,520px)] object-contain object-center mx-auto"
        />
      </div>
    </Link>
  );
}
