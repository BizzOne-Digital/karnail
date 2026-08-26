import { Metadata } from 'next';
import { publicApi } from '@/services/api';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Testimonials' };
}

export default async function TestimonialsPage() {
  const [page, testimonials] = await Promise.all([
    publicApi.getPage('testimonials').catch(() => null),
    publicApi.getTestimonials(),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Testimonials'}
        heading={hero?.heading || 'Words from Collectors'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-24 bg-gallery-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {testimonials.map((t) => (
              <div key={t._id} className="bg-soft-black border border-warm-gray/10 p-8">
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

      <section className="py-24 bg-soft-black text-center">
        <Button href="/contact" size="lg">Get in Touch</Button>
      </section>
    </>
  );
}
