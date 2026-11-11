import type { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';
import { loadGalleryCollectionsFromDisk, loadGalleryImagesFromDisk } from '@/lib/load-gallery-images';

export const metadata: Metadata = {
  title: { absolute: 'Paintings & Murals by Sukh Khokhar | Calgary Artist' },
  description:
    'View original paintings and mural work by Calgary artist Sukh D. H. Khokhar, with prints and originals available on ArtPal.',
  alternates: { canonical: '/gallery' },
};

export default async function GalleryPage() {
  const collections = loadGalleryCollectionsFromDisk();
  const images = loadGalleryImagesFromDisk();

  return <GalleryPageClient collections={collections} allImages={images} />;
}
