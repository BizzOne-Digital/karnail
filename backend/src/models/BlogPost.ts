import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  heroImage: string;
  content: string;
  categories: string[];
  tags: string[];
  publishDate: Date;
  isPublished: boolean;
  isFeatured: boolean;
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    author: { type: String, default: 'Sukh D. H. Khokhar' },
    heroImage: { type: String, default: '' },
    content: { type: String, default: '' },
    categories: [{ type: String }],
    tags: [{ type: String }],
    publishDate: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    readingTime: { type: Number, default: 5 },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ isPublished: 1, publishDate: -1 });

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
