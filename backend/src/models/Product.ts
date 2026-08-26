import mongoose, { Document, Schema } from 'mongoose';

export type PurchaseMode = 'contact_for_price' | 'artpal' | 'direct_order' | 'sold' | 'not_available';
export type ProductAvailability = 'available' | 'sold' | 'not_available' | 'contact';

export interface IProduct extends Document {
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
  availability: ProductAvailability;
  purchaseMode: PurchaseMode;
  isOriginal: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  artPalUrl: string;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: '' },
    mainImage: { type: String, default: '' },
    galleryImages: [{ url: String, alt: String }],
    description: { type: String, default: '' },
    story: { type: String, default: '' },
    medium: { type: String, default: '' },
    dimensions: { type: String, default: '' },
    year: { type: String, default: '' },
    sku: { type: String, default: '' },
    price: { type: Number },
    showPrice: { type: Boolean, default: false },
    availability: {
      type: String,
      enum: ['available', 'sold', 'not_available', 'contact'],
      default: 'contact',
    },
    purchaseMode: {
      type: String,
      enum: ['contact_for_price', 'artpal', 'direct_order', 'sold', 'not_available'],
      default: 'contact_for_price',
    },
    isOriginal: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    artPalUrl: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 });
productSchema.index({ isPublished: 1, displayOrder: 1 });
productSchema.index({ category: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
