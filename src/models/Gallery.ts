import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryCategory extends Document {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const galleryCategorySchema = new Schema<IGalleryCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

galleryCategorySchema.index({ slug: 1 });

export const GalleryCategory = mongoose.model<IGalleryCategory>('GalleryCategory', galleryCategorySchema);

export interface IGalleryImage extends Document {
  categoryId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  medium: string;
  dimensions: string;
  year: string;
  availability: 'available' | 'sold' | 'not_available' | 'contact';
  price?: number;
  productId?: mongoose.Types.ObjectId;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const galleryImageSchema = new Schema<IGalleryImage>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'GalleryCategory', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    altText: { type: String, default: '' },
    medium: { type: String, default: '' },
    dimensions: { type: String, default: '' },
    year: { type: String, default: '' },
    availability: {
      type: String,
      enum: ['available', 'sold', 'not_available', 'contact'],
      default: 'contact',
    },
    price: { type: Number },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

galleryImageSchema.index({ categoryId: 1, displayOrder: 1 });
galleryImageSchema.index({ isFeatured: 1 });

export const GalleryImage = mongoose.model<IGalleryImage>('GalleryImage', galleryImageSchema);
