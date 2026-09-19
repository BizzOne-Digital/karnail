'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl, getAvailabilityLabel } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { GalleryImage } from '@/types';

interface LightboxProps {
  images: GalleryImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function GalleryLightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const image = images[current];

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] bg-gallery-black/95 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-warm-cream z-10" aria-label="Close">
          <X size={28} />
        </button>

        <div className="max-w-6xl w-full mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="gallery-frame">
            <div className="gallery-frame-inner aspect-[4/3] relative">
              <Image
                src={getImageUrl(image.imageUrl)}
                alt={image.altText || image.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-warm-cream">
            <h2 className="font-display text-3xl mb-2">{image.title}</h2>
            {image.medium && <p className="text-muted-beige text-sm mb-1">{image.medium}</p>}
            {image.dimensions && <p className="text-warm-gray text-sm mb-1">{image.dimensions}</p>}
            {image.year && <p className="text-warm-gray text-sm mb-4">{image.year}</p>}
            {image.description && <p className="text-muted-beige leading-relaxed mb-6">{image.description}</p>}
            <p className="text-aged-gold text-sm mb-6">{getAvailabilityLabel(image.availability)}</p>
            <Button href="/contact" variant="primary">
              Enquire About This Piece
            </Button>
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-artist-crimson' : 'bg-warm-gray'}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
