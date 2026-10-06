import { Document, Schema } from 'mongoose';
import { registerModel } from './registerModel';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'general' },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ category: 1, displayOrder: 1 });

export const FAQ = registerModel<IFAQ>('FAQ', faqSchema);
