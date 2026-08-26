import mongoose, { Document, Schema } from 'mongoose';

export interface IPageImage {
  url: string;
  alt?: string;
  order?: number;
}

export interface IPageSection {
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
  additionalImages: IPageImage[];
  layout: string;
  theme: string;
  order: number;
  isVisible: boolean;
}

export interface IPage extends Document {
  pageKey: string;
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  sections: IPageSection[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pageImageSchema = new Schema<IPageImage>(
  {
    url: { type: String, default: '' },
    alt: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const pageSectionSchema = new Schema<IPageSection>(
  {
    sectionId: { type: String, required: true },
    sectionKey: { type: String, required: true },
    sectionType: { type: String, default: 'content' },
    label: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    description: { type: String, default: '' },
    richText: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    buttonUrl: { type: String, default: '' },
    backgroundImage: { type: String, default: '' },
    mainImage: { type: String, default: '' },
    additionalImages: [pageImageSchema],
    layout: { type: String, default: 'default' },
    theme: { type: String, default: 'dark' },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false }
);

const pageSchema = new Schema<IPage>(
  {
    pageKey: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    sections: [pageSectionSchema],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

pageSchema.index({ pageKey: 1 });
pageSchema.index({ slug: 1 });

export const Page = mongoose.model<IPage>('Page', pageSchema);
