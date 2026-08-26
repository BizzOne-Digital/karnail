import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { publicApi } from '@/services/api';
import { SectionHero } from '@/components/public/SectionHero';
import { formatDate, getImageUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return { title: "The Artist's Journal" };
}

export default async function BlogPage() {
  const [page, blogsRes] = await Promise.all([
    publicApi.getPage('blog').catch(() => null),
    publicApi.getBlogs({ limit: 20 }),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');
  const blogs = blogsRes.data;
  const featured = blogs.find((b) => b.isFeatured) || blogs[0];

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Journal'}
        heading={hero?.heading || "The Artist's Journal"}
        description={hero?.description}
      />

      {featured && (
        <section className="py-16 bg-soft-black">
          <div className="max-w-7xl mx-auto px-4">
            <Link href={`/blog/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 group">
              <div className="aspect-[16/10] relative overflow-hidden">
                {featured.heroImage && (
                  <Image src={getImageUrl(featured.heroImage)} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-aged-gold text-sm mb-2">Featured</span>
                <h2 className="font-display text-3xl text-warm-cream mb-4 group-hover:text-aged-gold transition-colors">{featured.title}</h2>
                <p className="text-muted-beige mb-4">{featured.excerpt}</p>
                <p className="text-warm-gray text-sm">{formatDate(featured.publishDate)} · {featured.readingTime} min read</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-16 bg-gallery-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.filter((b) => b._id !== featured?._id).map((blog) => (
            <Link key={blog._id} href={`/blog/${blog.slug}`} className="group">
              <div className="aspect-[16/10] relative mb-4 overflow-hidden bg-soft-black">
                {blog.heroImage && (
                  <Image src={getImageUrl(blog.heroImage)} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
              </div>
              <p className="text-warm-gray text-xs mb-2">{formatDate(blog.publishDate)}</p>
              <h3 className="font-display text-xl text-warm-cream group-hover:text-aged-gold transition-colors">{blog.title}</h3>
              <p className="text-muted-beige text-sm mt-2 line-clamp-2">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
