import { Metadata } from 'next';
import { Suspense } from 'react';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { FAQAccordion } from '@/components/public/FAQAccordion';
import { CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/contact-info';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Contact' };
}

export default async function ContactPage() {
  const [page, settings, faqs] = await Promise.all([
    serverPublicApi.getPage('contact').catch(() => null),
    serverPublicApi.getSettings().catch(() => null),
    serverPublicApi.getFAQs().catch(() => []),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');
  const general = settings?.general;

  const email = general?.email || CONTACT_EMAIL;
  const artPalUrl = general?.artPalUrl || CONTACT_LINKS.artPal;
  const authorWebsite = CONTACT_LINKS.mysteryOfTheRose;

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Contact'}
        heading={hero?.heading || 'Get in Touch'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-24 bg-light-canvas border-y border-warm-gray/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl text-deep-oxblood mb-6">Start a Conversation</h2>
            <Suspense fallback={<div className="text-gallery-black/70">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          <div>
            <h2 className="font-display text-3xl text-deep-oxblood mb-6">Contact Information</h2>
            <div className="space-y-6 text-gallery-black/80">
              <div>
                <p className="text-aged-gold text-sm mb-1 tracking-wide uppercase">Email</p>
                <a href={`mailto:${email}`} className="text-lg text-deep-oxblood hover:text-artist-crimson transition-colors">
                  {email}
                </a>
              </div>
              <div>
                <p className="text-aged-gold text-sm mb-1 tracking-wide uppercase">Art Gallery</p>
                <a
                  href={artPalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-deep-oxblood hover:text-artist-crimson transition-colors"
                >
                  {CONTACT_LINKS.artPalLabel}
                </a>
              </div>
              <div>
                <p className="text-aged-gold text-sm mb-1 tracking-wide uppercase">Author Website</p>
                <a
                  href={authorWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-deep-oxblood hover:text-artist-crimson transition-colors"
                >
                  {CONTACT_LINKS.mysteryOfTheRoseLabel}
                </a>
              </div>
              {general?.phone && (
                <div>
                  <p className="text-aged-gold text-sm mb-1 tracking-wide uppercase">Phone</p>
                  <a href={`tel:${general.phone.replace(/\D/g, '')}`} className="text-deep-oxblood hover:text-artist-crimson transition-colors">
                    {general.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="py-24 bg-warm-cream/40 border-t border-warm-gray/20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-3xl text-deep-oxblood text-center mb-8">Quick Answers</h2>
            <FAQAccordion faqs={faqs.slice(0, 5)} />
          </div>
        </section>
      )}
    </>
  );
}
