'use client';

import { useMemo, useState } from 'react';
import { GalleryScrollRows } from '@/components/public/gallery/GalleryScrollRows';
import { GalleryLightbox } from '@/components/public/GalleryLightbox';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { GlowButton } from '@/components/animations/InteractiveElements';
import type { GalleryDiskCollection } from '@/lib/load-gallery-images';
import type { GalleryImage } from '@/types';

interface GalleryPageClientProps {
  collections: GalleryDiskCollection[];
  allImages: GalleryImage[];
}

export default function GalleryPageClient({ collections, allImages }: GalleryPageClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const flatFromCollections = useMemo(
    () => collections.flatMap((c) => c.images),
    [collections]
  );

  const lightboxImages = flatFromCollections.length ? flatFromCollections : allImages;

  const openAt = (collectionIndex: number, imageIndex: number) => {
    let offset = 0;
    for (let i = 0; i < collectionIndex; i++) {
      offset += collections[i]?.images.length ?? 0;
    }
    setLightboxIndex(offset + imageIndex);
  };

  return (
    <>
      <section className="bg-light-canvas pt-28 sm:pt-32 pb-8 text-center px-4">
        <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-3">Collection</p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-deep-oxblood">The Gallery</h1>
        <p className="text-gallery-black/75 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          Mystical paintings, originals, murals, and commissioned work — four scrollable galleries.
        </p>
      </section>

      <GalleryScrollRows collections={collections} onImageClick={openAt} />

      <section className="py-12 bg-light-canvas text-center border-t border-warm-gray/20">
        <GlowButton href="https://www.artpal.com/sukh2">Visit ArtPal Collection</GlowButton>
      </section>

      <RoseThemeClose />

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
