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

/** Top-level gallery folders mapped to client Galleries 1–4 (horizontal scroll rows). */
const GALLERY_COLLECTION_DIRS: { num: number; folder: string; title: string }[] = [
  { num: 1, folder: 'Website Gallery - 1-1-001', title: 'Gallery 1' },
  { num: 2, folder: 'Website Art Gallery -  2-1-001', title: 'Gallery 2' },
  { num: 3, folder: 'Website Gallery-3-1-001', title: 'Gallery 3' },
  { num: 4, folder: 'Website Gallery-4-1-001', title: 'Gallery 4' },
];

export interface GalleryDiskCollection {
  id: string;
  title: string;
  images: GalleryImage[];
}

function resolveGalleryFolder(galleryRoot: string, expected: string): string | null {
  if (!fs.existsSync(path.join(galleryRoot, expected))) {
    const entries = fs.readdirSync(galleryRoot, { withFileTypes: true }).filter((e) => e.isDirectory());
    const normalized = expected.replace(/\s+/g, ' ').trim().toLowerCase();
    const match = entries.find((e) => e.name.replace(/\s+/g, ' ').trim().toLowerCase() === normalized);
    return match?.name ?? null;
  }
  return expected;
}

/** Four gallery sections for side-scroll layout (folders 1–4 on disk). */
export function loadGalleryCollectionsFromDisk(): GalleryDiskCollection[] {
  const galleryRoot = path.join(process.cwd(), 'public', 'gallery');
  if (!fs.existsSync(galleryRoot)) return [];

  return GALLERY_COLLECTION_DIRS.map(({ num, folder, title }) => {
    const resolved = resolveGalleryFolder(galleryRoot, folder);
    const results: GalleryImage[] = [];
    if (resolved) {
      walkGalleryDir(path.join(galleryRoot, resolved), `/gallery/${resolved}`, results);
    }
    return {
      id: `gallery-${num}`,
      title,
      images: results,
    };
  }).filter((c) => c.images.length > 0);
}
