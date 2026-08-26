'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { publicApi } from '@/services/api';
import { SectionHero } from '@/components/public/SectionHero';
import { GalleryLightbox } from '@/components/public/GalleryLightbox';
import { GlowButton } from '@/components/animations/InteractiveElements';
import { StaggerChildren, StaggerItem } from '@/components/animations/MotionPrimitives';
import { TiltFrame } from '@/components/animations/InteractiveElements';
import { getImageUrl } from '@/lib/utils';
import type { GalleryCategory, GalleryImage, Page } from '@/types';

export default function GalleryPage() {
  const [page, setPage] = useState<Page | null>(null);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      publicApi.getPage('gallery').catch(() => null),
      publicApi.getGalleryCategories(),
      publicApi.getGalleryImages(),
    ]).then(([p, cats, imgs]) => {
      setPage(p);
      setCategories(cats);
      setImages(imgs);
    });
  }, []);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');
  const filtered = activeCategory === 'all' ? images : images.filter((img) => {
    const catId = typeof img.categoryId === 'object' ? img.categoryId._id : img.categoryId;
    return catId === activeCategory;
  });

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Collection'}
        heading={hero?.heading || 'The Gallery'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-12 sm:py-16 bg-gallery-black border-b border-warm-gray/10 overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 className="font-display text-2xl text-warm-cream text-center mb-8">Browse Collections</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categories.map((cat) => (
              <Link key={cat._id} href={`/gallery/${cat.slug}`} className="group relative aspect-[4/5] overflow-hidden border border-warm-gray/10 hover:border-artist-crimson/40 transition-all" data-cursor>
                {cat.coverImage ? (
                  <Image src={getImageUrl(cat.coverImage)} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-deep-oxblood/40 to-soft-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gallery-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg text-warm-cream group-hover:text-aged-gold transition-colors">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8 justify-center max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 text-sm tracking-wider uppercase transition-all ${activeCategory === 'all' ? 'bg-artist-crimson text-warm-cream' : 'text-muted-beige hover:text-warm-cream border border-warm-gray/20'}`}
            >
              All Artwork
            </button>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/gallery/${cat.slug}`}
                className={`px-5 py-2 text-sm tracking-wider uppercase transition-all ${activeCategory === cat._id ? 'bg-artist-crimson text-warm-cream' : 'text-muted-beige hover:text-warm-cream border border-warm-gray/20'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <StaggerChildren className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((img, i) => (
              <StaggerItem key={img._id}>
                <button onClick={() => setLightboxIndex(i)} className="gallery-frame block w-full break-inside-avoid group" data-cursor>
                  <TiltFrame>
                    <div className="gallery-frame-inner relative">
                      <Image src={getImageUrl(img.imageUrl)} alt={img.altText || img.title} width={400} height={500} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  </TiltFrame>
                  <p className="text-warm-cream text-sm mt-3 text-left font-display">{img.title}</p>
                </button>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {filtered.length === 0 && (
            <p className="text-center text-muted-beige py-12">No images in this category yet.</p>
          )}
        </div>
      </section>

      <section className="py-32 bg-deep-oxblood text-center relative overflow-hidden">
        <div className="absolute inset-0 spotlight" />
        <GlowButton href="https://www.artpal.com/sukh2">Visit ArtPal Collection</GlowButton>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filtered}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
