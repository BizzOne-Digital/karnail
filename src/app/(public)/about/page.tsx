import { Suspense } from 'react';
import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { AboutPageContent } from '@/components/public/about/AboutPageContent';

const ABOUT_TITLE = 'About Sukh D. H. Khokhar | Writer, Poet & Mural Artist';
const ABOUT_DESCRIPTION =
  'Meet Calgary writer and mural artist Sukh D. H. Khokhar: awards, books and community work including the Thompson Citizenship Council.';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await serverPublicApi.getPage('about');
    return {
      title: page.seoTitle ? { absolute: page.seoTitle } : { absolute: ABOUT_TITLE },
      description: page.seoDescription || ABOUT_DESCRIPTION,
      alternates: { canonical: '/about' },
    };
  } catch {
    return {
      title: { absolute: ABOUT_TITLE },
      description: ABOUT_DESCRIPTION,
      alternates: { canonical: '/about' },
    };
  }
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-page-silver" />}>
      <AboutPageContent />
    </Suspense>
  );
}
