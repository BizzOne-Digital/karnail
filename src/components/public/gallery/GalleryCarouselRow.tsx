'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import type { GalleryImage } from '@/types';

interface GalleryCarouselRowProps {
  images: GalleryImage[];
  onImageClick?: (imageIndex: number) => void;
}

const arrowBtnClass =
  'z-20 flex shrink-0 w-10 h-10 sm:w-11 sm:h-11 items-center justify-center rounded-full border border-warm-gray/35 bg-warm-cream/95 text-deep-oxblood hover:border-artist-crimson hover:text-artist-crimson transition-colors shadow-md';

export function GalleryCarouselRow({ images, onImageClick }: GalleryCarouselRowProps) {
  const [active, setActive] = useState(0);
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (!count) return;
      setActive((i) => (i + delta + count) % count);
    },
    [count]
  );

  if (!count) return null;

  const prevIndex = (active - 1 + count) % count;
  const nextIndex = (active + 1) % count;
  const slots = count === 1 ? [active] : count === 2 ? [prevIndex, active] : [prevIndex, active, nextIndex];

  return (
    <div className="relative w-full max-w-full mx-auto px-1 sm:px-2 lg:px-3">
      <div
        className={cn(
          'flex min-h-[220px] sm:min-h-[340px] md:min-h-[400px] w-full max-w-full',
          count > 1 ? 'items-center justify-between' : 'items-center justify-center'
        )}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            className={cn(
              arrowBtnClass,
              'hidden sm:flex self-center shrink-0 -translate-y-4 sm:-translate-x-2 md:-translate-x-4 sm:mr-3 md:mr-5'
            )}
            aria-label="Previous artwork"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div
          className={cn(
            'flex items-center justify-center gap-2 sm:gap-4 md:gap-6 min-w-0 max-w-[min(100%,980px)]',
            count > 1 && 'mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          )}
        >
          {slots.map((imageIndex, slot) => {
            const img = images[imageIndex];
            const isCenter = imageIndex === active;

            return (
              <button
                key={`${img.imageUrl}-${slot}`}
                type="button"
                onClick={() => {
                  if (isCenter) onImageClick?.(imageIndex);
                  else setActive(imageIndex);
                }}
                className={cn(
                  'relative flex-shrink-0 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-artist-crimson/50 rounded-sm',
                  isCenter
                    ? 'w-[min(92vw,380px)] sm:w-[min(48vw,430px)] md:w-[455px] z-10'
                    : 'w-[min(23vw,108px)] sm:w-[min(18vw,144px)] md:w-[162px] opacity-80 hidden sm:block',
                  count === 2 && !isCenter && 'sm:block'
                )}
                data-cursor
                aria-label={isCenter ? `View ${img.title}` : `Show ${img.title}`}
              >
                <div
                  className={cn(
                    'gallery-carousel-cell relative overflow-hidden border border-warm-gray/25 bg-warm-cream shadow-md transition-all duration-500 aspect-[3/4]',
                    isCenter
                      ? 'border-warm-gray/30 shadow-lg scale-100'
                      : 'border-warm-gray/20 grayscale-[0.85] brightness-[0.72] scale-[0.92]'
                  )}
                >
                  <Image
                    src={getImageUrl(img.imageUrl)}
                    alt={img.altText || img.title}
                    fill
                    unoptimized
                    className={cn(
                      'object-cover object-center transition-transform duration-700',
                      isCenter && 'hover:scale-[1.02]'
                    )}
                    sizes={isCenter ? '455px' : '162px'}
                  />
                </div>
                {isCenter && img.title && (
                  <p className="text-deep-oxblood text-sm mt-3 font-display text-center line-clamp-2 px-1">
                    {img.title}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            className={cn(
              arrowBtnClass,
              'hidden sm:flex self-center shrink-0 -translate-y-4 sm:translate-x-2 md:translate-x-4 sm:ml-3 md:ml-5'
            )}
            aria-label="Next artwork"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex sm:hidden justify-center gap-4 mt-4">
          <button type="button" onClick={() => go(-1)} className={arrowBtnClass} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gallery-black/60 self-center font-body">
            {active + 1} / {count}
          </span>
          <button type="button" onClick={() => go(1)} className={arrowBtnClass} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
