import mongoose, { Document, Schema } from 'mongoose';

export interface INavItem {
  label: string;
  url: string;
  isVisible: boolean;
  order: number;
}

export interface ISocialLink {
  platform: string;
  url: string;
  username?: string;
}

export interface ISiteSettings extends Document {
  general: {
    artistName: string;
    headline: string;
    shortBio: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    socialLinks: ISocialLink[];
    artPalUrl: string;
  };
  branding: {
    mainLogo: string;
    lightLogo: string;
    darkLogo: string;
    favicon: string;
    placeholderImage: string;
    primaryColors: Record<string, string>;
    footerLogo: string;
    introLogo: string;
    signatureImage: string;
  };
  header: {
    logoText: string;
    navigation: INavItem[];
    ctaText: string;
    ctaUrl: string;
    style: string;
  };
  footer: {
    description: string;
    contactInfo: {
      email: string;
      phone: string;
      website: string;
    };
    socialLinks: ISocialLink[];
    copyright: string;
    newsletterText: string;
    navigation: INavItem[];
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
    keywords: string[];
  };
  email: {
    adminNotificationEmail: string;
    senderName: string;
    customerConfirmationMessage: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const navItemSchema = new Schema<INavItem>(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const socialLinkSchema = new Schema<ISocialLink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    username: { type: String },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    general: {
      artistName: { type: String, default: 'Sukh D. H. Khokhar' },
      headline: { type: String, default: 'Captivating Art of Sukh D. H. Khokhar' },
      shortBio: {
        type: String,
        default:
          'Mystery writer, mural artist, and visual storyteller creating captivating art that blends imagination, colour, and narrative.',
      },
      email: { type: String, default: 'khokharsukh@gmail.com' },
      phone: { type: String, default: '(403) 991-5694' },
      website: { type: String, default: 'www.mysteryoftherose.com' },
      address: { type: String, default: '' },
      socialLinks: [socialLinkSchema],
      artPalUrl: { type: String, default: 'https://www.artpal.com/sukh2' },
    },
    branding: {
      mainLogo: { type: String, default: '' },
      lightLogo: { type: String, default: '' },
      darkLogo: { type: String, default: '' },
      favicon: { type: String, default: '' },
      placeholderImage: { type: String, default: '/placeholder-artwork.jpg' },
      primaryColors: {
        type: Map,
        of: String,
        default: {
          galleryBlack: '#090807',
          softBlack: '#15110F',
          deepOxblood: '#681923',
          artistCrimson: '#9E2531',
          warmCream: '#F4E6D0',
          lightCanvas: '#FFF8EA',
          mutedBeige: '#DCC7AA',
          agedGold: '#B78A4D',
          warmGray: '#A89E92',
        },
      },
      footerLogo: { type: String, default: '' },
      introLogo: { type: String, default: '' },
      signatureImage: { type: String, default: '' },
    },
    header: {
      logoText: { type: String, default: 'Sukh D. H. Khokhar' },
      navigation: {
        type: [navItemSchema],
        default: [
          { label: 'Home', url: '/', isVisible: true, order: 0 },
          { label: 'About', url: '/about', isVisible: true, order: 1 },
          { label: 'Services', url: '/services', isVisible: true, order: 2 },
          { label: 'Gallery', url: '/gallery', isVisible: true, order: 3 },
          { label: 'Shop', url: '/shop', isVisible: true, order: 4 },
          { label: 'Contact', url: '/contact', isVisible: true, order: 5 },
        ],
      },
      ctaText: { type: String, default: 'Explore Art' },
      ctaUrl: { type: String, default: '/gallery' },
      style: { type: String, default: 'transparent' },
    },
    footer: {
      description: {
        type: String,
        default:
          'Captivating mystical art by Sukh D. H. Khokhar — mystery writer, mural artist, and visual storyteller.',
      },
      contactInfo: {
        email: { type: String, default: 'khokharsukh@gmail.com' },
        phone: { type: String, default: '(403) 991-5694' },
        website: { type: String, default: 'www.mysteryoftherose.com' },
      },
      socialLinks: [socialLinkSchema],
      copyright: {
        type: String,
        default: `© ${new Date().getFullYear()} Sukh D. H. Khokhar. All rights reserved.`,
      },
      newsletterText: {
        type: String,
        default: 'Subscribe to receive updates on new artwork, exhibitions, and journal entries.',
      },
      navigation: {
        type: [navItemSchema],
        default: [
          { label: 'About', url: '/about', isVisible: true, order: 0 },
          { label: 'Gallery', url: '/gallery', isVisible: true, order: 1 },
          { label: 'Shop', url: '/shop', isVisible: true, order: 2 },
          { label: 'Contact', url: '/contact', isVisible: true, order: 3 },
          { label: 'Privacy Policy', url: '/privacy', isVisible: true, order: 4 },
          { label: 'Terms', url: '/terms', isVisible: true, order: 5 },
        ],
      },
    },
    seo: {
      defaultTitle: { type: String, default: 'Sukh D. H. Khokhar | Mystery Art & Visual Storytelling' },
      defaultDescription: {
        type: String,
        default:
          'Discover captivating mystical paintings, murals, and creative services by Sukh D. H. Khokhar — mystery writer, mural artist, and visual storyteller.',
      },
      defaultOgImage: { type: String, default: '' },
      keywords: {
        type: [String],
        default: ['mystery art', 'mural artist', 'paintings', 'Sukh Khokhar', 'visual artist'],
      },
    },
    email: {
      adminNotificationEmail: { type: String, default: 'khokharsukh@gmail.com' },
      senderName: { type: String, default: 'Sukh D. H. Khokhar' },
      customerConfirmationMessage: {
        type: String,
        default: 'Thank you for your enquiry. We will respond within 48 hours.',
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
