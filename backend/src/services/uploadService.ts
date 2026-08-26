import fs from 'fs';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { config, UploadDir } from '../config';
import { AppError } from '../utils/apiResponse';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

export function ensureUploadDirs(): void {
  const basePath = path.resolve(__dirname, '../../', config.uploadBasePath);
  const dirs = ['pages', 'services', 'gallery', 'testimonials', 'blogs', 'products', 'settings'];

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  dirs.forEach((dir) => {
    const dirPath = path.join(basePath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

export function getUploadPath(folder: UploadDir): string {
  const safePath = path.normalize(folder).replace(/^(\.\.(\/|\\|$))+/, '');
  return path.resolve(__dirname, '../../', config.uploadBasePath, safePath);
}

function createStorage(folder: UploadDir) {
  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadPath = getUploadPath(folder);
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const safeExt = ALLOWED_EXTENSIONS.includes(ext) ? ext : '.jpg';
      cb(null, `${uuidv4()}${safeExt}`);
    },
  });
}

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new AppError('Invalid file type. Only JPG, PNG, WebP, and AVIF are allowed.', 400));
  }
  cb(null, true);
};

export function createUploadMiddleware(folder: UploadDir, fieldName = 'image') {
  const upload = multer({
    storage: createStorage(folder),
    limits: { fileSize: config.maxUploadSizeMb * 1024 * 1024 },
    fileFilter,
  });
  return upload.single(fieldName);
}

export function createMultiUploadMiddleware(folder: UploadDir, fieldName = 'images', maxCount = 10) {
  const upload = multer({
    storage: createStorage(folder),
    limits: { fileSize: config.maxUploadSizeMb * 1024 * 1024 },
    fileFilter,
  });
  return upload.array(fieldName, maxCount);
}

export async function processAndOptimizeImage(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(dir, `${baseName}.webp`);

  if (ext === '.webp') {
    await sharp(filePath)
      .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpPath + '.tmp');

    fs.renameSync(webpPath + '.tmp', webpPath);
    if (filePath !== webpPath) fs.unlinkSync(filePath);
    return webpPath;
  }

  await sharp(filePath)
    .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(webpPath);

  fs.unlinkSync(filePath);
  return webpPath;
}

export function getRelativePath(absolutePath: string): string {
  const basePath = path.resolve(__dirname, '../../');
  const relative = path.relative(basePath, absolutePath).replace(/\\/g, '/');
  return relative.startsWith('/') ? relative : `/${relative}`;
}

export async function deleteImageFile(relativePath: string): Promise<void> {
  if (!relativePath || relativePath.startsWith('http')) return;

  const normalized = relativePath.replace(/^\//, '');
  const fullPath = path.resolve(__dirname, '../../', normalized);

  const basePath = path.resolve(__dirname, '../../', config.uploadBasePath);
  if (!fullPath.startsWith(basePath)) return;

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

export async function validateImageBuffer(buffer: Buffer): Promise<boolean> {
  try {
    const metadata = await sharp(buffer).metadata();
    return !!metadata.format && ['jpeg', 'png', 'webp', 'avif'].includes(metadata.format);
  } catch {
    return false;
  }
}
