import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { config } from '@/server/config';
import { createSection } from '../utils/sectionBuilder';
import {
  AdminUser,
  Page,
  Service,
  GalleryCategory,
  GalleryImage,
  Testimonial,
  FAQ,
  PricingContent,
  BlogPost,
  Product,
  SiteSettings,
} from '@/models';

async function seedAdmin() {
  const existing = await AdminUser.findOne({ email: config.adminSeedEmail });
  if (existing) {
    console.log('Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(config.adminSeedPassword, 12);
  await AdminUser.create({
    email: config.adminSeedEmail,
    password: hashedPassword,
    name: 'Administrator',
    role: 'superadmin',
  });
  console.log('Admin user created:', config.adminSeedEmail);
}

async function seedSettings() {
  const headerNav = [
    { label: 'Home', url: '/', isVisible: true, order: 0 },
    { label: 'About', url: '/about', isVisible: true, order: 1 },
    { label: 'Services', url: '/services', isVisible: true, order: 2 },
    { label: 'Gallery', url: '/gallery', isVisible: true, order: 3 },
    { label: 'Buy the Books', url: '/books', isVisible: true, order: 4 },
    { label: 'Shop', url: '/shop', isVisible: true, order: 5 },
    { label: 'Contact', url: '/contact', isVisible: true, order: 6 },
  ];

  const contactDefaults = {
    email: 'khokharsukh@gmail.com',
    phone: '(403) 991-5694',
    website: 'www.mysteryoftherose.com',
    artPalUrl: 'https://www.artpal.com/sukh2',
  };

  const existing = await SiteSettings.findOne();
  if (existing) {
    existing.header.navigation = headerNav;
    existing.general.email = contactDefaults.email;
    existing.general.website = contactDefaults.website;
    existing.general.artPalUrl = contactDefaults.artPalUrl;
    existing.footer.contactInfo.email = contactDefaults.email;
    existing.footer.contactInfo.website = contactDefaults.website;
    existing.email.adminNotificationEmail = contactDefaults.email;
    await existing.save();
    console.log('Site settings updated');
    return;
  }

  await SiteSettings.create({
    general: {
      email: contactDefaults.email,
      phone: contactDefaults.phone,
      website: contactDefaults.website,
      artPalUrl: contactDefaults.artPalUrl,
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/Sukhkhokhar47', username: 'Sukhkhokhar47' },
        { platform: 'Facebook', url: 'https://facebook.com/Sukhkhokhar47', username: 'Sukhkhokhar47' },
      ],
    },
    header: { navigation: headerNav },
    footer: {
      contactInfo: contactDefaults,
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/Sukhkhokhar47', username: 'Sukhkhokhar47' },
        { platform: 'Facebook', url: 'https://facebook.com/Sukhkhokhar47', username: 'Sukhkhokhar47' },
      ],
    },
  });
  console.log('Site settings created');
}

