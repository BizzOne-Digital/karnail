import { Response, NextFunction } from 'express';
import { asyncHandler, sendSuccess, AppError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';
import {
  createUploadMiddleware,
  processAndOptimizeImage,
  getRelativePath,
  deleteImageFile,
} from '../services/uploadService';
import { UploadDir } from '../config';

const uploadHandlers: Record<string, ReturnType<typeof createUploadMiddleware>> = {
  pages: createUploadMiddleware('pages'),
  services: createUploadMiddleware('services'),
  gallery: createUploadMiddleware('gallery'),
  testimonials: createUploadMiddleware('testimonials'),
  blogs: createUploadMiddleware('blogs'),
  products: createUploadMiddleware('products'),
  settings: createUploadMiddleware('settings'),
};

export const uploadImage = (folder: UploadDir) => {
  return [
    (req: AuthRequest, res: Response, next: NextFunction) => {
      const handler = uploadHandlers[folder];
      handler(req, res, (err) => {
        if (err) return next(new AppError(err.message, 400));
        next();
      });
    },
    asyncHandler(async (req: AuthRequest, res: Response) => {
      if (!req.file) {
        throw new AppError('No file uploaded', 400);
      }

      const optimizedPath = await processAndOptimizeImage(req.file.path);
      const relativePath = getRelativePath(optimizedPath);

      sendSuccess(res, {
        url: relativePath,
        filename: req.file.filename,
        originalName: req.file.originalname,
      });
    }),
  ];
};

export const deleteUploadedImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { path: imagePath } = req.body;
  if (!imagePath) {
    throw new AppError('Image path is required', 400);
  }

  await deleteImageFile(imagePath);
  sendSuccess(res, { message: 'Image deleted' });
});
