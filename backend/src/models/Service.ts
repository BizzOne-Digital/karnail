import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceSection {
  heading: string;
  description: string;
  richText: string;
  mainImage: string;
  additionalImages: { url: string; alt?: string }[];
  order: number;
}

export interface IService extends Document {
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
  detailSections: IServiceSection[];
  pricingInfo: string;
  ctaText: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSectionSchema = new Schema<IServiceSection>(
  {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    richText: { type: String, default: '' },
    mainImage: { type: String, default: '' },
    additionalImages: [{ url: String, alt: String }],
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, default: '' },
    mainImage: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    startingPrice: { type: Number },
    contactForPricing: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    heroHeading: { type: String, default: '' },
    heroDescription: { type: String, default: '' },
    heroBackgroundImage: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    richTextContent: { type: String, default: '' },
    features: [{ type: String }],
    processSteps: [{ title: String, description: String }],
    detailSections: [serviceSectionSchema],
    pricingInfo: { type: String, default: '' },
    ctaText: { type: String, default: 'Get in Touch' },
    ctaUrl: { type: String, default: '/contact' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

serviceSchema.index({ slug: 1 });
serviceSchema.index({ isPublished: 1, displayOrder: 1 });

export const Service = mongoose.model<IService>('Service', serviceSchema);
