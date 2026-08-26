'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { GalleryLightbox } from '@/components/public/GalleryLightbox';
import { StaggerChildren, StaggerItem } from '@/components/animations/MotionPrimitives';
import { TiltFrame } from '@/components/animations/InteractiveElements';
import type { GalleryImage } from '@/types';

export default function GalleryCategoryClient({
  images,
  categoryName,
}: {
  images: GalleryImage[];
  categoryName: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gallery-black">
      <div className="max-w-7xl mx-auto px-4">
        {images.length === 0 ? (
          <p className="text-center text-muted-beige py-20">No images in {categoryName} yet.</p>
        ) : (
          <StaggerChildren className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, i) => (
              <StaggerItem key={img._id}>
                <button onClick={() => setLightboxIndex(i)} className="gallery-frame block w-full break-inside-avoid group" data-cursor>
                  <TiltFrame>
                    <div className="gallery-frame-inner relative">
                      <Image
                        src={getImageUrl(img.imageUrl)}
                        alt={img.altText || img.title}
                        width={400}
                        height={500}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </TiltFrame>
                  <p className="text-warm-cream text-sm mt-3 text-left font-display">{img.title}</p>
                </button>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  );
}