async function seedPages() {
  const pageKeys = ['home', 'about', 'services', 'gallery', 'testimonials', 'faqs', 'pricing', 'blog', 'shop', 'contact'];
  const existing = await Page.countDocuments();
  if (existing >= pageKeys.length) {
    console.log('Pages already seeded');
    return;
  }

  const pages = [
    {
      pageKey: 'home',
      title: 'Home',
      slug: '/',
      seoTitle: 'Sukh D. H. Khokhar | Captivating Mystery Art',
      seoDescription: 'Enter a world where mystery, imagination, colour, and storytelling meet across canvas, murals, and the written word.',
      sections: [
        createSection({
          sectionKey: 'hero',
          sectionType: 'hero',
          label: 'Cinematic Hero',
          eyebrow: 'Mystery Writer • Mural Artist • Visual Storyteller',
          heading: 'Captivating Art of Sukh D. H. Khokhar',
          description: 'Enter a world where mystery, imagination, colour, and storytelling meet across canvas, murals, and the written word.',
          buttonText: 'Explore the Collection',
          buttonUrl: '/gallery',
          backgroundImage: '/banner/home-banner-wrapper.jpg',
          layout: 'cinematic-fullbleed',
          theme: 'dark',
          order: 0,
        }),
        createSection({
          sectionKey: 'collection-statement',
          sectionType: 'statement',
          label: 'Collection Statement',
          heading: 'Nearly 200 Paintings. Countless Stories. One Mysterious Imagination.',
          layout: 'full-width-text',
          theme: 'dark',
          order: 1,
        }),
        createSection({
          sectionKey: 'featured-artwork',
          sectionType: 'dynamic',
          label: 'Featured Artwork',
          heading: 'Featured Artwork',
          subheading: 'Selected pieces from the collection',
          layout: 'editorial-grid',
          theme: 'dark',
          order: 2,
        }),
        createSection({
          sectionKey: 'meet-artist',
          sectionType: 'content',
          label: 'Meet the Artist',
          heading: 'Meet the Artist',
          description: 'Sukh D. H. Khokhar is a mystery writer, mural artist, and visual storyteller whose work weaves together narrative intrigue and bold artistic expression. With nearly 200 mystical paintings in her collection, each piece invites viewers into a world of imagination and wonder.',
          mainImage: '/images/artist-statement-portrait.jpg',
          buttonText: 'Discover the Artist',
          buttonUrl: '/about',
          layout: 'layered-composition',
          theme: 'dark',
          order: 3,
        }),
        createSection({
          sectionKey: 'services-preview',
          sectionType: 'dynamic',
          label: 'Creative Services',
          heading: 'Creative Services',
          subheading: 'From original paintings to custom murals and commissioned artwork',
          layout: 'cards',
          theme: 'dark',
          order: 4,
        }),
        createSection({
          sectionKey: 'gallery-preview',
          sectionType: 'dynamic',
          label: 'Gallery Preview',
          heading: 'Immersive Gallery',
          buttonText: 'View Full Gallery',
          buttonUrl: '/gallery',
          layout: 'horizontal-scroll',
          theme: 'dark',
          order: 5,
        }),
        createSection({
          sectionKey: 'journal-preview',
          sectionType: 'dynamic',
          label: "Artist's Journal",
          heading: "The Artist's Journal",
          subheading: 'Stories, insights, and creative reflections',
          buttonText: 'Read the Journal',
          buttonUrl: '/blog',
          layout: 'editorial-cards',
          theme: 'cream',
          order: 6,
        }),
        createSection({
          sectionKey: 'testimonials',
          sectionType: 'dynamic',
          label: 'Testimonials',
          heading: 'What Collectors Say',
          layout: 'slider',
          theme: 'dark',
          order: 7,
        }),
        createSection({
          sectionKey: 'artpal-cta',
          sectionType: 'cta',
          label: 'ArtPal CTA',
          heading: 'Discover More Original Works and Current Price Listings',
          description: 'Browse the full collection with current pricing on ArtPal.',
          buttonText: 'Visit the ArtPal Collection',
          buttonUrl: 'https://www.artpal.com/sukh2',
          layout: 'centered',
          theme: 'red-accent',
          order: 8,
        }),
        createSection({
          sectionKey: 'contact-cta',
          sectionType: 'cta',
          label: 'Contact CTA',
          heading: 'Begin Your Creative Journey',
          description: 'Whether you are a collector, gallery owner, interior designer, or seeking a custom mural — I would love to hear from you.',
          buttonText: 'Get in Touch',
          buttonUrl: '/contact',
          layout: 'dramatic',
          theme: 'dark',
          order: 9,
        }),
      ],
    },
    {
      pageKey: 'about',
      title: 'About',
      slug: '/about',
      seoTitle: 'About Sukh D. H. Khokhar | Mystery Writer & Mural Artist',
      seoDescription: 'Learn about Sukh D. H. Khokhar — mystery writer, mural artist, and visual storyteller creating captivating mystical art.',
      sections: [
        createSection({
          sectionKey: 'hero',
          sectionType: 'hero',
          label: 'Hero',
          heading: 'Sukh D. H. Khokhar',
          eyebrow: 'About the Author',
          layout: 'cinematic',
          order: 0,
        }),
        createSection({
          sectionKey: 'introduction',
          sectionType: 'content',
          label: 'About the Author',
          heading: 'About the Author',
          description:
            'Sukh D. H. Khokhar is a Canadian mystery writer, poet, multimedia mural artist, illustrator, and educator based in Calgary, Alberta.',
          order: 1,
        }),
        createSection({ sectionKey: 'contact-cta', sectionType: 'cta', label: 'Contact CTA', heading: 'Connect with the Artist', buttonText: 'Contact Sukh', buttonUrl: '/contact', order: 2 }),
      ],
    },
    {
      pageKey: 'services',
      title: 'Services',
      slug: '/services',
      seoTitle: 'Creative Services | Sukh D. H. Khokhar',
      seoDescription: 'Original paintings, custom murals, commissioned artwork, and mystery writing services.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'Creative Services', eyebrow: 'Services', description: 'From mystical paintings to custom murals and commissioned artwork — discover how Sukh can bring your vision to life.', order: 0 }),
        createSection({ sectionKey: 'introduction', sectionType: 'content', label: 'Introduction', heading: 'Art That Tells Your Story', description: 'Every commission is a collaboration between artist and client, resulting in work that is both deeply personal and universally captivating.', order: 1 }),
        createSection({ sectionKey: 'services-list', sectionType: 'dynamic', label: 'Services List', heading: 'Our Services', layout: 'cards', order: 2 }),
        createSection({ sectionKey: 'process', sectionType: 'content', label: 'Creative Process', heading: 'The Commission Process', description: 'From initial consultation to final delivery, every step is designed to ensure your vision is realized with artistry and care.', order: 3 }),
        createSection({ sectionKey: 'experience', sectionType: 'content', label: 'Commission Experience', heading: 'The Commission Experience', description: 'Working with Sukh means entering a creative partnership built on communication, trust, and shared passion for exceptional art.', order: 4 }),
        createSection({ sectionKey: 'featured-work', sectionType: 'dynamic', label: 'Featured Work', heading: 'Featured Commissions', layout: 'gallery', order: 5 }),
        createSection({ sectionKey: 'faq-preview', sectionType: 'dynamic', label: 'FAQ Preview', heading: 'Common Questions', buttonText: 'View All FAQs', buttonUrl: '/faqs', order: 6 }),
        createSection({ sectionKey: 'contact-cta', sectionType: 'cta', label: 'Contact CTA', heading: 'Ready to Commission?', buttonText: 'Start a Conversation', buttonUrl: '/contact', order: 7 }),
      ],
    },
    {
      pageKey: 'gallery',
      title: 'Gallery',
      slug: '/gallery',
      seoTitle: 'Art Gallery | Sukh D. H. Khokhar',
      seoDescription: 'Explore nearly 200 mystical paintings by Sukh D. H. Khokhar.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'The Gallery', eyebrow: 'Collection', description: 'Nearly 200 paintings spanning mystical themes, original works, murals, and commissioned pieces.', order: 0 }),
        createSection({ sectionKey: 'introduction', sectionType: 'content', label: 'Introduction', heading: 'A World of Mystical Art', description: 'Each painting in this collection tells a story — of mystery, imagination, and the boundless creativity of the human spirit.', order: 1 }),
        createSection({ sectionKey: 'gallery-grid', sectionType: 'dynamic', label: 'Gallery Grid', heading: 'Explore the Collection', layout: 'masonry', order: 2 }),
        createSection({ sectionKey: 'featured-collection', sectionType: 'dynamic', label: 'Featured Collection', heading: 'Featured Works', layout: 'featured', order: 3 }),
        createSection({ sectionKey: 'artpal-cta', sectionType: 'cta', label: 'ArtPal CTA', heading: 'View Current Listings on ArtPal', buttonText: 'Visit ArtPal', buttonUrl: 'https://www.artpal.com/sukh2', order: 4 }),
        createSection({ sectionKey: 'contact-cta', sectionType: 'cta', label: 'Contact CTA', heading: 'Interested in a Piece?', buttonText: 'Enquire Now', buttonUrl: '/contact', order: 5 }),
      ],
    },
    {
      pageKey: 'testimonials',
      title: 'Testimonials',
      slug: '/testimonials',
      seoTitle: 'Testimonials | Sukh D. H. Khokhar',
      seoDescription: 'Read what collectors and clients say about Sukh D. H. Khokhar\'s artwork and services.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'Words from Collectors', eyebrow: 'Testimonials', order: 0 }),
        createSection({ sectionKey: 'introduction', sectionType: 'content', label: 'Introduction', heading: 'Stories from the Studio', description: 'Hear from collectors, gallery owners, and clients who have experienced the magic of Sukh\'s art firsthand.', order: 1 }),
        createSection({ sectionKey: 'testimonial-slider', sectionType: 'dynamic', label: 'Testimonial Slider', heading: 'Featured Reviews', layout: 'slider', order: 2 }),
        createSection({ sectionKey: 'testimonial-grid', sectionType: 'dynamic', label: 'Testimonial Grid', heading: 'All Testimonials', layout: 'grid', order: 3 }),
        createSection({ sectionKey: 'collage', sectionType: 'gallery', label: 'Artwork Collage', heading: 'Art in Collectors\' Homes', layout: 'collage', order: 4 }),
        createSection({ sectionKey: 'contact-cta', sectionType: 'cta', label: 'Contact CTA', heading: 'Share Your Experience', buttonText: 'Get in Touch', buttonUrl: '/contact', order: 5 }),
      ],
    },
    {
      pageKey: 'faqs',
      title: 'FAQs',
      slug: '/faqs',
      seoTitle: 'Frequently Asked Questions | Sukh D. H. Khokhar',
      seoDescription: 'Answers to common questions about artwork, commissions, shipping, and more.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'Frequently Asked Questions', eyebrow: 'FAQs', order: 0 }),
        createSection({ sectionKey: 'introduction', sectionType: 'content', label: 'Introduction', heading: 'How Can We Help?', description: 'Find answers to the most common questions about artwork, commissions, pricing, and delivery.', order: 1 }),
        createSection({ sectionKey: 'faq-list', sectionType: 'dynamic', label: 'FAQ List', heading: 'Questions & Answers', layout: 'accordion', order: 2 }),
        createSection({ sectionKey: 'artwork-info', sectionType: 'content', label: 'Artwork Enquiry', heading: 'Artwork Enquiries', description: 'Interested in a specific piece? Contact us with the artwork title and we will provide details on availability and pricing.', order: 3 }),
        createSection({ sectionKey: 'commission-info', sectionType: 'content', label: 'Commission Info', heading: 'Commission Information', description: 'Custom commissions are welcomed. Share your vision and we will discuss timeline, pricing, and creative direction.', order: 4 }),
        createSection({ sectionKey: 'shipping-info', sectionType: 'content', label: 'Shipping Info', heading: 'Shipping & Availability', description: 'Shipping arrangements vary by piece size and destination. We work with trusted carriers to ensure safe delivery of your artwork.', order: 5 }),
        createSection({ sectionKey: 'contact-cta', sectionType: 'cta', label: 'Contact CTA', heading: 'Still Have Questions?', buttonText: 'Contact Us', buttonUrl: '/contact', order: 6 }),
      ],
    },
    {
      pageKey: 'pricing',
      title: 'Pricing',
      slug: '/pricing',
      seoTitle: 'Artwork Pricing | Sukh D. H. Khokhar',
      seoDescription: 'Contact for pricing on original artwork, commissions, and murals.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'Artwork Pricing', eyebrow: 'Pricing', order: 0 }),
        createSection({ sectionKey: 'introduction', sectionType: 'content', label: 'Introduction', heading: 'Investment in Original Art', description: 'Artwork pricing depends on the piece, size, medium, availability, and delivery requirements.', order: 1 }),
      ],
    },
    {
      pageKey: 'blog',
      title: 'Journal',
      slug: '/blog',
      seoTitle: "The Artist's Journal | Sukh D. H. Khokhar",
      seoDescription: 'Stories, insights, and creative reflections from the studio.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: "The Artist's Journal", eyebrow: 'Journal', description: 'Stories from the studio, creative insights, and reflections on art, mystery, and imagination.', order: 0 }),
      ],
    },
    {
      pageKey: 'shop',
      title: 'Shop',
      slug: '/shop',
      seoTitle: 'Shop Artwork | Sukh D. H. Khokhar',
      seoDescription: 'Browse and enquire about original artwork by Sukh D. H. Khokhar.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'The Collection', eyebrow: 'Shop', description: 'Browse original artwork available for purchase and enquiry.', order: 0 }),
      ],
    },
    {
      pageKey: 'contact',
      title: 'Contact',
      slug: '/contact',
      seoTitle: 'Contact Sukh D. H. Khokhar',
      seoDescription: 'Get in touch for artwork enquiries, commissions, murals, and collaborations.',
      sections: [
        createSection({ sectionKey: 'hero', sectionType: 'hero', label: 'Hero', heading: 'Get in Touch', eyebrow: 'Contact', description: 'Whether you are a collector, gallery owner, interior designer, or seeking a custom mural — I would love to hear from you.', order: 0 }),
        createSection({ sectionKey: 'introduction', sectionType: 'content', label: 'Introduction', heading: 'Start a Conversation', description: 'Every great collaboration begins with a conversation. Share your vision, ask a question, or simply say hello.', order: 1 }),
        createSection({ sectionKey: 'contact-form', sectionType: 'form', label: 'Contact Form', layout: 'split', order: 2 }),
        createSection({ sectionKey: 'faq-preview', sectionType: 'dynamic', label: 'FAQ Preview', heading: 'Quick Answers', buttonText: 'View All FAQs', buttonUrl: '/faqs', order: 3 }),
      ],
    },
  ];

  for (const pageData of pages) {
    const exists = await Page.findOne({ pageKey: pageData.pageKey });
    if (!exists) {
      await Page.create(pageData);
    }
  }
  console.log('Pages seeded');
}

