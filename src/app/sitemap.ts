import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const staticPages = [
    '',
    '/about',
    '/about?tab=statement',
    '/about?tab=reviews',
    '/gallery',
    '/books',
    '/books?tab=excerpts',
    '/books?tab=by-author',
    '/historical-background/1',
    '/historical-background/2',
    '/blog',
    '/contact',
    '/media-coverage',
    '/testimonials',
    '/faqs',
    '/pricing',
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
