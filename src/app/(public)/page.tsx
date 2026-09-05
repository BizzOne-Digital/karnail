import { loadGalleryImagesFromDisk } from '@/lib/load-gallery-images';
import { serverPublicApi } from '@/services/server-public-api';
import {
  HomeHero,
  CollectionStatement,
  FeaturedArtwork,
  MeetArtist,
  ServicesPreview,
  GalleryPreview,
  JournalPreview,
  TestimonialSlider,
  CTASection,
} from '@/components/public/home/HomeSections';
import type { PageSection } from '@/types';

async function getHomeData() {
  try {
    const [page, productsRes, servicesRes, blogsRes, testimonials] = await Promise.all([
      serverPublicApi.getPage('home'),
      serverPublicApi.getProducts({ featured: true, limit: 6 }),
      serverPublicApi.getServices({ featured: true, limit: 6 }),
      serverPublicApi.getBlogs({ limit: 3 }),
      serverPublicApi.getTestimonials({ featured: true }),
    ]);
    const galleryImages = loadGalleryImagesFromDisk().filter((img) => img.isFeatured);

    return {
      page,
      products: productsRes.data,
      services: servicesRes.data,
      blogs: blogsRes.data,
      testimonials,
      galleryImages,
    };
  } catch {
    return {
      page: null,
      products: [],
      services: [],
      blogs: [],
      testimonials: [],
      galleryImages: loadGalleryImagesFromDisk().filter((img) => img.isFeatured),
    };
  }
}

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.sectionKey === key && s.isVisible);
}

export default async function HomePage() {
  const { page, products, services, blogs, testimonials, galleryImages } = await getHomeData();
  const sections = page?.sections || [];

  return (
    <>
      {getSection(sections, 'hero') && <HomeHero section={getSection(sections, 'hero')!} />}
      {getSection(sections, 'collection-statement') && (
        <CollectionStatement section={getSection(sections, 'collection-statement')!} />
      )}
      {getSection(sections, 'featured-artwork') && <FeaturedArtwork products={products} />}
      {getSection(sections, 'meet-artist') && <MeetArtist section={getSection(sections, 'meet-artist')!} />}
      {getSection(sections, 'services-preview') && <ServicesPreview services={services} />}
      {getSection(sections, 'gallery-preview') && <GalleryPreview images={galleryImages} />}
      {getSection(sections, 'journal-preview') && <JournalPreview blogs={blogs} />}
      {getSection(sections, 'testimonials') && <TestimonialSlider testimonials={testimonials} />}
      {getSection(sections, 'artpal-cta') && <CTASection section={getSection(sections, 'artpal-cta')!} />}
      {getSection(sections, 'contact-cta') && <CTASection section={getSection(sections, 'contact-cta')!} />}
    </>
  );
}
