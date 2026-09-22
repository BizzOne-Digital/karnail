'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';

export function HomeBrandBar() {
  return (
    <div className="bg-page-silver border-b border-warm-gray/20 py-4 sm:py-5">
      <Link href="/" className="flex justify-center" aria-label="Sukh D. H. Khokhar">
        <div className="relative h-12 sm:h-14 w-[11rem] sm:w-[12.5rem]">
          <Image
            src={getImageUrl(BRAND_LOGO)}
            alt="Sukh D. H. Khokhar"
            width={300}
            height={80}
            priority
            className="h-full w-auto max-w-none object-contain mx-auto"
          />
        </div>
      </Link>
    </div>
  );
}
