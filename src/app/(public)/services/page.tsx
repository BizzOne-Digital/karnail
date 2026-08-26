import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { publicApi } from '@/services/api';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';
import { getImageUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await publicApi.getPage('services');
    return { title: page.seoTitle, description: page.seoDescription };
  } catch {
    return { title: 'Services' };
  }
}

export default async function ServicesPage() {
  const [page, servicesRes] = await Promise.all([
    publicApi.getPage('services').catch(() => null),
    publicApi.getServices({ limit: 20 }),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');
  const services = servicesRes.data;

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Services'}
        heading={hero?.heading || 'Creative Services'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-24 bg-gallery-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service._id}
                href={`/services/${service.slug}`}
                className="group bg-soft-black border border-warm-gray/10 overflow-hidden hover:border-artist-crimson/30 transition-all"
              >
                <div className="aspect-[16/9] relative bg-gallery-black">
                  {service.mainImage ? (
                    <Image
                      src={getImageUrl(service.mainImage)}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-deep-oxblood/30 to-soft-black" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-warm-cream mb-2 group-hover:text-aged-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-beige text-sm mb-4">{service.shortDescription}</p>
                  <p className="text-aged-gold text-sm">
                    {service.contactForPricing ? 'Contact for Pricing' : service.startingPrice ? `From $${service.startingPrice}` : 'Contact for Pricing'}
                  </p>
                  <span className="inline-block mt-4 text-warm-cream text-sm border-b border-artist-crimson">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-soft-black text-center">
        <h2 className="font-display text-4xl text-warm-cream mb-6">Ready to Commission?</h2>
        <Button href="/contact" size="lg">Start a Conversation</Button>
      </section>
    </>
  );
}