async function seedServices() {
  const count = await Service.countDocuments();
  if (count > 0) {
    console.log('Services already seeded');
    return;
  }

  const services = [
    {
      title: 'Mystical Art Collection',
      slug: 'mystical-art-collection',
      shortDescription: 'Explore nearly 200 mystical paintings that blend imagination, colour, and narrative intrigue.',
      contactForPricing: true,
      displayOrder: 0,
      isFeatured: true,
      heroHeading: 'Mystical Art Collection',
      heroDescription: 'A vast collection of paintings that transport viewers into realms of mystery and wonder.',
      fullDescription: 'The mystical art collection represents the heart of Sukh\'s artistic practice — nearly 200 paintings that weave together narrative intrigue, bold colour, and imaginative landscapes.',
      features: ['Nearly 200 original paintings', 'Mystical and narrative themes', 'Various sizes and mediums', 'Available for purchase and enquiry'],
      processSteps: [
        { title: 'Browse', description: 'Explore the gallery and ArtPal listings' },
        { title: 'Enquire', description: 'Contact us about pieces that interest you' },
        { title: 'Acquire', description: 'Complete your purchase or commission' },
      ],
      ctaText: 'Explore the Collection',
      ctaUrl: '/gallery',
    },
    {
      title: 'Original Paintings',
      slug: 'original-paintings',
      shortDescription: 'Acquire unique original paintings crafted with passion and artistic mastery.',
      contactForPricing: true,
      displayOrder: 1,
      isFeatured: true,
      heroHeading: 'Original Paintings',
      heroDescription: 'Each original painting is a one-of-a-kind work of art, created with meticulous attention to detail.',
      fullDescription: 'Original paintings by Sukh D. H. Khokhar are unique works that cannot be replicated. Each piece carries the artist\'s signature style and creative vision.',
      features: ['One-of-a-kind originals', 'Certificate of authenticity', 'Professional packaging', 'Worldwide shipping available'],
      ctaText: 'View Available Works',
      ctaUrl: '/shop',
    },
    {
      title: 'Custom Mural Art',
      slug: 'custom-mural-art',
      shortDescription: 'Transform your space with large-scale custom murals that captivate and inspire.',
      contactForPricing: true,
      displayOrder: 2,
      isFeatured: true,
      heroHeading: 'Custom Mural Art',
      heroDescription: 'Bring mystical artistry to your walls with bespoke mural commissions.',
      fullDescription: 'Custom murals by Sukh transform ordinary walls into extraordinary canvases. From residential spaces to commercial environments, each mural is designed to complement and elevate its surroundings.',
      features: ['Site consultation', 'Custom design process', 'Professional installation', 'Interior and exterior options'],
      ctaText: 'Discuss Your Mural',
      ctaUrl: '/contact',
    },
    {
      title: 'Commissioned Artwork',
      slug: 'commissioned-artwork',
      shortDescription: 'Commission a bespoke piece tailored to your vision, space, and aesthetic preferences.',
      contactForPricing: true,
      displayOrder: 3,
      isFeatured: false,
      heroHeading: 'Commissioned Artwork',
      heroDescription: 'Collaborate with Sukh to create a piece that is uniquely yours.',
      fullDescription: 'Commissioned artwork offers the opportunity to own a piece created specifically for you. Share your vision, and Sukh will bring it to life on canvas.',
      features: ['Personal consultation', 'Progress updates', 'Custom sizing', 'Choice of medium'],
      ctaText: 'Start a Commission',
      ctaUrl: '/contact',
    },
    {
      title: 'Mystery Writing and Storytelling',
      slug: 'mystery-writing-storytelling',
      shortDescription: 'Engage Sukh\'s narrative talents for creative writing, storytelling, and literary projects.',
      contactForPricing: true,
      displayOrder: 4,
      isFeatured: false,
      heroHeading: 'Mystery Writing and Storytelling',
      heroDescription: 'Where visual art meets the written word — explore collaborative storytelling opportunities.',
      fullDescription: 'As a mystery writer, Sukh brings narrative depth to every creative project. From collaborative storytelling to literary commissions, his writing complements his visual artistry.',
      features: ['Mystery and narrative writing', 'Creative collaboration', 'Story development', 'Literary projects'],
      ctaText: 'Discuss a Project',
      ctaUrl: '/contact',
    },
  ];

  await Service.insertMany(services);
  console.log('Services seeded');
}

