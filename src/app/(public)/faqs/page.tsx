import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { FAQAccordion } from '@/components/public/FAQAccordion';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'FAQs' };
}

export default async function FAQsPage() {
  const [page, faqs] = await Promise.all([
    serverPublicApi.getPage('faqs').catch(() => null),
    serverPublicApi.getFAQs(),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'FAQs'}
        heading={hero?.heading || 'Frequently Asked Questions'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-24 bg-gallery-black">
        <div className="max-w-3xl mx-auto px-4">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-24 bg-soft-black text-center">
        <h2 className="font-display text-3xl text-warm-cream mb-6">Still Have Questions?</h2>
        <Button href="/contact" size="lg">Contact Us</Button>
      </section>
    </>
  );
}
