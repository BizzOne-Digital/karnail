import { Response } from 'express';
import { GalleryCategory, GalleryImage } from '@/models';
import { asyncHandler, sendSuccess, AppError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';
import { slugify } from '../utils/helpers';

export const getCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (!req.admin) filter.isPublished = true;

  const categories = await GalleryCategory.find(filter).sort('displayOrder');
  sendSuccess(res, categories);
});

export const getCategoryBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = { slug: req.params.slug };
  if (!req.admin) filter.isPublished = true;

  const category = await GalleryCategory.findOne(filter);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  sendSuccess(res, category);
});

export const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slug = req.body.slug || slugify(req.body.name);
  const category = await GalleryCategory.create({ ...req.body, slug });
  sendSuccess(res, category, 201);
});

export const updateCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await GalleryCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  sendSuccess(res, category);
});

export const deleteCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  await GalleryImage.deleteMany({ categoryId: req.params.id });
  const category = await GalleryCategory.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  sendSuccess(res, { message: 'Category and images deleted' });
});

export const getImages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (req.params.categoryId) filter.categoryId = req.params.categoryId;
  if (!req.admin) filter.isPublished = true;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const images = await GalleryImage.find(filter)
    .populate('categoryId', 'name slug')
    .sort('displayOrder');
  sendSuccess(res, images);
});

export const getImageById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const image = await GalleryImage.findById(req.params.id).populate('categoryId', 'name slug');
  if (!image) {
    throw new AppError('Image not found', 404);
  }
  sendSuccess(res, image);
});

export const createImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const image = await GalleryImage.create(req.body);
  sendSuccess(res, image, 201);
});

export const updateImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!image) {
    throw new AppError('Image not found', 404);
  }
  sendSuccess(res, image);
});

export const deleteImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const image = await GalleryImage.findByIdAndDelete(req.params.id);
  if (!image) {
    throw new AppError('Image not found', 404);
  }
  sendSuccess(res, { message: 'Image deleted', imageUrl: image.imageUrl });
});

export const reorderImages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { order } = req.body as { order: { id: string; displayOrder: number }[] };
  await Promise.all(
    order.map((item) =>
      GalleryImage.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
    )
  );
  sendSuccess(res, { message: 'Images reordered' });
});
