import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';
import { CelebrityReviewsMarquee } from '@/components/public/testimonials/CelebrityReviewsMarquee';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Book Reviews & Testimonials' };
}

export default async function TestimonialsPage() {
  const [page, testimonials] = await Promise.all([
    serverPublicApi.getPage('testimonials').catch(() => null),
    serverPublicApi.getTestimonials().catch(() => []),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Testimonials'}
        heading={hero?.heading || 'Comments from Celebrities'}
        description={hero?.description || 'Book reviews and words of praise from distinguished readers, authors, and public figures.'}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-16 sm:py-24 bg-gallery-black relative overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center relative">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-3">Book Reviews</p>
          <h2 className="font-display text-3xl sm:text-4xl text-warm-cream">Comments from Celebrities</h2>
        </div>
        <CelebrityReviewsMarquee />
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 sm:py-24 bg-soft-black">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl text-warm-cream text-center mb-10">Words from Collectors</h2>
            <div className="space-y-8">
              {testimonials.map((t) => (
                <div key={t._id} className="bg-gallery-black border border-warm-gray/10 p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-aged-gold">★</span>
                    ))}
                  </div>
                  <p className="font-display text-xl text-warm-cream italic mb-4">&ldquo;{t.review}&rdquo;</p>
                  <p className="text-muted-beige">{t.customerName}</p>
                  {t.customerTitle && <p className="text-warm-gray text-sm">{t.customerTitle}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-deep-oxblood text-center">
        <Button href="/contact" size="lg" variant="secondary">
          Get in Touch
        </Button>
      </section>
    </>
  );
}
