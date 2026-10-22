import { BRAND_LOGO } from '@/lib/brand';
import { absolutePublicUrl, getSiteUrl } from '@/lib/site-url';

const siteDescription =
  'Discover captivating mystical paintings, murals, and creative services by Sukh D. H. Khokhar — mystery writer, mural artist, and visual storyteller.';

export function SiteJsonLd() {
  const siteUrl = getSiteUrl();
  const logoUrl = absolutePublicUrl(BRAND_LOGO);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Sukh D. H. Khokhar',
        description: siteDescription,
        inLanguage: 'en-CA',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Sukh D. H. Khokhar',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Sukh D. H. Khokhar',
        url: siteUrl,
        jobTitle: 'Mystery Writer and Mural Artist',
        image: logoUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
