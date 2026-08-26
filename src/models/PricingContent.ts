import mongoose, { Document, Schema } from 'mongoose';

export interface IPricingCard {
  title: string;
  description: string;
  icon?: string;
  buttonText: string;
  buttonUrl: string;
  order: number;
}

export interface IPricingContent extends Document {
  heroHeading: string;
  heroDescription: string;
  heroBackgroundImage: string;
  introduction: string;
  contactForPricingMessage: string;
  pricingCards: IPricingCard[];
  commissionNotes: string;
  artPalUrl: string;
  ctaText: string;
  ctaUrl: string;
  pricingFaqs: { question: string; answer: string }[];
  mainImage: string;
  additionalImages: { url: string; alt?: string }[];
  sectionVisibility: Record<string, boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const pricingContentSchema = new Schema<IPricingContent>(
  {
    heroHeading: { type: String, default: 'Artwork Pricing' },
    heroDescription: { type: String, default: '' },
    heroBackgroundImage: { type: String, default: '' },
    introduction: { type: String, default: '' },
    contactForPricingMessage: {
      type: String,
      default: 'Artwork pricing depends on the piece, size, medium, availability, and delivery requirements.',
    },
    pricingCards: [
      {
        title: String,
        description: String,
        icon: String,
        buttonText: String,
        buttonUrl: String,
        order: Number,
      },
    ],
    commissionNotes: { type: String, default: '' },
    artPalUrl: { type: String, default: 'https://www.artpal.com/sukh2' },
    ctaText: { type: String, default: 'Contact for Pricing' },
    ctaUrl: { type: String, default: '/contact' },
    pricingFaqs: [{ question: String, answer: String }],
    mainImage: { type: String, default: '' },
    additionalImages: [{ url: String, alt: String }],
    sectionVisibility: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const PricingContent = mongoose.model<IPricingContent>('PricingContent', pricingContentSchema);
