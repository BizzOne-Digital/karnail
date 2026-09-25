import { Metadata } from 'next';
import { Suspense } from 'react';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionPageShell } from '@/components/public/SectionPageShell';
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
    <SectionPageShell showRose={false}>
      <header className="text-center mb-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
          {hero?.eyebrow || 'Contact'}
        </p>
        <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">
          {hero?.heading || 'Get in Touch'}
        </h1>
        {hero?.description && (
          <p className="text-[15px] mt-2 font-semibold max-w-xl mx-auto">{hero.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
        <div className="min-w-0">
          <h2 className="font-display text-lg text-artist-crimson font-bold mb-4">Start a Conversation</h2>
          <Suspense fallback={<div className="text-gallery-black/70">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-lg text-artist-crimson font-bold mb-4">Contact Information</h2>
          <div className="space-y-4 text-[15px]">
            <div>
              <p className="text-artist-crimson text-xs mb-1 tracking-wide uppercase font-bold">Email</p>
              <a href={`mailto:${email}`} className="text-gallery-black font-semibold break-all hover:text-artist-crimson">
                {email}
              </a>
            </div>
            <div>
              <p className="text-artist-crimson text-xs mb-1 tracking-wide uppercase font-bold">Art Gallery</p>
              <a
                href={artPalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gallery-black font-semibold break-all hover:text-artist-crimson"
              >
                {CONTACT_LINKS.artPalLabel}
              </a>
            </div>
            <div>
              <p className="text-artist-crimson text-xs mb-1 tracking-wide uppercase font-bold">Author Website</p>
              <a
                href={authorWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gallery-black font-semibold break-all hover:text-artist-crimson"
              >
                {CONTACT_LINKS.mysteryOfTheRoseLabel}
              </a>
            </div>
            {general?.phone && (
              <div>
                <p className="text-artist-crimson text-xs mb-1 tracking-wide uppercase font-bold">Phone</p>
                <a href={`tel:${general.phone.replace(/\D/g, '')}`} className="font-semibold hover:text-artist-crimson">
                  {general.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {faqs.length > 0 && (
        <div className="mt-10 pt-8 border-t border-warm-gray/25 max-w-2xl mx-auto">
          <h2 className="font-display text-lg text-artist-crimson font-bold text-center mb-5">Quick Answers</h2>
          <FAQAccordion faqs={faqs.slice(0, 5)} />
        </div>
      )}
    </SectionPageShell>
  );
}
