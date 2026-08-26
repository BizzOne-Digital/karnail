import { Router } from 'express';
import {
  getAllServices,
  getServiceBySlug,
  getServiceById,
  createService,
  updateService,
  deleteService,
  duplicateService,
  reorderServices,
} from '../controllers/serviceController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getAllServices);
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', authenticate, getServiceById);
router.post('/', authenticate, createService);
router.put('/reorder', authenticate, reorderServices);
router.put('/:id', authenticate, updateService);
router.post('/:id/duplicate', authenticate, duplicateService);
router.delete('/:id', authenticate, deleteService);

export default router;