async function seedGallery() {
  let categories = await GalleryCategory.find().sort({ displayOrder: 1 });

  if (categories.length === 0) {
    categories = await GalleryCategory.insertMany([
      { name: 'Mystical Paintings', slug: 'mystical-paintings', description: 'Paintings that explore mystical themes and narrative intrigue.', displayOrder: 0 },
      { name: 'Original Paintings', slug: 'original-paintings', description: 'Unique original works available for collectors.', displayOrder: 1 },
      { name: 'Murals', slug: 'murals', description: 'Large-scale mural works for public and private spaces.', displayOrder: 2 },
      { name: 'Commissioned Work', slug: 'commissioned-work', description: 'Bespoke commissioned pieces created for clients.', displayOrder: 3 },
      { name: 'Studio and Process', slug: 'studio-and-process', description: 'Behind-the-scenes glimpses into the creative process.', displayOrder: 4 },
    ]);
    console.log('Gallery categories seeded');
  }

  const imageCount = await GalleryImage.countDocuments();
  if (imageCount > 0) {
    console.log('Gallery images already seeded');
    return;
  }

  const bySlug = (slug: string) => categories.find((c) => c.slug === slug)!._id;

  const mystical = bySlug('mystical-paintings');
  const original = bySlug('original-paintings');
  const murals = bySlug('murals');
  const commissioned = bySlug('commissioned-work');
  const studio = bySlug('studio-and-process');

  await GalleryImage.insertMany([
    {
      categoryId: mystical,
      title: 'The Hidden Archway',
      description: 'A shadowed passage where mystery and architecture converge in deep crimson and gold.',
      imageUrl: '/gallery/mystical-archway.jpg',
      altText: 'Mystical archway painting in crimson and gold tones',
      medium: 'Acrylic on Canvas',
      dimensions: '24" x 36"',
      year: '2024',
      availability: 'contact',
      isFeatured: true,
      displayOrder: 0,
    },
    {
      categoryId: mystical,
      title: 'Crimson Passage',
      description: 'Expressive brushwork and layered pigment evoke a narrative of intrigue and revelation.',
      imageUrl: '/gallery/crimson-abstract.jpg',
      altText: 'Abstract crimson and black mystical painting',
      medium: 'Mixed Media on Canvas',
      dimensions: '30" x 40"',
      year: '2023',
      availability: 'contact',
      isFeatured: true,
      displayOrder: 1,
    },
    {
      categoryId: mystical,
      title: 'Mystery at Dusk',
      description: 'Atmospheric tones and textured surfaces suggest a story unfolding at twilight.',
      imageUrl: '/gallery/mystery-at-dusk.jpg',
      altText: 'Dark atmospheric mystical artwork',
      medium: 'Oil on Canvas',
      dimensions: '20" x 24"',
      year: '2024',
      availability: 'contact',
      isFeatured: true,
      displayOrder: 2,
    },
    {
      categoryId: original,
      title: 'Golden Spiral',
      description: 'Geometric motifs and luminous gold accents create a sense of timeless movement.',
      imageUrl: '/gallery/golden-spiral.jpg',
      altText: 'Original painting with golden spiral motifs',
      medium: 'Acrylic on Canvas',
      dimensions: '18" x 24"',
      year: '2024',
      availability: 'available',
      isFeatured: true,
      displayOrder: 3,
    },
    {
      categoryId: original,
      title: 'Velvet Shadows',
      description: 'Rich, velvety darks contrast with warm highlights in this collector favourite.',
      imageUrl: '/gallery/velvet-shadows.jpg',
      altText: 'Original painting with deep velvet shadows',
      medium: 'Acrylic on Canvas',
      dimensions: '24" x 30"',
      year: '2023',
      availability: 'contact',
      isFeatured: true,
      displayOrder: 4,
    },
    {
      categoryId: original,
      title: 'Atmospheric Reverie',
      description: 'A contemplative landscape rendered in moody, cinematic tones.',
      imageUrl: '/gallery/atmospheric-landscape.jpg',
      altText: 'Atmospheric landscape original painting',
      medium: 'Oil on Canvas',
      dimensions: '22" x 28"',
      year: '2022',
      availability: 'contact',
      isFeatured: false,
      displayOrder: 5,
    },
    {
      categoryId: original,
      title: 'Architectural Dreams',
      description: 'Structural forms dissolve into imagination — a hallmark of the mystery art style.',
      imageUrl: '/gallery/architectural-dreams.jpg',
      altText: 'Architectural dreamscape original painting',
      medium: 'Acrylic on Canvas',
      dimensions: '26" x 34"',
      year: '2024',
      availability: 'contact',
      isFeatured: false,
      displayOrder: 6,
    },
    {
      categoryId: murals,
      title: 'Urban Mural Vision',
      description: 'Large-scale mural concept bringing narrative art into architectural space.',
      imageUrl: '/gallery/mural-wall.jpg',
      altText: 'Large-scale mural artwork on wall',
      medium: 'Mural — Acrylic',
      dimensions: 'Custom Scale',
      year: '2024',
      availability: 'contact',
      isFeatured: true,
      displayOrder: 7,
    },
    {
      categoryId: murals,
      title: 'Echoes in Gold',
      description: 'Sweeping mural composition with gold leaf accents and dramatic contrast.',
      imageUrl: '/gallery/echoes-in-gold.jpg',
      altText: 'Mural with gold accents and dramatic lighting',
      medium: 'Mural — Mixed Media',
      dimensions: 'Custom Scale',
      year: '2023',
      availability: 'contact',
      isFeatured: false,
      displayOrder: 8,
    },
    {
      categoryId: commissioned,
      title: "Collector's Selection",
      description: 'A commissioned piece designed to anchor a private collection with mystery and warmth.',
      imageUrl: '/gallery/gallery-collection.jpg',
      altText: 'Commissioned artwork displayed in gallery setting',
      medium: 'Acrylic on Canvas',
      dimensions: '30" x 36"',
      year: '2024',
      availability: 'sold',
      isFeatured: true,
      displayOrder: 9,
    },
    {
      categoryId: studio,
      title: 'Inside the Studio',
      description: 'The creative environment where paintings, murals, and stories take shape.',
      imageUrl: '/gallery/studio-gallery.jpg',
      altText: 'Artist studio with framed paintings and creative tools',
      medium: 'Studio Documentation',
      dimensions: '—',
      year: '2024',
      availability: 'not_available',
      isFeatured: true,
      displayOrder: 10,
    },
  ]);

  await GalleryCategory.updateOne({ _id: mystical }, { coverImage: '/gallery/mystical-archway.jpg' });
  await GalleryCategory.updateOne({ _id: original }, { coverImage: '/gallery/golden-spiral.jpg' });
  await GalleryCategory.updateOne({ _id: murals }, { coverImage: '/gallery/mural-wall.jpg' });
  await GalleryCategory.updateOne({ _id: commissioned }, { coverImage: '/gallery/gallery-collection.jpg' });
  await GalleryCategory.updateOne({ _id: studio }, { coverImage: '/gallery/studio-gallery.jpg' });

  console.log('Gallery images seeded');
}

