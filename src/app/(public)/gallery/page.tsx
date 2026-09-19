import GalleryPageClient from './GalleryPageClient';
import { loadGalleryCollectionsFromDisk, loadGalleryImagesFromDisk } from '@/lib/load-gallery-images';

export default async function GalleryPage() {
  const collections = loadGalleryCollectionsFromDisk();
  const images = loadGalleryImagesFromDisk();

  return <GalleryPageClient collections={collections} allImages={images} />;
}
