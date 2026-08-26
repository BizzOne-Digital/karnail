import { Response } from 'express';
import { Service } from '../models';
import { asyncHandler, sendSuccess, sendPaginated, AppError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';
import { slugify, parsePagination } from '../utils/helpers';

export const getAllServices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = parsePagination(req.query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};

  if (req.query.published === 'true') filter.isPublished = true;
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { shortDescription: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [services, total] = await Promise.all([
    Service.find(filter).sort('displayOrder').skip(skip).limit(limit),
    Service.countDocuments(filter),
  ]);

  sendPaginated(res, services, { page, limit, total, totalPages: Math.ceil(total / limit) });
});

export const getServiceBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = { slug: req.params.slug };
  if (!req.admin) filter.isPublished = true;

  const service = await Service.findOne(filter);
  if (!service) {
    throw new AppError('Service not found', 404);
  }
  sendSuccess(res, service);
});

export const getServiceById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    throw new AppError('Service not found', 404);
  }
  sendSuccess(res, service);
});

export const createService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slug = req.body.slug || slugify(req.body.title);
  const existing = await Service.findOne({ slug });
  if (existing) {
    throw new AppError('A service with this slug already exists', 400);
  }

  const service = await Service.create({ ...req.body, slug });
  sendSuccess(res, service, 201);
});

export const updateService = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (req.body.slug) {
    const existing = await Service.findOne({
      slug: req.body.slug,
      _id: { $ne: req.params.id },
    });
    if (existing) {
      throw new AppError('A service with this slug already exists', 400);
    }
  }

  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) {
    throw new AppError('Service not found', 404);
  }
  sendSuccess(res, service);
});

export const deleteService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    throw new AppError('Service not found', 404);
  }
  sendSuccess(res, { message: 'Service deleted' });
});

export const duplicateService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const original = await Service.findById(req.params.id);
  if (!original) {
    throw new AppError('Service not found', 404);
  }

  const data = original.toObject() as unknown as Record<string, unknown>;
  delete data._id;
  data.title = `${data.title} (Copy)`;
  data.slug = `${data.slug}-copy-${Date.now()}`;
  data.isPublished = false;

  const duplicate = await Service.create(data);
  sendSuccess(res, duplicate, 201);
});

export const reorderServices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { order } = req.body as { order: { id: string; displayOrder: number }[] };

  await Promise.all(
    order.map((item) =>
      Service.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
    )
  );

  sendSuccess(res, { message: 'Services reordered' });
});
