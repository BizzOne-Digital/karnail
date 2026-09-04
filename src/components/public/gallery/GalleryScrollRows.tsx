'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HorizontalScrollSection } from '@/components/animations/ScrollEffects';
import { getImageUrl } from '@/lib/utils';
import { SCROLL_GALLERY_SLUGS } from '@/lib/about-content';
import type { GalleryCategory, GalleryImage } from '@/types';

interface GalleryScrollRowsProps {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

export function GalleryScrollRows({ categories, images }: GalleryScrollRowsProps) {
  const scrollCategories = SCROLL_GALLERY_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter(
    Boolean
  ) as GalleryCategory[];

  const displayCategories =
    scrollCategories.length >= 4
      ? scrollCategories.slice(0, 4)
      : categories.slice(0, 4);

  if (!displayCategories.length) return null;

  return (
    <section className="py-12 sm:py-20 bg-soft-black overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-3">Collections</p>
        <h2 className="font-display text-3xl sm:text-4xl text-warm-cream">Four Galleries</h2>
        <p className="text-muted-beige mt-3 max-w-2xl mx-auto">
          Scroll through curated collections of mystical paintings, originals, murals, and commissioned work.
        </p>
      </div>

      <div className="space-y-14 sm:space-y-20">
        {displayCategories.map((cat) => {
          const catImages = images.filter((img) => {
            const catId = typeof img.categoryId === 'object' ? img.categoryId._id : img.categoryId;
            return catId === cat._id || (typeof img.categoryId === 'object' && img.categoryId.slug === cat.slug);
          });

          if (!catImages.length) return null;

          return (
            <div key={cat._id}>
              <div className="max-w-7xl mx-auto px-4 flex items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-warm-cream">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-muted-beige text-sm mt-1 max-w-xl">{cat.description}</p>
                  )}
                </div>
                <Link
                  href={`/gallery/${cat.slug}`}
                  className="text-aged-gold text-xs tracking-widest uppercase hover:text-warm-cream transition-colors shrink-0 hidden sm:inline"
                >
                  View All →
                </Link>
              </div>

              <HorizontalScrollSection className="py-2">
                {catImages.map((img) => (
                  <Link
                    key={img._id}
                    href={`/gallery/${cat.slug}`}
                    className="gallery-frame w-56 sm:w-64 md:w-72 lg:w-80 flex-shrink-0 snap-center block group"
                    data-cursor
                  >
                    <div className="gallery-frame-inner aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={getImageUrl(img.imageUrl)}
                        alt={img.altText || img.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="320px"
                      />
                    </div>
                    <p className="text-warm-cream text-sm mt-3 font-display group-hover:text-aged-gold transition-colors">
                      {img.title}
                    </p>
                  </Link>
                ))}
              </HorizontalScrollSection>
            </div>
          );
        })}
      </div>
    </section>
  );
}
