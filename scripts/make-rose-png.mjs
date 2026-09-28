import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../public/images/theme-rose-stem.jpg');
const output = path.join(__dirname, '../public/images/theme-rose-stem.png');

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r > 235 && g > 235 && b > 235) {
    data[i + 3] = 0;
  } else if (r > 205 && g > 205 && b > 205) {
    const avg = (r + g + b) / 3;
    data[i + 3] = Math.round(255 * Math.max(0, 1 - (avg - 205) / 50));
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(output);

console.log('Wrote', output);
