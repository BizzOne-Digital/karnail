import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { publicApi } from '@/services/api';
import { SectionHero } from '@/components/public/SectionHero';
import { GalleryLightbox } from '@/components/public/GalleryLightbox';
import { getImageUrl } from '@/lib/utils';
import GalleryCategoryClient from './GalleryCategoryClient';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { category } = await params;
    const cat = await publicApi.getGalleryCategory(category);
    return { title: `${cat.name} | Gallery`, description: cat.description };
  } catch {
    return { title: 'Gallery Category' };
  }
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  let cat;
  try {
    cat = await publicApi.getGalleryCategory(slug);
  } catch {
    notFound();
  }

  const allImages = await publicApi.getGalleryImages().catch(() => []);
  const images = allImages.filter((img) => {
    const catId = typeof img.categoryId === 'object' ? img.categoryId._id : img.categoryId;
    return catId === cat._id;
  });

  return (
    <>
      <SectionHero
        eyebrow="Gallery Collection"
        heading={cat.name}
        description={cat.description}
        backgroundImage={cat.coverImage}
      />

      <section className="py-8 bg-gallery-black border-b border-warm-gray/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          <Link href="/gallery" className="px-4 py-2 text-sm text-muted-beige hover:text-warm-cream border border-warm-gray/20 hover:border-artist-crimson/30 transition-colors">
            All Collections
          </Link>
        </div>
      </section>

      <GalleryCategoryClient images={images} categoryName={cat.name} />

      <section className="py-24 bg-deep-oxblood text-center">
        <Link href="/contact" className="inline-block bg-warm-cream text-gallery-black px-10 py-4 text-sm tracking-widest uppercase hover:bg-muted-beige transition-colors">
          Enquire About Artwork
        </Link>
      </section>
    </>
  );
}
