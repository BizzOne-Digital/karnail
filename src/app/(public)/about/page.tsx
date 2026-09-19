import { Suspense } from 'react';
import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { AboutPageContent } from '@/components/public/about/AboutPageContent';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await serverPublicApi.getPage('about');
    return { title: page.seoTitle, description: page.seoDescription };
  } catch {
    return {
      title: 'About Sukh D. H. Khokhar | Mystery Writer & Mural Artist',
      description:
        'Artist statement, book reviews, and heritage — Sukh D. H. Khokhar, mystery writer and mural artist.',
    };
  }
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-light-canvas" />}>
      <AboutPageContent />
    </Suspense>
  );
}
