import GalleryPageClient from './GalleryPageClient';
import { ALL_GALLERY_IMAGES } from '@/lib/gallery-images';
import { serverPublicApi } from '@/services/server-public-api';
import type { GalleryCategory, GalleryImage } from '@/types';

export default async function GalleryPage() {
  const [page, categories, apiImages] = await Promise.all([
    serverPublicApi.getPage('gallery').catch(() => null),
    serverPublicApi.getGalleryCategories().catch(() => [] as GalleryCategory[]),
    serverPublicApi.getGalleryImages().catch(() => [] as GalleryImage[]),
  ]);

  const images = apiImages.length > 0 ? apiImages : ALL_GALLERY_IMAGES;

  return <GalleryPageClient page={page} categories={categories} images={images} />;
}
