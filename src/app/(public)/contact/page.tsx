import { Metadata } from 'next';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { FAQAccordion } from '@/components/public/FAQAccordion';

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

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Contact'}
        heading={hero?.heading || 'Get in Touch'}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage}
      />

      <section className="py-24 bg-gallery-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl text-warm-cream mb-6">Start a Conversation</h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="font-display text-3xl text-warm-cream mb-6">Contact Information</h2>
            <div className="space-y-4 text-muted-beige">
              <div>
                <p className="text-aged-gold text-sm mb-1">Email</p>
                <a href={`mailto:${general?.email}`} className="hover:text-warm-cream transition-colors">{general?.email}</a>
              </div>
              <div>
                <p className="text-aged-gold text-sm mb-1">Phone</p>
                <p>{general?.phone}</p>
              </div>
              <div>
                <p className="text-aged-gold text-sm mb-1">Website</p>
                <p>{general?.website}</p>
              </div>
              <div>
                <p className="text-aged-gold text-sm mb-1">ArtPal</p>
                <a href={general?.artPalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-warm-cream transition-colors">
                  View ArtPal Collection
                </a>
              </div>
              {general?.socialLinks?.map((link) => (
                <div key={link.platform}>
                  <p className="text-aged-gold text-sm mb-1">{link.platform}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-warm-cream transition-colors">
                    {link.username || link.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="py-24 bg-soft-black">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-3xl text-warm-cream text-center mb-8">Quick Answers</h2>
            <FAQAccordion faqs={faqs.slice(0, 5)} />
          </div>
        </section>
      )}
    </>
  );
}
