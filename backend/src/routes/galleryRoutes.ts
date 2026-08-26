import { Router } from 'express';
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
  reorderImages,
} from '../controllers/galleryController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/slug/:slug', getCategoryBySlug);
router.post('/categories', authenticate, createCategory);
router.put('/categories/:id', authenticate, updateCategory);
router.delete('/categories/:id', authenticate, deleteCategory);

router.get('/images', getImages);
router.get('/images/category/:categoryId', getImages);
router.get('/images/:id', getImageById);
router.post('/images', authenticate, createImage);
router.put('/images/reorder', authenticate, reorderImages);
router.put('/images/:id', authenticate, updateImage);
router.delete('/images/:id', authenticate, deleteImage);

export default router;
