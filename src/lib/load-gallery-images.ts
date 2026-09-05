import fs from 'fs';
import path from 'path';
import type { GalleryImage } from '@/types';

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, '');
  const withoutIndex = base.replace(/^\d+\s*-?\s*/, '');
  return withoutIndex.replace(/-/g, ' ').replace(/\s+/g, ' ').trim() || base;
}

function encodeGalleryPath(urlPath: string): string {
  return urlPath
    .split('/')
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join('/');
}

function walkGalleryDir(dir: string, urlPrefix: string, results: GalleryImage[]): void {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const urlPath = `${urlPrefix}/${entry.name}`.replace(/\\/g, '/');

    if (entry.isDirectory()) {
      walkGalleryDir(fullPath, urlPath, results);
    } else if (IMAGE_EXT.test(entry.name)) {
      const title = titleFromFilename(entry.name);
      results.push({
        _id: `gallery-${results.length + 1}`,
        categoryId: '',
        title,
        description: '',
        imageUrl: encodeGalleryPath(urlPath),
        altText: title,
        medium: '',
        dimensions: '',
        year: '',
        availability: 'contact',
        isFeatured: results.length < 12,
        isPublished: true,
        displayOrder: results.length,
      });
    }
  }
}

/** Load all artwork images from public/gallery (including subfolders). */
export function loadGalleryImagesFromDisk(): GalleryImage[] {
  const galleryRoot = path.join(process.cwd(), 'public', 'gallery');
  const results: GalleryImage[] = [];
  walkGalleryDir(galleryRoot, '/gallery', results);
  return results.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
}
