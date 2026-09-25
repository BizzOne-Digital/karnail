import { Metadata } from 'next';
import { SectionHero } from '@/components/public/SectionHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Sukh D. H. Khokhar Mystery Art website.',
};

export default function PrivacyPage() {
  return (
    <>
      <SectionHero eyebrow="Legal" heading="Privacy Policy" description="How we collect, use, and protect your information." />
      <section className="py-10 sm:py-16 md:py-24 bg-gallery-black overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 prose-content space-y-6 text-muted-beige">
          <p>Your privacy is important to us. This policy explains how Sukh D. H. Khokhar collects and uses personal information when you visit our website, submit enquiries, or request artwork information.</p>
          <h2 className="font-display text-2xl text-warm-cream">Information We Collect</h2>
          <p>We may collect your name, email address, phone number, and any message you submit through our contact forms, checkout, or enquiry forms.</p>
          <h2 className="font-display text-2xl text-warm-cream">How We Use Your Information</h2>
          <p>We use your information to respond to enquiries, process order requests, provide artwork information, and communicate about commissions or mural projects.</p>
          <h2 className="font-display text-2xl text-warm-cream">Data Security</h2>
          <p>We take reasonable measures to protect your personal information. We do not sell or share your data with third parties for marketing purposes.</p>
          <h2 className="font-display text-2xl text-warm-cream">Contact</h2>
          <p>For privacy-related questions, contact us at khokharsukh@gmail.com.</p>
        </div>
      </section>
    </>
  );
}
