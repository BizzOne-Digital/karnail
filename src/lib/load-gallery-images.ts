import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import type { GalleryImage } from '@/types';

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

/** Site banner assets — not artwork rows */
const SKIP_GALLERY_BASENAME = /^banner-website/i;

function shouldSkipGalleryFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  return SKIP_GALLERY_BASENAME.test(filename) || lower.includes('mural art');
}

function fileContentHash(fullPath: string): string {
  return crypto.createHash('md5').update(fs.readFileSync(fullPath)).digest('hex');
}

function galleryIdFromUrl(imageUrl: string): string {
  return `gallery-${crypto.createHash('sha1').update(imageUrl).digest('hex').slice(0, 16)}`;
}

function sortGalleryImages(images: GalleryImage[]): GalleryImage[] {
  return [...images].sort((a, b) => {
    const fa = path.basename(a.imageUrl);
    const fb = path.basename(b.imageUrl);
    return fa.localeCompare(fb, undefined, { numeric: true, sensitivity: 'base' });
  });
}

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

function walkGalleryDir(
  dir: string,
  urlPrefix: string,
  results: GalleryImage[],
  seenContentHashes: Set<string>
): void {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const urlPath = `${urlPrefix}/${entry.name}`.replace(/\\/g, '/');

    if (entry.isDirectory()) {
      walkGalleryDir(fullPath, urlPath, results, seenContentHashes);
    } else if (IMAGE_EXT.test(entry.name) && !shouldSkipGalleryFile(entry.name)) {
      const contentHash = fileContentHash(fullPath);
      if (seenContentHashes.has(contentHash)) continue;
      seenContentHashes.add(contentHash);

      const imageUrl = encodeGalleryPath(urlPath);
      const title = titleFromFilename(entry.name);
      results.push({
        _id: galleryIdFromUrl(imageUrl),
        categoryId: '',
        title,
        description: '',
        imageUrl,
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

/** Flat list of images shown in galleries 1–4 (deduped, no extra upload folders). */
export function loadGalleryImagesFromDisk(): GalleryImage[] {
  return loadGalleryCollectionsFromDisk().flatMap((c) => c.images);
}

/** Client galleries 1–4 under public/New gallery/{1..4} */
const NEW_GALLERY_PUBLIC_DIR = 'New gallery';

const GALLERY_COLLECTION_DIRS: { num: number; folder: string; title: string }[] = [
  { num: 1, folder: '1', title: 'Gallery 1' },
  { num: 2, folder: '2', title: 'Gallery 2' },
  { num: 3, folder: '3', title: 'Gallery 3' },
  { num: 4, folder: '4', title: 'Gallery 4' },
];

export interface GalleryDiskCollection {
  id: string;
  title: string;
  images: GalleryImage[];
}

/** Four gallery sections for side-scroll layout (New gallery/1–4 on disk). */
export function loadGalleryCollectionsFromDisk(): GalleryDiskCollection[] {
  const galleryRoot = path.join(process.cwd(), 'public', NEW_GALLERY_PUBLIC_DIR);
  if (!fs.existsSync(galleryRoot)) return [];

  return GALLERY_COLLECTION_DIRS.map(({ num, folder, title }) => {
    const dir = path.join(galleryRoot, folder);
    const results: GalleryImage[] = [];
    const seenInCollection = new Set<string>();
    if (fs.existsSync(dir)) {
      const urlPrefix = `/${NEW_GALLERY_PUBLIC_DIR}/${folder}`;
      walkGalleryDir(dir, urlPrefix, results, seenInCollection);
    }
    return {
      id: `gallery-${num}`,
      title,
      images: sortGalleryImages(results),
    };
  }).filter((c) => c.images.length > 0);
}
