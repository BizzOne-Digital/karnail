'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GalleryCarouselRow } from '@/components/public/gallery/GalleryCarouselRow';
import { GalleryLightbox } from '@/components/public/GalleryLightbox';
import { SectionPageShell } from '@/components/public/SectionPageShell';
import { GlowButton } from '@/components/animations/InteractiveElements';
import type { GalleryDiskCollection } from '@/lib/load-gallery-images';
import type { GalleryImage } from '@/types';

interface GalleryPageClientProps {
  collections: GalleryDiskCollection[];
  allImages: GalleryImage[];
}

function GalleryBody({ collections, allImages }: GalleryPageClientProps) {
  const searchParams = useSearchParams();
  const gParam = searchParams.get('g');
  const galleryNum = Math.min(4, Math.max(1, parseInt(gParam || '1', 10) || 1));

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCollection = collections.find((c) => c.id === `gallery-${galleryNum}`) ?? collections[0];

  const flatFromCollections = useMemo(
    () => collections.flatMap((c) => c.images),
    [collections]
  );

  const lightboxImages = flatFromCollections.length ? flatFromCollections : allImages;

  const openAt = (imageIndex: number) => {
    if (!activeCollection) return;
    let offset = 0;
    for (const c of collections) {
      if (c.id === activeCollection.id) break;
      offset += c.images.length;
    }
    setLightboxIndex(offset + imageIndex);
  };

  if (!activeCollection?.images.length) {
    return (
      <p className="text-center text-gallery-black/70 py-12 font-medium">Gallery images are loading…</p>
    );
  }

  return (
    <>
      <header className="text-center mb-6 sm:mb-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-semibold mb-2">Art Collections</p>
        <h1 className="font-display text-2xl sm:text-3xl text-deep-oxblood font-semibold">{activeCollection.title}</h1>
        <p className="text-gallery-black/75 mt-2 text-sm font-medium">
          {activeCollection.images.length} paintings — use arrows to browse three at a time.
        </p>
      </header>

      <GalleryCarouselRow images={activeCollection.images} onImageClick={openAt} />

      <div className="text-center mt-10">
        <GlowButton href="https://www.artpal.com/sukh2">Visit ArtPal Collection</GlowButton>
      </div>

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

export default function GalleryPageClient(props: GalleryPageClientProps) {
  return (
    <SectionPageShell showRose>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <GalleryBody {...props} />
      </Suspense>
    </SectionPageShell>
  );
}
