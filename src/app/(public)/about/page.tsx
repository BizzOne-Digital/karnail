import { Metadata } from 'next';
import { publicApi } from '@/services/api';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import type { PageSection } from '@/types';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await publicApi.getPage('about');
    return { title: page.seoTitle, description: page.seoDescription };
  } catch {
    return { title: 'About' };
  }
}

function ContentSection({ section }: { section: PageSection }) {
  return (
    <section className={`py-12 sm:py-20 overflow-hidden w-full max-w-full ${section.theme === 'cream' ? 'bg-light-canvas text-gallery-black' : 'bg-gallery-black'}`}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className={section.layout === 'image-right' ? 'lg:order-2' : ''}>
          {section.mainImage && (
            <div className="gallery-frame">
              <div className="gallery-frame-inner aspect-[4/3] relative">
                <Image src={getImageUrl(section.mainImage)} alt={section.heading} fill className="object-cover" />
              </div>
            </div>
          )}
          {!section.mainImage && section.additionalImages && section.additionalImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {section.additionalImages.slice(0, 4).map((img, i) => (
                <div key={i} className={`gallery-frame ${i === 0 ? 'col-span-2' : ''}`}>
                  <div className={`gallery-frame-inner relative bg-soft-black ${i === 0 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                    <Image src={getImageUrl(img.url)} alt={img.alt || ''} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-warm-cream mb-4 sm:mb-6 break-words">{section.heading}</h2>
          <p className="text-muted-beige leading-relaxed mb-4">{section.description}</p>
          {section.richText && (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: section.richText }} />
          )}
        </div>
      </div>
    </section>
  );
}

export default async function AboutPage() {
  let page;
  try {
    page = await publicApi.getPage('about');
  } catch {
    page = null;
  }

  const sections = page?.sections?.filter((s) => s.isVisible) || [];
  const hero = sections.find((s) => s.sectionKey === 'hero');

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'About'}
        heading={hero?.heading || 'The Artist Behind the Mystery'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />
      {sections
        .filter((s) => s.sectionKey !== 'hero' && s.sectionKey !== 'contact-cta')
        .map((section) => (
          <ContentSection key={section.sectionKey} section={section} />
        ))}
      {sections.find((s) => s.sectionKey === 'contact-cta') && (
        <section className="py-24 bg-deep-oxblood text-center">
          <h2 className="font-display text-4xl text-warm-cream mb-6">Connect with the Artist</h2>
          <Button href="/contact" variant="secondary" size="lg">Contact Sukh</Button>
        </section>
      )}
    </>
  );
}
