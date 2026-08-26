import { Router } from 'express';
import {
  getAllPages,
  getPageByKey,
  getPublicPage,
  updatePage,
  updatePageSection,
  reorderSections,
} from '../controllers/pageController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/public/:pageKey', getPublicPage);
router.get('/', authenticate, getAllPages);
router.get('/:pageKey', authenticate, getPageByKey);
router.put('/:pageKey', authenticate, updatePage);
router.put('/:pageKey/sections/:sectionKey', authenticate, updatePageSection);
router.put('/:pageKey/reorder', authenticate, reorderSections);

export default router;
