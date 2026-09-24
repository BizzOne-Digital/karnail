import { Suspense } from 'react';
import { serverPublicApi } from '@/services/server-public-api';
import { HomeAboutAuthor } from '@/components/public/home/HomeAboutAuthor';
import type { PageSection } from '@/types';

async function getHomeData() {
  try {
    const page = await serverPublicApi.getPage('home');
    return { page };
  } catch {
    return { page: null };
  }
}

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.sectionKey === key && s.isVisible);
}

export default async function HomePage() {
  const { page } = await getHomeData();
  const sections = page?.sections || [];
  const hero = getSection(sections, 'hero');
  const meet = getSection(sections, 'meet-artist');

  if (!hero) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-page-silver text-deep-oxblood">
        <p>Home content is loading…</p>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <HomeAboutAuthor hero={hero} meet={meet} />
    </Suspense>
  );
}
