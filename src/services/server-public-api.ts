import 'server-only';

import * as publicData from '@/lib/public-data';

export const serverPublicApi = {
  getPage: publicData.getPublicPage,
  getSettings: publicData.getPublicSettings,
  getServices: publicData.getPublicServices,
  getService: publicData.getPublicService,
  getGalleryCategories: publicData.getPublicGalleryCategories,
  getGalleryCategory: publicData.getPublicGalleryCategory,
  getGalleryImages: publicData.getPublicGalleryImages,
  getTestimonials: publicData.getPublicTestimonials,
  getFAQs: publicData.getPublicFAQs,
  getPricing: publicData.getPublicPricing,
  getBlogs: publicData.getPublicBlogs,
  getBlog: publicData.getPublicBlog,
  getProducts: publicData.getPublicProducts,
  getProduct: publicData.getPublicProduct,
};
