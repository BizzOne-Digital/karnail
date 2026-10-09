/**
 * Trim scan margins and apply per-clipping inset crops for Media Coverage images.
 * Run: node scripts/crop-media-coverage.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../public/media-coverage');

/** Extra inset after auto-trim, as % of trimmed width/height (removes stray ads / margins). */
const EXTRA_INSET_PERCENT = {
  'crossword-book-awards-2013.jpg': { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
  'rcmp-commemorative-medal-1993.jpg': { top: 1, right: 1.5, bottom: 2, left: 1.5 },
  'rcmp-commissioner-visit-1992.jpg': { top: 4.5, right: 1.5, bottom: 34, left: 2 },
  'thompson-award-of-merit-1993.jpg': { top: 1, right: 1.5, bottom: 2, left: 1.5 },
  'citizen-of-the-world-2008.jpg': { top: 1, right: 1.5, bottom: 2, left: 1.5 },
};

async function cropFile(filename) {
  const inputPath = path.join(dir, filename);
  const tmpPath = path.join(dir, `.crop-tmp-${filename}`);

  let pipeline = sharp(inputPath).rotate();

  const trimmed = await pipeline
    .clone()
    .trim({ threshold: 12, background: { r: 255, g: 255, b: 255 } })
    .toBuffer({ resolveWithObject: true });

  let { data, info } = trimmed;
  let img = sharp(data);

  const inset = EXTRA_INSET_PERCENT[filename];
  if (inset) {
    const w = info.width;
    const h = info.height;
    const left = Math.round((w * inset.left) / 100);
    const top = Math.round((h * inset.top) / 100);
    const right = Math.round((w * inset.right) / 100);
    const bottom = Math.round((h * inset.bottom) / 100);
    const width = Math.max(1, w - left - right);
    const height = Math.max(1, h - top - bottom);
    img = sharp(data).extract({ left, top, width, height });
    info = await img.metadata();
  }

  await img.jpeg({ quality: 92, mozjpeg: true }).toFile(tmpPath);
  await fs.rename(tmpPath, inputPath);
  console.log(`${filename}: ${info.width}×${info.height}`);
}

const files = Object.keys(EXTRA_INSET_PERCENT);
for (const file of files) {
  await cropFile(file);
}

console.log('Done.');
