import { Response } from 'express';
import {
  Testimonial,
  FAQ,
  PricingContent,
  BlogPost,
  Product,
  Order,
  Enquiry,
  SiteSettings,
  Page,
  Service,
  GalleryImage,
  GalleryCategory,
} from '../models';
import { asyncHandler, sendSuccess, sendPaginated, AppError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';
import { slugify, parsePagination, generateReferenceNumber } from '../utils/helpers';
import { sendContactEmails, sendOrderEmails } from '../services/emailService';

// Testimonials
export const getTestimonials = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (!req.admin) filter.isPublished = true;
  if (req.query.featured === 'true') filter.isFeatured = true;
  const testimonials = await Testimonial.find(filter).sort('displayOrder');
  sendSuccess(res, testimonials);
});

export const createTestimonial = asyncHandler(async (req: AuthRequest, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  sendSuccess(res, testimonial, 201);
});

export const updateTestimonial = asyncHandler(async (req: AuthRequest, res: Response) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  sendSuccess(res, testimonial);
});

export const deleteTestimonial = asyncHandler(async (req: AuthRequest, res: Response) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  sendSuccess(res, { message: 'Deleted', image: testimonial.image });
});

// FAQs
export const getFAQs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = {};
  if (!req.admin) filter.isPublished = true;
  if (req.query.category) filter.category = req.query.category;
  const faqs = await FAQ.find(filter).sort('displayOrder');
  sendSuccess(res, faqs);
});

export const createFAQ = asyncHandler(async (req: AuthRequest, res: Response) => {
  const faq = await FAQ.create(req.body);
  sendSuccess(res, faq, 201);
});

export const updateFAQ = asyncHandler(async (req: AuthRequest, res: Response) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!faq) throw new AppError('FAQ not found', 404);
  sendSuccess(res, faq);
});

export const deleteFAQ = asyncHandler(async (req: AuthRequest, res: Response) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) throw new AppError('FAQ not found', 404);
  sendSuccess(res, { message: 'Deleted' });
});

// Pricing
export const getPricing = asyncHandler(async (_req: AuthRequest, res: Response) => {
  let pricing = await PricingContent.findOne();
  if (!pricing) {
    pricing = await PricingContent.create({});
  }
  sendSuccess(res, pricing);
});

export const updatePricing = asyncHandler(async (req: AuthRequest, res: Response) => {
  let pricing = await PricingContent.findOne();
  if (!pricing) {
    pricing = await PricingContent.create(req.body);
  } else {
    Object.assign(pricing, req.body);
    await pricing.save();
  }
  sendSuccess(res, pricing);
});

// Blogs
export const getBlogs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = parsePagination(req.query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (!req.admin) filter.isPublished = true;
  if (req.query.category) filter.categories = req.query.category;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { excerpt: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  if (req.query.featured === 'true') filter.isFeatured = true;

  const [blogs, total] = await Promise.all([
    BlogPost.find(filter).sort('-publishDate').skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  sendPaginated(res, blogs, { page, limit, total, totalPages: Math.ceil(total / limit) });
});

export const getBlogBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = { slug: req.params.slug };
  if (!req.admin) filter.isPublished = true;
  const blog = await BlogPost.findOne(filter);
  if (!blog) throw new AppError('Blog post not found', 404);
  sendSuccess(res, blog);
});

export const createBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slug = req.body.slug || slugify(req.body.title);
  const blog = await BlogPost.create({ ...req.body, slug });
  sendSuccess(res, blog, 201);
});

export const updateBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!blog) throw new AppError('Blog not found', 404);
  sendSuccess(res, blog);
});

export const deleteBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  const blog = await BlogPost.findByIdAndDelete(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  sendSuccess(res, { message: 'Deleted', heroImage: blog.heroImage });
});

// Products
export const getProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = parsePagination(req.query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (!req.admin) filter.isPublished = true;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.availability) filter.availability = req.query.availability;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [products, total] = await Promise.all([
    Product.find(filter).sort('displayOrder').skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  sendPaginated(res, products, { page, limit, total, totalPages: Math.ceil(total / limit) });
});

export const getProductBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: Record<string, unknown> = { slug: req.params.slug };
  if (!req.admin) filter.isPublished = true;
  const product = await Product.findOne(filter);
  if (!product) throw new AppError('Product not found', 404);
  sendSuccess(res, product);
});

export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slug = req.body.slug || slugify(req.body.title);
  const product = await Product.create({ ...req.body, slug });
  sendSuccess(res, product, 201);
});

