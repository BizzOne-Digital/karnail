import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Pricing' };
}

export default async function PricingPage() {
  const [pricing, page] = await Promise.all([
    serverPublicApi.getPricing(),
    serverPublicApi.getPage('pricing').catch(() => null),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');

  return (
    <>
      <SectionHero
        eyebrow="Pricing"
        heading={pricing.heroHeading || hero?.heading || 'Artwork Pricing'}
        description={pricing.introduction || pricing.contactForPricingMessage}
        backgroundImage={pricing.heroBackgroundImage}
      />

      <section className="py-10 sm:py-16 md:py-24 bg-gallery-black overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-muted-beige text-lg mb-12 max-w-2xl mx-auto">
            {pricing.contactForPricingMessage}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricing.pricingCards?.map((card, i) => (
              <div key={i} className="bg-soft-black border border-warm-gray/10 p-8 hover:border-artist-crimson/30 transition-colors">
                <h3 className="font-display text-2xl text-warm-cream mb-3">{card.title}</h3>
                <p className="text-muted-beige mb-6">{card.description}</p>
                <Button href={card.buttonUrl} variant="outline">{card.buttonText}</Button>
              </div>
            ))}
          </div>

          {pricing.commissionNotes && (
            <div className="mt-12 text-center">
              <p className="text-muted-beige">{pricing.commissionNotes}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-deep-oxblood text-center">
        <Button href={pricing.artPalUrl || 'https://www.artpal.com/sukh2'} variant="secondary" size="lg">
          Visit ArtPal for Current Listings
        </Button>
      </section>
    </>
  );
}
