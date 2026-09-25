'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import type { GalleryImage } from '@/types';

interface GalleryCarouselRowProps {
  images: GalleryImage[];
  onImageClick?: (imageIndex: number) => void;
  /** Gallery 1 uses cover; 2–4 show full artwork */
  showFullImage?: boolean;
}

export function GalleryCarouselRow({ images, onImageClick, showFullImage = false }: GalleryCarouselRowProps) {
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
    <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4">
      <div className="flex items-center justify-center gap-2 sm:gap-5 md:gap-8 min-h-[220px] sm:min-h-[340px] md:min-h-[400px]">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            className="hidden sm:flex shrink-0 w-11 h-11 items-center justify-center rounded-full border border-warm-gray/35 bg-warm-cream/90 text-deep-oxblood hover:border-artist-crimson hover:text-artist-crimson transition-colors shadow-sm"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-4 md:gap-6 max-w-full">
          {slots.map((imageIndex, slot) => {
            const img = images[imageIndex];
            const isCenter = imageIndex === active;
            const isSide = !isCenter;

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
                    ? 'w-[min(88vw,320px)] sm:w-[min(42vw,360px)] md:w-[380px] z-10'
                    : 'w-[min(28vw,140px)] sm:w-[min(22vw,180px)] md:w-[200px] opacity-80 hidden sm:block',
                  count === 2 && isSide && 'sm:block'
                )}
                data-cursor
                aria-label={isCenter ? `View ${img.title}` : `Show ${img.title}`}
              >
                <div
                  className={cn(
                    'gallery-frame-inner relative overflow-hidden border bg-warm-cream shadow-md transition-all duration-500',
                    isCenter
                      ? showFullImage
                        ? 'min-h-[240px] sm:min-h-[300px] md:min-h-[360px] border-warm-gray/30 shadow-lg scale-100'
                        : 'aspect-[3/4] border-warm-gray/30 shadow-lg scale-100'
                      : showFullImage
                        ? 'min-h-[160px] sm:min-h-[200px] border-warm-gray/20 grayscale-[0.85] brightness-[0.72] scale-[0.92]'
                        : 'aspect-[3/4] border-warm-gray/20 grayscale-[0.85] brightness-[0.72] scale-[0.92]'
                  )}
                >
                  <Image
                    src={getImageUrl(img.imageUrl)}
                    alt={img.altText || img.title}
                    fill
                    unoptimized
                    className={cn(
                      showFullImage ? 'object-contain p-1' : 'object-cover',
                      'transition-transform duration-700',
                      isCenter && !showFullImage && 'hover:scale-[1.02]'
                    )}
                    sizes={isCenter ? '380px' : '200px'}
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
            className="hidden sm:flex shrink-0 w-11 h-11 items-center justify-center rounded-full border border-warm-gray/35 bg-warm-cream/90 text-deep-oxblood hover:border-artist-crimson hover:text-artist-crimson transition-colors shadow-sm"
            aria-label="Next artwork"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex sm:hidden justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-gray/35 bg-warm-cream text-deep-oxblood"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gallery-black/60 self-center font-body">
            {active + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-gray/35 bg-warm-cream text-deep-oxblood"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
