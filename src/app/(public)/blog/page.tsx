import { Metadata } from 'next';
import Link from 'next/link';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionPageShell } from '@/components/public/SectionPageShell';
import { GALLERY_PROMO } from '@/lib/about-content';
import { formatDate } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Author Blogs' };
}

export default async function BlogPage() {
  const blogsRes = await serverPublicApi.getBlogs({ limit: 20 });
  const blogs = blogsRes.data;

  return (
    <SectionPageShell>
      <header className="text-center mb-6">
        <h1 className="font-display text-lg sm:text-xl text-artist-crimson font-bold leading-snug px-1">
          {GALLERY_PROMO.title}
        </h1>
        <p className="mt-2 text-sm sm:text-[15px] font-bold text-artist-crimson">
          <a href={GALLERY_PROMO.artPalUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            {GALLERY_PROMO.subtitle}
          </a>
        </p>
      </header>

      <article className="mb-8 pb-6 border-b border-warm-gray/30">
        <p className="text-center text-sm font-semibold text-gallery-black/90 mb-4">
          By {GALLERY_PROMO.author}
        </p>
        <div className="space-y-3 text-[15px] leading-relaxed text-justify prose-content-bold">
          {GALLERY_PROMO.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </article>

      <section>
        <h2 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold text-center mb-5">
          Author Blogs
        </h2>
        <ul className="space-y-6">
          {blogs.map((blog) => (
            <li key={blog._id}>
              <Link href={`/blog/${blog.slug}`} className="group block">
                <p className="text-xs text-gallery-black/70 font-semibold mb-1">
                  {formatDate(blog.publishDate)}
                  {blog.readingTime ? ` · ${blog.readingTime} min read` : ''}
                </p>
                <h3 className="font-display text-lg text-artist-crimson font-bold group-hover:underline">{blog.title}</h3>
                <p className="text-sm mt-1 line-clamp-3">{blog.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>

        {!blogs.length && (
          <p className="text-center font-semibold py-4">Additional blog posts will appear here soon.</p>
        )}
      </section>
    </SectionPageShell>
  );
}