export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) throw new AppError('Product not found', 404);
  sendSuccess(res, product);
});

export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  sendSuccess(res, { message: 'Deleted', mainImage: product.mainImage, galleryImages: product.galleryImages });
});

export const duplicateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const original = await Product.findById(req.params.id);
  if (!original) throw new AppError('Product not found', 404);
  const data = original.toObject() as unknown as Record<string, unknown>;
  delete data._id;
  data.title = `${data.title} (Copy)`;
  data.slug = `${data.slug}-copy-${Date.now()}`;
  data.isPublished = false;
  const duplicate = await Product.create(data);
  sendSuccess(res, duplicate, 201);
});

// Orders
export const getOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = parsePagination(req.query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (req.query.status) filter.status = req.query.status;

  const [orders, total] = await Promise.all([
    Order.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  sendPaginated(res, orders, { page, limit, total, totalPages: Math.ceil(total / limit) });
});

export const getOrderById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404);
  sendSuccess(res, order);
});

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const referenceNumber = generateReferenceNumber();
  const order = await Order.create({ ...req.body, referenceNumber });

  try {
    await sendOrderEmails({
      referenceNumber,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      items: order.items.map((i) => ({ productTitle: i.productTitle, quantity: i.quantity })),
      message: order.message,
    });
  } catch (e) {
    console.error('Failed to send order emails:', e);
  }

  sendSuccess(res, order, 201);
});

export const updateOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) throw new AppError('Order not found', 404);
  sendSuccess(res, order);
});

// Enquiries
export const getEnquiries = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = parsePagination(req.query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.type) filter.enquiryType = req.query.type;

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  sendPaginated(res, enquiries, { page, limit, total, totalPages: Math.ceil(total / limit) });
});

export const createEnquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const referenceNumber = generateReferenceNumber();
  const enquiry = await Enquiry.create({ ...req.body, referenceNumber });

  try {
    await sendContactEmails({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      enquiryType: enquiry.enquiryType,
      artworkOrService: enquiry.artworkOrService,
      message: enquiry.message,
      referenceNumber,
    });
  } catch (e) {
    console.error('Failed to send enquiry emails:', e);
  }

  sendSuccess(res, enquiry, 201);
});

export const updateEnquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!enquiry) throw new AppError('Enquiry not found', 404);
  sendSuccess(res, enquiry);
});

// Settings
export const getSettings = asyncHandler(async (_req: AuthRequest, res: Response) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  sendSuccess(res, settings);
});

export const updateSettings = asyncHandler(async (req: AuthRequest, res: Response) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(req.body);
  } else {
    Object.assign(settings, req.body);
    await settings.save();
  }
  sendSuccess(res, settings);
});

// Dashboard
export const getDashboardStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const [
    totalPages,
    publishedPages,
    totalServices,
    totalGalleryImages,
    totalGalleryCategories,
    totalTestimonials,
    totalFAQs,
    totalBlogs,
    totalProducts,
    availableArtwork,
    soldArtwork,
    newOrders,
    newEnquiries,
  ] = await Promise.all([
    Page.countDocuments(),
    Page.countDocuments({ isPublished: true }),
    Service.countDocuments(),
    GalleryImage.countDocuments(),
    GalleryCategory.countDocuments(),
    Testimonial.countDocuments(),
    FAQ.countDocuments(),
    BlogPost.countDocuments(),
    Product.countDocuments(),
    Product.countDocuments({ availability: 'available' }),
    Product.countDocuments({ availability: 'sold' }),
    Order.countDocuments({ status: 'new' }),
    Enquiry.countDocuments({ status: 'new' }),
  ]);

  const recentActivity = await Promise.all([
    Service.find().sort('-updatedAt').limit(5).select('title updatedAt'),
    BlogPost.find().sort('-updatedAt').limit(5).select('title updatedAt'),
    Product.find().sort('-updatedAt').limit(5).select('title updatedAt'),
  ]);

  sendSuccess(res, {
    stats: {
      totalPages,
      publishedPages,
      totalServices,
      totalGalleryImages,
      totalGalleryCategories,
      totalTestimonials,
      totalFAQs,
      totalBlogs,
      totalProducts,
      availableArtwork,
      soldArtwork,
      newOrders,
      newEnquiries,
    },
    recentActivity: {
      services: recentActivity[0],
      blogs: recentActivity[1],
      products: recentActivity[2],
    },
  });
});
