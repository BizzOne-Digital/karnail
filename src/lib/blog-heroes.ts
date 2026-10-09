/** Default hero images when CMS `heroImage` is empty (seed / admin). */
export const BLOG_HERO_BY_SLUG: Record<string, string> = {
  'dark-mystery-2027-spellbound': '/books/dark-mystery-spellbound-2027.jpg',
  'mystery-of-the-rose-2027-edition': '/books/mystery-rose-return-prince-2027-ebook-cover.jpg',
  'the-mystery-behind-the-canvas': '/blog/the-mystery-behind-the-canvas.jpg',
  'murals-bringing-art-to-life': '/blog/murals-bringing-art-to-life.jpg',
};

export function resolveBlogHeroImage(slug: string, heroImage?: string | null): string {
  const trimmed = heroImage?.trim();
  if (trimmed) return trimmed;
  return BLOG_HERO_BY_SLUG[slug] ?? '';
}
