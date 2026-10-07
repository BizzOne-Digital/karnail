import { Metadata } from 'next';
import { SectionHero } from '@/components/public/SectionHero';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Sukh D. H. Khokhar Mystery Art website.',
};

export default function TermsPage() {
  return (
    <>
      <SectionHero eyebrow="Legal" heading="Terms of Use" description="Terms governing use of this website and artwork services." />
      <section className="py-10 sm:py-16 md:py-24 bg-gallery-black overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 prose-content space-y-6 text-muted-beige">
          <p>By accessing and using this website, you agree to these terms of use. All artwork, images, and content on this site are the intellectual property of Sukh D. H. Khokhar unless otherwise stated.</p>
          <h2 className="font-display text-2xl text-warm-cream">Artwork & Purchases</h2>
          <p>
            Original paintings are not sold on this website. Collectors are referred to the artist&apos;s online gallery
            (ArtPal) for available work, pricing, and purchases. Any other site forms submit messages or requests only —
            not completed sales.
          </p>
          <h2 className="font-display text-2xl text-warm-cream">Commissions & Murals</h2>
          <p>Custom commissions and mural projects require separate agreements covering scope, timeline, pricing, and delivery terms.</p>
          <h2 className="font-display text-2xl text-warm-cream">Intellectual Property</h2>
          <p>All paintings, murals, writings, and visual content remain the copyright of the artist. Reproduction without permission is prohibited.</p>
          <h2 className="font-display text-2xl text-warm-cream">Contact</h2>
          <p>
            Questions about these terms? Please use the{' '}
            <a href="/contact" className="text-aged-gold underline">contact form</a>.
          </p>
        </div>
      </section>
    </>
  );
}
