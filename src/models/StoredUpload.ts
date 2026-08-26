import mongoose, { Schema, type Model } from 'mongoose';
import type { UploadFolder } from '@/lib/upload-constants';

export interface IStoredUpload {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const storedUploadSchema = new Schema<IStoredUpload>(
  {
    folder: { type: String, required: true, enum: ['products', 'gallery', 'pages', 'misc'] },
    filename: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

storedUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export const StoredUpload: Model<IStoredUpload> =
  mongoose.models.StoredUpload || mongoose.model<IStoredUpload>('StoredUpload', storedUploadSchema);