async function seedTestimonials() {
  const count = await Testimonial.countDocuments();
  if (count > 0) return;

  await Testimonial.insertMany([
    {
      customerName: 'Marcia Carroll',
      customerTitle: 'Past Core Reporter to President Lyndon B. Johnson, White House',
      review: 'Reading the book, The Mystery of the Rose is like watching a film—the story grips you; the characters become alive and the images burn in your memory forever . . .',
      rating: 5,
      isFeatured: true,
      displayOrder: 0,
    },
    {
      customerName: 'Madhumati',
      customerTitle: 'Bollywood Film Actress/Dancer',
      review: 'Reading the book, Dark Mystery by Sukh Khokhar, is a deeply spiritual experience. The story, the images, and the poetry are truly exceptional.',
      rating: 5,
      isFeatured: true,
      displayOrder: 1,
    },
    {
      customerName: 'Graham Buckingham',
      customerTitle: 'Author — Thompson: A City and its People',
      review: 'I urge everyone to step with Ms. Khokhar "into the magic land." Her artwork has become her unique trademark.',
      rating: 5,
      isFeatured: true,
      displayOrder: 2,
    },
    {
      customerName: 'Elizabeth A. Bennett',
      customerTitle: 'Manitoba Human Rights Commission',
      review: 'The book, Dark Mystery by the author Sukh D.H. Khokhar, is indeed a masterpiece! The poetry is intriguing, and the mystery is intense.',
      rating: 5,
      isFeatured: true,
      displayOrder: 3,
    },
  ]);
  console.log('Testimonials seeded');
}

