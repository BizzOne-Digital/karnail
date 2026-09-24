import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionPageShell } from '@/components/public/SectionPageShell';
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
      <header className="text-center mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
          {hero?.eyebrow || 'Journal'}
        </p>
        <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">
          {hero?.heading || 'Author Blogs'}
        </h1>
        {hero?.description && (
          <p className="text-sm mt-2 font-semibold max-w-xl mx-auto">{hero.description}</p>
        )}
      </header>

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
        <p className="text-center font-semibold py-8">Author blog posts will appear here soon.</p>
      )}
    </SectionPageShell>
  );
}
