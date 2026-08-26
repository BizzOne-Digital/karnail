import { Router } from 'express';
import { uploadImage, deleteUploadedImage } from '../controllers/uploadController';
import { authenticate } from '../middleware/auth';

const router = Router();

const folders = ['pages', 'services', 'gallery', 'testimonials', 'blogs', 'products', 'settings'] as const;

folders.forEach((folder) => {
  router.post(`/${folder}`, authenticate, ...uploadImage(folder));
});

router.delete('/', authenticate, deleteUploadedImage);

export default router;