async function seedFAQs() {
  const count = await FAQ.countDocuments();
  if (count > 0) return;

  await FAQ.insertMany([
    { question: 'How do I purchase an artwork?', answer: 'You can browse available works in our gallery and shop, enquire directly through our contact form, or visit our ArtPal profile for current listings with pricing.', category: 'general', displayOrder: 0 },
    { question: 'Do you offer custom commissions?', answer: 'Yes, custom commissions are welcomed. Contact us with your vision, preferred size, and medium, and we will discuss timeline and pricing.', category: 'commission', displayOrder: 1 },
    { question: 'How is artwork priced?', answer: 'Artwork pricing depends on the piece, size, medium, availability, and delivery requirements. Contact us for specific pricing or visit ArtPal for current listings.', category: 'pricing', displayOrder: 2 },
    { question: 'Do you ship internationally?', answer: 'Yes, we work with trusted carriers to ship artwork worldwide. Shipping costs and arrangements vary by piece size and destination.', category: 'shipping', displayOrder: 3 },
    { question: 'What is the commission process?', answer: 'The commission process begins with a consultation to understand your vision. We then provide a proposal including timeline, pricing, and creative direction. Progress updates are shared throughout creation.', category: 'commission', displayOrder: 4 },
    { question: 'Can I visit the studio?', answer: 'Studio visits can be arranged by appointment. Please contact us to schedule a visit.', category: 'general', displayOrder: 5 },
  ]);
  console.log('FAQs seeded');
}

