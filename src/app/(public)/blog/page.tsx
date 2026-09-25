import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionPageShell } from '@/components/public/SectionPageShell';
import { GALLERY_PROMO } from '@/lib/about-content';
import { formatDate, getImageUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Author Blogs' };
}

export default async function BlogPage() {
  const [page, blogsRes] = await Promise.all([
    serverPublicApi.getPage('blog').catch(() => null),
    serverPublicApi.getBlogs({ limit: 20 }),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');
  const blogs = blogsRes.data;

  return (
    <SectionPageShell>
      <header className="text-center mb-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
          {hero?.eyebrow || 'Author Blog'}
        </p>
        <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">
          {hero?.heading || 'Author Blogs'}
        </h1>
      </header>

      <article className="mb-8 pb-6 border-b border-warm-gray/30">
        <h2 className="font-display text-lg text-artist-crimson font-bold text-center mb-1">
          {GALLERY_PROMO.title}
        </h2>
        <p className="text-center text-sm font-bold text-artist-crimson underline mb-4">
          <a href={GALLERY_PROMO.artPalUrl} target="_blank" rel="noopener noreferrer">
            {GALLERY_PROMO.subtitle}
          </a>
        </p>
        <div className="space-y-3 text-[15px] leading-relaxed text-justify prose-content-bold">
          {GALLERY_PROMO.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </article>

      <ul className="space-y-6">
        {blogs.map((blog) => (
          <li key={blog._id}>
            <Link href={`/blog/${blog.slug}`} className="group grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 items-start">
              <div className="aspect-[4/3] relative overflow-hidden border border-warm-gray/25 bg-warm-cream">
                {blog.heroImage ? (
                  <Image
                    src={getImageUrl(blog.heroImage)}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-xs text-gallery-black/70 font-semibold mb-1">
                  {formatDate(blog.publishDate)}
                  {blog.readingTime ? ` · ${blog.readingTime} min read` : ''}
                </p>
                <h2 className="font-display text-lg text-artist-crimson font-bold group-hover:underline">{blog.title}</h2>
                <p className="text-sm mt-1 line-clamp-3">{blog.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!blogs.length && (
        <p className="text-center font-semibold py-4">Additional blog posts will appear here soon.</p>
      )}
    </SectionPageShell>
  );
}
