import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  customerTitle: string;
  review: string;
  rating: number;
  image?: string;
  relatedArtwork?: string;
  relatedService?: mongoose.Types.ObjectId;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    customerName: { type: String, required: true, trim: true },
    customerTitle: { type: String, default: '' },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String, default: '' },
    relatedArtwork: { type: String, default: '' },
    relatedService: { type: Schema.Types.ObjectId, ref: 'Service' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

testimonialSchema.index({ isPublished: 1, displayOrder: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
