import mongoose, { Document, Schema } from 'mongoose';

export type EnquiryType =
  | 'general'
  | 'artwork'
  | 'mural'
  | 'commission'
  | 'product'
  | 'newsletter';

export type EnquiryStatus = 'new' | 'contacted' | 'in_discussion' | 'confirmed' | 'completed' | 'cancelled';

export interface IEnquiry extends Document {
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType;
  artworkOrService: string;
  message: string;
  status: EnquiryStatus;
  internalNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    referenceNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    enquiryType: {
      type: String,
      enum: ['general', 'artwork', 'mural', 'commission', 'product', 'newsletter'],
      default: 'general',
    },
    artworkOrService: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_discussion', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
    },
    internalNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

enquirySchema.index({ referenceNumber: 1 });
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ enquiryType: 1 });

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);
