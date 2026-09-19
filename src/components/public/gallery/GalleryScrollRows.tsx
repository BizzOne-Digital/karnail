'use client';

import Image from 'next/image';
import { HorizontalScrollSection } from '@/components/animations/ScrollEffects';
import { getImageUrl } from '@/lib/utils';
import type { GalleryDiskCollection } from '@/lib/load-gallery-images';

interface GalleryScrollRowsProps {
  collections: GalleryDiskCollection[];
  onImageClick?: (collectionIndex: number, imageIndex: number) => void;
}

export function GalleryScrollRows({ collections, onImageClick }: GalleryScrollRowsProps) {
  if (!collections.length) return null;

  return (
    <section className="py-12 sm:py-16 bg-light-canvas overflow-hidden w-full max-w-full text-gallery-black">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-3">Art Collections</p>
        <h2 className="font-display text-3xl sm:text-4xl text-deep-oxblood">Four Galleries</h2>
        <p className="text-gallery-black/70 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Scroll horizontally through each gallery — laid out as in the original photo collections.
        </p>
      </div>

      <div className="space-y-12 sm:space-y-16">
        {collections.map((collection, collectionIndex) => (
          <div key={collection.id}>
            <div className="max-w-7xl mx-auto px-4 mb-4 sm:mb-6">
              <h3 className="font-display text-2xl sm:text-3xl text-deep-oxblood">{collection.title}</h3>
            </div>

            <HorizontalScrollSection className="py-2">
              {collection.images.map((img, imageIndex) => (
                <button
                  key={img._id}
                  type="button"
                  onClick={() => onImageClick?.(collectionIndex, imageIndex)}
                  className="gallery-frame w-52 sm:w-60 md:w-72 lg:w-80 flex-shrink-0 snap-center block group text-left"
                  data-cursor
                >
                  <div className="gallery-frame-inner aspect-[3/4] relative overflow-hidden border border-warm-gray/25 bg-warm-cream">
                    <Image
                      src={getImageUrl(img.imageUrl)}
                      alt={img.altText || img.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="320px"
                    />
                  </div>
                  {img.title && (
                    <p className="text-deep-oxblood text-sm mt-3 font-display line-clamp-2">{img.title}</p>
                  )}
                </button>
              ))}
            </HorizontalScrollSection>
          </div>
        ))}
      </div>
    </section>
  );
}
