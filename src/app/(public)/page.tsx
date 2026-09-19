import { serverPublicApi } from '@/services/server-public-api';
import { HomeAboutAuthor } from '@/components/public/home/HomeAboutAuthor';
import { HomeHero } from '@/components/public/home/HomeSections';
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

/** Home follows client layout: banner + verse, then about author + photo, rose close — one cohesive page. */
export default async function HomePage() {
  const { page } = await getHomeData();
  const sections = page?.sections || [];
  const hero = getSection(sections, 'hero');
  const meet = getSection(sections, 'meet-artist');

  if (!hero) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-light-canvas text-deep-oxblood">
        <p>Home content is loading…</p>
      </div>
    );
  }

  return (
    <>
      <HomeHero section={hero} />
      <HomeAboutAuthor meet={meet} />
    </>
  );
}
