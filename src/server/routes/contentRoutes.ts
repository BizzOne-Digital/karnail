import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getPricing,
  updatePricing,
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  duplicateProduct,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  getSettings,
  updateSettings,
  getDashboardStats,
} from '../controllers/contentController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Dashboard
router.get('/dashboard/stats', authenticate, getDashboardStats);

// Testimonials
router.get('/testimonials', getTestimonials);
router.post('/testimonials', authenticate, createTestimonial);
router.put('/testimonials/:id', authenticate, updateTestimonial);
router.delete('/testimonials/:id', authenticate, deleteTestimonial);

// FAQs
router.get('/faqs', getFAQs);
router.post('/faqs', authenticate, createFAQ);
router.put('/faqs/:id', authenticate, updateFAQ);
router.delete('/faqs/:id', authenticate, deleteFAQ);

// Pricing
router.get('/pricing', getPricing);
router.put('/pricing', authenticate, updatePricing);

// Blogs
router.get('/blogs', getBlogs);
router.get('/blogs/slug/:slug', getBlogBySlug);
router.post('/blogs', authenticate, createBlog);
router.put('/blogs/:id', authenticate, updateBlog);
router.delete('/blogs/:id', authenticate, deleteBlog);

// Products
router.get('/products', getProducts);
router.get('/products/slug/:slug', getProductBySlug);
router.post('/products', authenticate, createProduct);
router.put('/products/:id', authenticate, updateProduct);
router.post('/products/:id/duplicate', authenticate, duplicateProduct);
router.delete('/products/:id', authenticate, deleteProduct);

// Orders
router.get('/orders', authenticate, getOrders);
router.get('/orders/:id', authenticate, getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', authenticate, updateOrder);

// Enquiries
router.get('/enquiries', authenticate, getEnquiries);
router.post('/enquiries', createEnquiry);
router.put('/enquiries/:id', authenticate, updateEnquiry);

// Settings
router.get('/settings', getSettings);
router.put('/settings', authenticate, updateSettings);

export default router;
