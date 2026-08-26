import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { serverPublicApi } from '@/services/server-public-api';
import { formatDate, getImageUrl } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await serverPublicApi.getBlog(slug);
    return { title: blog.seoTitle || blog.title, description: blog.seoDescription || blog.excerpt };
  } catch {
    return { title: 'Journal' };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  let blog;
  try {
    blog = await serverPublicApi.getBlog(slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <div className="relative h-[50vh] min-h-[400px]">
        {blog.heroImage && (
          <Image src={getImageUrl(blog.heroImage)} alt={blog.title} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gallery-black via-gallery-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <p className="text-aged-gold text-sm mb-2">{formatDate(blog.publishDate)} · {blog.readingTime} min read</p>
          <h1 className="font-display text-4xl md:text-5xl text-warm-cream">{blog.title}</h1>
          <p className="text-muted-beige mt-2">By {blog.author}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <Link href="/blog" className="text-aged-gold hover:text-warm-cream transition-colors">← Back to Journal</Link>
      </div>
    </article>
  );
}
