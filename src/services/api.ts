import { api } from '@/lib/api';
import type {
  Page,
  Service,
  GalleryCategory,
  GalleryImage,
  Testimonial,
  FAQ,
  BlogPost,
  Product,
  PricingContent,
  SiteSettings,
  Order,
  Enquiry,
  DashboardStats,
} from '@/types';

export const publicApi = {
  getPage: (pageKey: string) => api.get<Page>(`/pages/public/${pageKey}`),
  getSettings: () => api.get<SiteSettings>('/settings'),
  getServices: (params?: Record<string, string | number | boolean | undefined>) =>
    api.getPaginated<Service>('/services', { published: true, ...params }),
  getService: (slug: string) => api.get<Service>(`/services/slug/${slug}`),
  getGalleryCategories: () => api.get<GalleryCategory[]>('/gallery/categories'),
  getGalleryCategory: (slug: string) => api.get<GalleryCategory>(`/gallery/categories/slug/${slug}`),
  getGalleryImages: (params?: Record<string, string | number | boolean | undefined>) =>
    api.get<GalleryImage[]>('/gallery/images', params),
  getTestimonials: (params?: Record<string, string | number | boolean | undefined>) =>
    api.get<Testimonial[]>('/testimonials', { ...params, published: true }),
  getFAQs: (params?: Record<string, string | number | boolean | undefined>) =>
    api.get<FAQ[]>('/faqs', params),
  getPricing: () => api.get<PricingContent>('/pricing'),
  getBlogs: (params?: Record<string, string | number | boolean | undefined>) =>
    api.getPaginated<BlogPost>('/blogs', { ...params, published: true }),
  getBlog: (slug: string) => api.get<BlogPost>(`/blogs/slug/${slug}`),
  getProducts: (params?: Record<string, string | number | boolean | undefined>) =>
    api.getPaginated<Product>('/products', { ...params, published: true }),
  getProduct: (slug: string) => api.get<Product>(`/products/slug/${slug}`),
  createEnquiry: (data: Record<string, unknown>) => api.post<Enquiry>('/enquiries', data),
  createOrder: (data: Record<string, unknown>) => api.post<Order>('/orders', data),
};

export const adminApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout', {}),
  getMe: () => api.get('/auth/me'),
  getDashboardStats: () => api.get<DashboardStats>('/dashboard/stats'),
  getPages: () => api.get<Page[]>('/pages'),
  getPage: (pageKey: string) => api.get<Page>(`/pages/${pageKey}`),
  updatePage: (pageKey: string, data: Partial<Page>) => api.put<Page>(`/pages/${pageKey}`, data),
  updatePageSection: (pageKey: string, sectionKey: string, data: Record<string, unknown>) =>
    api.put<Page>(`/pages/${pageKey}/sections/${sectionKey}`, data),
  getServices: () => api.getPaginated<Service>('/services'),
  getService: (id: string) => api.get<Service>(`/services/${id}`),
  createService: (data: Partial<Service>) => api.post<Service>('/services', data),
  updateService: (id: string, data: Partial<Service>) => api.put<Service>(`/services/${id}`, data),
  deleteService: (id: string) => api.delete(`/services/${id}`),
  duplicateService: (id: string) => api.post<Service>(`/services/${id}/duplicate`, {}),
  getGalleryCategories: () => api.get<GalleryCategory[]>('/gallery/categories'),
  createGalleryCategory: (data: Partial<GalleryCategory>) => api.post<GalleryCategory>('/gallery/categories', data),
  updateGalleryCategory: (id: string, data: Partial<GalleryCategory>) =>
    api.put<GalleryCategory>(`/gallery/categories/${id}`, data),
  deleteGalleryCategory: (id: string) => api.delete(`/gallery/categories/${id}`),
  getGalleryImages: (categoryId?: string) =>
    api.get<GalleryImage[]>(categoryId ? `/gallery/images/category/${categoryId}` : '/gallery/images'),
  createGalleryImage: (data: Partial<GalleryImage>) => api.post<GalleryImage>('/gallery/images', data),
  updateGalleryImage: (id: string, data: Partial<GalleryImage>) =>
    api.put<GalleryImage>(`/gallery/images/${id}`, data),
  deleteGalleryImage: (id: string) => api.delete(`/gallery/images/${id}`),
  getTestimonials: () => api.get<Testimonial[]>('/testimonials'),
  createTestimonial: (data: Partial<Testimonial>) => api.post<Testimonial>('/testimonials', data),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    api.put<Testimonial>(`/testimonials/${id}`, data),
  deleteTestimonial: (id: string) => api.delete(`/testimonials/${id}`),
  getFAQs: () => api.get<FAQ[]>('/faqs'),
  createFAQ: (data: Partial<FAQ>) => api.post<FAQ>('/faqs', data),
  updateFAQ: (id: string, data: Partial<FAQ>) => api.put<FAQ>(`/faqs/${id}`, data),
  deleteFAQ: (id: string) => api.delete(`/faqs/${id}`),
  getPricing: () => api.get<PricingContent>('/pricing'),
  updatePricing: (data: Partial<PricingContent>) => api.put<PricingContent>('/pricing', data),
  getBlogs: () => api.getPaginated<BlogPost>('/blogs'),
  getBlog: (id: string) => api.get<BlogPost>(`/blogs/${id}`),
  createBlog: (data: Partial<BlogPost>) => api.post<BlogPost>('/blogs', data),
  updateBlog: (id: string, data: Partial<BlogPost>) => api.put<BlogPost>(`/blogs/${id}`, data),
  deleteBlog: (id: string) => api.delete(`/blogs/${id}`),
  getProducts: () => api.getPaginated<Product>('/products'),
  getProduct: (id: string) => api.get<Product>(`/products/${id}`),
  createProduct: (data: Partial<Product>) => api.post<Product>('/products', data),
  updateProduct: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  duplicateProduct: (id: string) => api.post<Product>(`/products/${id}/duplicate`, {}),
  getOrders: () => api.getPaginated<Order>('/orders'),
  updateOrder: (id: string, data: Partial<Order>) => api.put<Order>(`/orders/${id}`, data),
  getEnquiries: () => api.getPaginated<Enquiry>('/enquiries'),
  updateEnquiry: (id: string, data: Partial<Enquiry>) => api.put<Enquiry>(`/enquiries/${id}`, data),
  getSettings: () => api.get<SiteSettings>('/settings'),
  updateSettings: (data: Partial<SiteSettings>) => api.put<SiteSettings>('/settings', data),
  uploadImage: (folder: string, file: File, onProgress?: (p: number) => void) =>
    api.upload(folder, file, onProgress),
};
