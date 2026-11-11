import { ABOUT_AUTHOR_PORTRAIT, BRAND_LOGO } from '@/lib/brand';
import { absolutePublicUrl, getSiteUrl } from '@/lib/site-url';

const siteDescription =
  'Calgary mystery writer, poet and mural artist Sukh D. H. Khokhar. Explore The Mystery of the Rose, the Dark Mystery poetry eBook and original paintings.';

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
        alternateName: 'Sukh Khokhar',
        jobTitle: 'Mystery writer, poet and mural artist',
        description:
          'Calgary-based Canadian mystery writer, poet, multimedia mural artist, illustrator and educator.',
        image: absolutePublicUrl(ABOUT_AUTHOR_PORTRAIT),
        homeLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Calgary',
            addressRegion: 'AB',
            addressCountry: 'CA',
          },
        },
        award: [
          "Governor General's Commemorative Medal",
          'Longlisted, 2013 Crossword Book Award',
        ],
        sameAs: ['https://www.artpal.com/sukh2'],
      },
      {
        '@type': 'Book',
        name: 'The Mystery of the Rose: The Return of the Prince',
        author: { '@id': `${siteUrl}/#person` },
        url: `${siteUrl}/books`,
      },
      {
        '@type': 'Book',
        name: "Dark Mystery: I am a Demon, I'm a Ghost",
        author: { '@id': `${siteUrl}/#person` },
        datePublished: '2013',
        bookFormat: 'https://schema.org/EBook',
        url: `${siteUrl}/books`,
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
