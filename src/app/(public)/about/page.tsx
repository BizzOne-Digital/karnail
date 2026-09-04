import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { AboutPageContent } from '@/components/public/about/AboutPageContent';
import { Button } from '@/components/ui/Button';
import { BANNER_VERSE } from '@/lib/about-content';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await serverPublicApi.getPage('about');
    return { title: page.seoTitle, description: page.seoDescription };
  } catch {
    return {
      title: 'About Sukh D. H. Khokhar | Mystery Writer & Mural Artist',
      description:
        'Learn about Sukh D. H. Khokhar — Canadian mystery writer, poet, mural artist, illustrator, and educator based in Calgary, Alberta.',
    };
  }
}

export default async function AboutPage() {
  let heroBackground: string | undefined;
  try {
    const page = await serverPublicApi.getPage('about');
    heroBackground = page.sections?.find((s) => s.sectionKey === 'hero')?.backgroundImage;
  } catch {
    heroBackground = undefined;
  }

  return (
    <>
      <SectionHero
        eyebrow="About the Author"
        heading="Sukh D. H. Khokhar"
        backgroundImage={heroBackground}
        bannerVerse={BANNER_VERSE}
      />

      <AboutPageContent />

      <section className="py-24 bg-deep-oxblood text-center">
        <h2 className="font-display text-4xl text-warm-cream mb-6">Connect with the Artist</h2>
        <Button href="/contact" variant="secondary" size="lg">
          Contact Sukh
        </Button>
      </section>
    </>
  );
}
