import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';
import { getImageUrl } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const service = await serverPublicApi.getService(slug);
    return {
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.shortDescription,
    };
  } catch {
    return { title: 'Service' };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  let service;
  try {
    service = await serverPublicApi.getService(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <SectionHero
        heading={service.heroHeading || service.title}
        description={service.heroDescription || service.shortDescription}
        backgroundImage={service.heroBackgroundImage}
      />

      <section className="py-20 bg-gallery-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: service.richTextContent || service.fullDescription }} />
        </div>
      </section>

      {service.features?.length > 0 && (
        <section className="py-20 bg-soft-black">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl text-warm-cream mb-8">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-beige">
                  <span className="text-aged-gold mt-1">✦</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.processSteps?.length > 0 && (
        <section className="py-20 bg-gallery-black">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl text-warm-cream mb-8">Process</h2>
            <div className="space-y-6">
              {service.processSteps.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <span className="font-dramatic text-aged-gold text-2xl">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl text-warm-cream">{step.title}</h3>
                    <p className="text-muted-beige">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.detailSections?.map((section, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? 'bg-soft-black' : 'bg-gallery-black'}`}>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {section.mainImage && (
              <div className="gallery-frame">
                <div className="gallery-frame-inner aspect-[4/3] relative">
                  <Image src={getImageUrl(section.mainImage)} alt={section.heading} fill className="object-cover" />
                </div>
              </div>
            )}
            <div>
              <h2 className="font-display text-3xl text-warm-cream mb-4">{section.heading}</h2>
              <p className="text-muted-beige mb-4">{section.description}</p>
              {section.richText && <div className="prose-content" dangerouslySetInnerHTML={{ __html: section.richText }} />}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-deep-oxblood text-center">
        <h2 className="font-display text-4xl text-warm-cream mb-4">{service.ctaText || 'Get in Touch'}</h2>
        {service.pricingInfo && <p className="text-muted-beige mb-8">{service.pricingInfo}</p>}
        <Button href={service.ctaUrl || '/contact'} variant="secondary" size="lg">
          {service.ctaText || 'Contact for Pricing'}
        </Button>
      </section>
    </>
  );
}
