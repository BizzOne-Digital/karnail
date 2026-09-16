'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionHero } from '@/components/public/SectionHero';
import { GalleryLightbox } from '@/components/public/GalleryLightbox';
import { GlowButton } from '@/components/animations/InteractiveElements';
import { StaggerChildren, StaggerItem } from '@/components/animations/MotionPrimitives';
import { TiltFrame } from '@/components/animations/InteractiveElements';
import { getImageUrl } from '@/lib/utils';
import type { GalleryImage, Page } from '@/types';

interface GalleryPageClientProps {
  page: Page | null;
  images: GalleryImage[];
}

export default function GalleryPageClient({ page, images }: GalleryPageClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Collection'}
        heading={hero?.heading || 'The Gallery'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-12 sm:py-16 bg-light-canvas text-gallery-black overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <p className="text-center text-gallery-black/70 mb-10">
            {images.length} artworks in the collection
          </p>

          <StaggerChildren className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, i) => (
              <StaggerItem key={img._id}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="gallery-frame block w-full break-inside-avoid group"
                  data-cursor
                >
                  <TiltFrame>
                    <div className="gallery-frame-inner relative aspect-[4/5]">
                      <Image
                        src={getImageUrl(img.imageUrl)}
                        alt={img.altText || img.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </TiltFrame>
                  {img.title && (
                    <p className="text-deep-oxblood text-sm mt-3 text-left font-display">{img.title}</p>
                  )}
                </button>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {images.length === 0 && (
            <p className="text-center text-muted-beige py-12">No artwork found in the gallery folder yet.</p>
          )}
        </div>
      </section>

      <section className="py-32 bg-deep-oxblood text-center relative overflow-hidden">
        <div className="absolute inset-0 spotlight" />
        <GlowButton href="https://www.artpal.com/sukh2">Visit ArtPal Collection</GlowButton>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}
