import GalleryPageClient from './GalleryPageClient';
import { loadGalleryImagesFromDisk } from '@/lib/load-gallery-images';
import { serverPublicApi } from '@/services/server-public-api';

export default async function GalleryPage() {
  const page = await serverPublicApi.getPage('gallery').catch(() => null);
  const images = loadGalleryImagesFromDisk();

  return <GalleryPageClient page={page} images={images} />;
}
