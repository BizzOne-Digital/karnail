import 'server-only';

import { connectDB } from '@/lib/mongodb';
import {
  Page,
  SiteSettings,
  Service,
  GalleryCategory,
  GalleryImage,
  Testimonial,
  FAQ,
  PricingContent,
  BlogPost,
  Product,
} from '@/models';
import type {
  Page as PageType,
  SiteSettings as SiteSettingsType,
  Service as ServiceType,
  GalleryCategory as GalleryCategoryType,
  GalleryImage as GalleryImageType,
  Testimonial as TestimonialType,
  FAQ as FAQType,
  PricingContent as PricingContentType,
  BlogPost as BlogPostType,
  Product as ProductType,
} from '@/types';

function toPlain<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function parsePagination(params?: Record<string, string | number | boolean | undefined>) {
  const page = Math.max(1, parseInt(String(params?.page ?? '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(params?.limit ?? '20'), 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

async function db() {
  await connectDB();
}

export async function getPublicPage(pageKey: string): Promise<PageType> {
  await db();
  const page = await Page.findOne({ pageKey, isPublished: true }).lean();
  if (!page) throw new Error('Page not found');
  return toPlain(page);
}

export async function getPublicSettings(): Promise<SiteSettingsType> {
  await db();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    settings = (await SiteSettings.create({})).toObject();
  }
  return toPlain(settings);
}

export async function getPublicServices(params?: Record<string, string | number | boolean | undefined>) {
  await db();
  const { page, limit, skip } = parsePagination(params);
  const filter: Record<string, unknown> = { isPublished: true };
  if (params?.featured === true || params?.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Service.find(filter).sort('displayOrder').skip(skip).limit(limit).lean(),
    Service.countDocuments(filter),
  ]);

  return {
    data: toPlain<ServiceType[]>(data),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getPublicService(slug: string): Promise<ServiceType> {
  await db();
  const service = await Service.findOne({ slug, isPublished: true }).lean();
  if (!service) throw new Error('Service not found');
  return toPlain(service);
}

export async function getPublicGalleryCategories(): Promise<GalleryCategoryType[]> {
  await db();
  const categories = await GalleryCategory.find({ isPublished: true }).sort('displayOrder').lean();
  return toPlain(categories);
}

export async function getPublicGalleryCategory(slug: string): Promise<GalleryCategoryType> {
  await db();
  const category = await GalleryCategory.findOne({ slug, isPublished: true }).lean();
  if (!category) throw new Error('Category not found');
  return toPlain(category);
}

export async function getPublicGalleryImages(params?: Record<string, string | number | boolean | undefined>) {
  await db();
  const filter: Record<string, unknown> = { isPublished: true };
  if (params?.featured === true || params?.featured === 'true') filter.isFeatured = true;

  const images = await GalleryImage.find(filter)
    .populate('categoryId', 'name slug')
    .sort('displayOrder')
    .lean();

  return toPlain<GalleryImageType[]>(images);
}

export async function getPublicTestimonials(params?: Record<string, string | number | boolean | undefined>) {
  await db();
  const filter: Record<string, unknown> = { isPublished: true };
  if (params?.featured === true || params?.featured === 'true') filter.isFeatured = true;
  const testimonials = await Testimonial.find(filter).sort('displayOrder').lean();
  return toPlain<TestimonialType[]>(testimonials);
}

export async function getPublicFAQs(params?: Record<string, string | number | boolean | undefined>) {
  await db();
  const filter: Record<string, unknown> = { isPublished: true };
  if (params?.category) filter.category = params.category;
  const faqs = await FAQ.find(filter).sort('displayOrder').lean();
  return toPlain<FAQType[]>(faqs);
}

export async function getPublicPricing(): Promise<PricingContentType> {
  await db();
  let pricing = await PricingContent.findOne().lean();
  if (!pricing) {
    pricing = (await PricingContent.create({})).toObject();
  }
  return toPlain(pricing);
}

export async function getPublicBlogs(params?: Record<string, string | number | boolean | undefined>) {
  await db();
  const { page, limit, skip } = parsePagination(params);
  const filter: Record<string, unknown> = { isPublished: true };
  if (params?.featured === true || params?.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    BlogPost.find(filter).sort('-publishDate').skip(skip).limit(limit).lean(),
    BlogPost.countDocuments(filter),
  ]);

  return {
    data: toPlain<BlogPostType[]>(data),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getPublicBlog(slug: string): Promise<BlogPostType> {
  await db();
  const blog = await BlogPost.findOne({ slug, isPublished: true }).lean();
  if (!blog) throw new Error('Blog post not found');
  return toPlain(blog);
}

export async function getPublicProducts(params?: Record<string, string | number | boolean | undefined>) {
  await db();
  const { page, limit, skip } = parsePagination(params);
  const filter: Record<string, unknown> = { isPublished: true };
  if (params?.featured === true || params?.featured === 'true') filter.isFeatured = true;

  const [data, total] = await Promise.all([
    Product.find(filter).sort('displayOrder').skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    data: toPlain<ProductType[]>(data),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getPublicProduct(slug: string): Promise<ProductType> {
  await db();
  const product = await Product.findOne({ slug, isPublished: true }).lean();
  if (!product) throw new Error('Product not found');
  return toPlain(product);
}
