export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PageImage {
  url: string;
  alt?: string;
  order?: number;
}

export interface PageSection {
  sectionId: string;
  sectionKey: string;
  sectionType: string;
  label: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  description: string;
  richText: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage: string;
  mainImage: string;
  additionalImages: PageImage[];
  layout: string;
  theme: string;
  order: number;
  isVisible: boolean;
}

export interface Page {
  _id: string;
  pageKey: string;
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  sections: PageSection[];
  isPublished: boolean;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  mainImage: string;
  imageAlt: string;
  startingPrice?: number;
  contactForPricing: boolean;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  heroHeading: string;
  heroDescription: string;
  heroBackgroundImage: string;
  fullDescription: string;
  richTextContent: string;
  features: string[];
  processSteps: { title: string; description: string }[];
  detailSections: {
    heading: string;
    description: string;
    richText: string;
    mainImage: string;
    additionalImages: { url: string; alt?: string }[];
    order: number;
  }[];
  pricingInfo: string;
  ctaText: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface GalleryImage {
  _id: string;
  categoryId: GalleryCategory | string;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  medium: string;
  dimensions: string;
  year: string;
  availability: string;
  price?: number;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  customerTitle: string;
  review: string;
  rating: number;
  image?: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  heroImage: string;
  content: string;
  categories: string[];
  tags: string[];
  publishDate: string;
  isPublished: boolean;
  isFeatured: boolean;
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  mainImage: string;
  galleryImages: { url: string; alt?: string }[];
  description: string;
  story: string;
  medium: string;
  dimensions: string;
  year: string;
  sku: string;
  price?: number;
  showPrice: boolean;
  availability: string;
  purchaseMode: string;
  isOriginal: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  artPalUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PricingContent {
  heroHeading: string;
  heroDescription: string;
  heroBackgroundImage: string;
  introduction: string;
  contactForPricingMessage: string;
  pricingCards: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    order: number;
  }[];
  commissionNotes: string;
  artPalUrl: string;
  ctaText: string;
  ctaUrl: string;
}

export interface NavItem {
  label: string;
  url: string;
  isVisible: boolean;
  order: number;
}

export interface SiteSettings {
  general: {
    artistName: string;
    headline: string;
    shortBio: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    socialLinks: { platform: string; url: string; username?: string }[];
    artPalUrl: string;
  };
  branding: {
    mainLogo: string;
    lightLogo?: string;
    darkLogo?: string;
    footerLogo?: string;
    favicon?: string;
    placeholderImage: string;
    signatureImage: string;
    introLogo?: string;
  };
  header: {
    logoText: string;
    navigation: NavItem[];
    ctaText: string;
    ctaUrl: string;
  };
  footer: {
    description: string;
    contactInfo: { email: string; phone: string; website: string };
    socialLinks: { platform: string; url: string; username?: string }[];
    copyright: string;
    newsletterText: string;
    navigation: NavItem[];
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
    keywords: string[];
  };
}

export interface Order {
  _id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: { productTitle: string; quantity: number; price?: number; image?: string }[];
  message: string;
  status: string;
  internalNotes: string;
  createdAt: string;
}

export interface Enquiry {
  _id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  artworkOrService: string;
  message: string;
  status: string;
  internalNotes: string;
  createdAt: string;
}

export interface DashboardStats {
  stats: {
    totalPages: number;
    publishedPages: number;
    totalServices: number;
    totalGalleryImages: number;
    totalGalleryCategories: number;
    totalTestimonials: number;
    totalFAQs: number;
    totalBlogs: number;
    totalProducts: number;
    availableArtwork: number;
    soldArtwork: number;
    newOrders: number;
    newEnquiries: number;
  };
  recentActivity: {
    services: { title: string; updatedAt: string }[];
    blogs: { title: string; updatedAt: string }[];
    products: { title: string; updatedAt: string }[];
  };
}

export interface CartItem {
  productId: string;
  title: string;
  slug: string;
  image: string;
  quantity: number;
  price?: number;
}