async function seedPricing() {
  const existing = await PricingContent.findOne();
  if (existing) return;

  await PricingContent.create({
    pricingCards: [
      { title: 'Contact for Pricing', description: 'Reach out for personalised pricing on any artwork in the collection.', buttonText: 'Contact Us', buttonUrl: '/contact', order: 0 },
      { title: 'Request Artwork Details', description: 'Interested in a specific piece? We will provide full details on availability and pricing.', buttonText: 'Enquire Now', buttonUrl: '/contact', order: 1 },
      { title: 'Visit ArtPal', description: 'Browse current listings with pricing on our ArtPal profile.', buttonText: 'View on ArtPal', buttonUrl: 'https://www.artpal.com/sukh2', order: 2 },
      { title: 'Commission Enquiry', description: 'Discuss a custom commission tailored to your vision and space.', buttonText: 'Start a Commission', buttonUrl: '/contact', order: 3 },
    ],
    commissionNotes: 'Commission pricing varies based on size, complexity, medium, and timeline. A consultation is the first step to receiving a detailed quote.',
  });
  console.log('Pricing seeded');
}

async function seedBlogs() {
  const count = await BlogPost.countDocuments();
  if (count > 0) return;

  await BlogPost.insertMany([
    {
      title: 'Dark Mystery 2027 Edition: Spellbound — Arose from the Ashes',
      slug: 'dark-mystery-2027-spellbound',
      excerpt:
        'An illustrated mystical adventure eBook featuring 84 full-color paintings — the story of an angel prince transformed into a ghost, trapped in time until faith reunites him with Princessa.',
      content: `<p><strong>Dark Mystery: Spellbound—Arose from the Ashes</strong> tells the story of an angel, disguised as a prince, who is transformed into a ghost by a jealous demon and trapped in time. His remorse, perseverance and faith help him reconnect with the higher source and empower him to transcend the barriers of time and space to reunite with his true love, Princessa.</p><p>The book is a poetic rendition of a story from the author's debut historical novel, <em>The Mystery of the Rose—The Return of the Prince</em>, which was nominated for the 2013 Crossword Book Award.</p><p>This 2027 Edition features 84 full-color mystical paintings originating from Sukh D. H. Khokhar's Dark Mystery Series — exploring angels, demons, and ghosts on their spiritual journey from darkness into light.</p><p>Her metaphors and imagery are diverse, overwhelming, and extraordinary—deeply meaningful and relevant, especially in today's world where people's interests are shifting toward content that explores the unknown and challenges the norms of conventional thinking.</p>`,
      categories: ['2027 Editions', 'Author Blog', 'Dark Mystery'],
      tags: ['2027', 'dark-mystery', 'spellbound', 'ebook'],
      isPublished: true,
      isFeatured: true,
      readingTime: 6,
      publishDate: new Date(),
    },
    {
      title: 'The Mystery of the Rose — 2027 Edition',
      slug: 'mystery-of-the-rose-2027-edition',
      excerpt:
        'The return of the critically acclaimed debut novel—longlisted for the 2013 Crossword Book Award—reimagined with enhanced illustrations, poetry, and mystical adventure.',
      content: `<p><em>The Mystery of the Rose—The Return of the Prince</em> returns in a bold 2027 Edition, bringing renewed life to Sukh D. H. Khokhar's debut historical novel.</p><p>Between the pages lies the love story of Pearly Ruby Boone, woven together with the fate of a nation under British rule. Drawing from historical contexts, the novel paints a perfect picture of India circa 1880 all the way to the 1940s as it explores the life of a British family caught up in the deep political intrigue and turmoil of the era.</p><p>Coupled with vibrant illustrations and sprinkled with beautiful verses of poetry, this edition creates a true marvel of magical realism—a harmony of the physical and the spiritual.</p><p>As Madhumati, Bollywood Film Actress, wrote: "A mesmerizing tale of romance from India under the British rule, depicted with powerful characters and fascinating backdrop of the rise of the Indian independence movement."</p>`,
      categories: ['2027 Editions', 'Author Blog'],
      tags: ['2027', 'mystery-of-the-rose', 'novel'],
      isPublished: true,
      isFeatured: true,
      readingTime: 5,
      publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'The Mystery Behind the Canvas',
      slug: 'the-mystery-behind-the-canvas',
      excerpt: 'Exploring how narrative intrigue shapes every brushstroke in the mystical art collection.',
      content: '<p>Every painting begins with a question — a mystery waiting to be unravelled on canvas. In this journal entry, I share how my work as a mystery writer influences the visual narratives I create.</p><p>The interplay between words and images has always fascinated me. When I sit before a blank canvas, I am not merely applying paint; I am constructing a scene, developing characters, and weaving tension into colour and form.</p><p>This dual practice of writing and painting creates a rich creative ecosystem where each discipline feeds the other. A story might inspire a painting, and a painting might spark a new narrative.</p>',
      categories: ['Creative Process', 'Mystery', 'Author Blog'],
      tags: ['mystery', 'painting', 'storytelling'],
      isPublished: true,
      isFeatured: false,
      readingTime: 4,
      publishDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Murals: Bringing Art to Life on a Grand Scale',
      slug: 'murals-bringing-art-to-life',
      excerpt: 'The journey of transforming walls into immersive artistic experiences through custom mural work.',
      content: '<p>There is something profoundly satisfying about creating art on the scale of a wall. Murals demand a different kind of thinking — spatial awareness, architectural harmony, and the ability to envision how a piece will live within an environment.</p><p>Each mural project begins with understanding the space: its purpose, its light, its audience. From restaurants to private residences, the context shapes every creative decision.</p>',
      categories: ['Murals', 'Studio', 'Author Blog'],
      tags: ['murals', 'commission', 'large-scale'],
      isPublished: true,
      isFeatured: false,
      readingTime: 5,
      publishDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
  ]);
  console.log('Blogs seeded');
}

async function seedProducts() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  await Product.insertMany([
    {
      title: 'Whispers of the Ancient Forest',
      slug: 'whispers-of-the-ancient-forest',
      category: 'Mystical Paintings',
      description: 'A captivating mystical landscape where ancient trees hold secrets of forgotten realms.',
      story: 'Inspired by walks through old-growth forests, this piece captures the sense of mystery that lingers between the trees.',
      medium: 'Acrylic on Canvas',
      dimensions: '24" x 36"',
      year: '2024',
      sku: 'SK-MA-001',
      showPrice: false,
      availability: 'contact',
      purchaseMode: 'contact_for_price',
      isOriginal: true,
      isFeatured: true,
      artPalUrl: 'https://www.artpal.com/sukh2',
    },
    {
      title: 'Crimson Twilight',
      slug: 'crimson-twilight',
      category: 'Mystical Paintings',
      description: 'A dramatic twilight scene painted in deep crimsons and warm golds.',
      story: 'The moment between day and night holds a particular magic — this painting captures that fleeting, mysterious hour.',
      medium: 'Oil on Canvas',
      dimensions: '30" x 40"',
      year: '2023',
      sku: 'SK-MA-002',
      showPrice: false,
      availability: 'contact',
      purchaseMode: 'artpal',
      isOriginal: true,
      isFeatured: true,
      artPalUrl: 'https://www.artpal.com/sukh2',
    },
    {
      title: 'The Storyteller\'s Door',
      slug: 'the-storytellers-door',
      category: 'Original Paintings',
      description: 'An enigmatic doorway suggesting worlds beyond — a favourite among collectors.',
      medium: 'Acrylic on Canvas',
      dimensions: '20" x 24"',
      year: '2024',
      sku: 'SK-OP-001',
      showPrice: false,
      availability: 'available',
      purchaseMode: 'direct_order',
      isOriginal: true,
      isFeatured: false,
    },
  ]);
  console.log('Products seeded');
}

async function runSeed() {
  try {
    await connectDB();
    console.log('Starting database seed...\n');

    await seedAdmin();
    await seedSettings();
    await seedPages();
    await seedServices();
    await seedGallery();
    await seedTestimonials();
    await seedFAQs();
    await seedPricing();
    await seedBlogs();
    await seedProducts();

    console.log('\nDatabase seeding completed successfully!');
    console.log(`\nAdmin login: ${config.adminSeedEmail}`);
    console.log(`Admin password: ${config.adminSeedPassword}`);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

runSeed();
