'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl, formatDate } from '@/lib/utils';
import { ARTIST_PORTRAIT, resolveHomeBannerImage } from '@/lib/brand';
import { BANNER_VERSE } from '@/lib/about-content';
import { SplitText, RevealOnScroll, StaggerChildren, StaggerItem, PaintStrokeReveal } from '@/components/animations/MotionPrimitives';
import { TiltFrame, Magnetic, GlowButton } from '@/components/animations/InteractiveElements';
import { HorizontalScrollSection, AutoScrollMarquee } from '@/components/animations/ScrollEffects';
import type { PageSection, Product, Service, BlogPost, Testimonial, GalleryImage } from '@/types';

export function HomeHero({ section }: { section: PageSection }) {
  const bannerImage = resolveHomeBannerImage(section.backgroundImage);

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-page-silver pt-1 pb-0">
      <div className="w-full max-w-[960px] mx-auto px-2 sm:px-3">
        <div className="relative w-full aspect-[1056/420] sm:aspect-[1056/400] min-h-[180px] max-h-[min(52vh,440px)] overflow-hidden shadow-[0_4px_18px_rgba(9,8,7,0.08)] border border-warm-gray/25 bg-soft-black/5">
          <Image
            src={getImageUrl(bannerImage)}
            alt="Sukh D. H. Khokhar — mystical art banner"
            fill
            priority
            className="object-cover object-center scale-[1.08] sm:scale-[1.06]"
            sizes="100vw"
          />

          <div
            className="absolute inset-x-[6%] sm:inset-x-[8%] top-[40%] sm:top-[41%] bottom-[14%] sm:bottom-[16%] flex items-center justify-center px-2 sm:px-4 pointer-events-none"
            aria-label="Banner verse"
          >
            <div className="max-w-[92%] w-full text-center">
              {BANNER_VERSE.map((line, index) => (
                <p
                  key={line}
                  className="hero-verse-line font-display text-[11px] sm:text-sm md:text-base lg:text-lg text-warm-cream/95 italic leading-snug sm:leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                  style={{ animationDelay: `${index * 0.75}s`, paddingLeft: `${index * 0.5}rem` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CollectionStatement({ section }: { section: PageSection }) {
  return (
    <section className="relative py-16 sm:py-24 md:py-48 bg-light-canvas overflow-hidden w-full max-w-full border-y border-warm-gray/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,37,49,0.06)_0%,transparent_70%)]" />
      <PinnedStatement heading={section.heading} />
    </section>
  );
}

function PinnedStatement({ heading }: { heading: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
      <SplitText text={heading} as="h2" className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-deep-oxblood leading-[1.08] px-2" mode="words" />
      <PaintStrokeReveal className="max-w-lg mx-auto mt-8" />
    </div>
  );
}

export function FeaturedArtwork({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-light-canvas relative overflow-hidden w-full max-w-full border-y border-warm-gray/20">
      <div className="max-w-7xl mx-auto px-4 relative">
        <RevealOnScroll className="text-center mb-16">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-4">Curated Selection</p>
          <h2 className="font-display text-4xl md:text-6xl text-warm-cream">Featured Artwork</h2>
        </RevealOnScroll>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 6).map((product, i) => (
            <StaggerItem key={product._id}>
              <Link href={`/shop/${product.slug}`} className="group block" data-cursor>
                <TiltFrame>
                  <div className="gallery-frame mb-5">
                    <div className="gallery-frame-inner aspect-[4/5] relative overflow-hidden">
                      <Image src={getImageUrl(product.mainImage)} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gallery-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </TiltFrame>
                <h3 className="font-display text-2xl text-warm-cream group-hover:text-aged-gold transition-colors">{product.title}</h3>
                <p className="text-muted-beige text-sm mt-1">{product.medium}</p>
                <p className="text-aged-gold text-sm mt-2 tracking-wide">{product.showPrice && product.price ? `$${product.price}` : 'Contact for Pricing'}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-warm-cream/40 overflow-hidden w-full max-w-full border-y border-warm-gray/15">
      <div className="max-w-7xl mx-auto px-4">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl text-warm-cream">Creative Services</h2>
          <PaintStrokeReveal className="max-w-xs mx-auto" />
        </RevealOnScroll>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service._id}>
              <Link href={`/services/${service.slug}`} className="group block h-full bg-light-canvas border border-warm-gray/25 hover:border-artist-crimson/40 transition-all duration-500 overflow-hidden shadow-sm" data-cursor>
                <div className="aspect-[16/10] relative overflow-hidden">
                  {service.mainImage ? (
                    <Image src={getImageUrl(service.mainImage)} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-deep-oxblood/40 to-soft-black" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gallery-black to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl text-warm-cream mb-3 group-hover:text-aged-gold transition-colors">{service.title}</h3>
                  <p className="text-muted-beige text-sm leading-relaxed">{service.shortDescription}</p>
                  <span className="inline-block mt-6 text-aged-gold text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform">View Service →</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  const cards = testimonials.map((t) => (
    <article
      key={t._id}
      className="w-[min(85vw,300px)] sm:w-[320px] md:w-[380px] lg:w-[420px] flex-shrink-0 mx-2 sm:mx-3 bg-light-canvas border border-warm-gray/25 p-6 sm:p-8 md:p-10 relative shadow-sm"
    >
      <span className="absolute top-5 left-6 font-display text-5xl text-artist-crimson/25 leading-none">&ldquo;</span>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="text-aged-gold text-sm">★</span>
        ))}
      </div>
      <p className="font-display text-lg md:text-xl text-warm-cream italic leading-relaxed mb-5 line-clamp-4">
        {t.review}
      </p>
      <p className="text-muted-beige text-sm font-medium">{t.customerName}</p>
      {t.customerTitle && <p className="text-warm-gray text-xs mt-1">{t.customerTitle}</p>}
    </article>
  ));

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-light-canvas relative overflow-hidden w-full max-w-full border-y border-warm-gray/20">
      <div className="absolute inset-0 spotlight" />
      <RevealOnScroll className="max-w-7xl mx-auto px-4 mb-12 md:mb-16 relative text-center">
        <h2 className="font-display text-4xl md:text-6xl text-warm-cream">What Collectors Say</h2>
      </RevealOnScroll>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-light-canvas to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-light-canvas to-transparent z-10" />
        <AutoScrollMarquee duration={50} className="py-2">
          {cards}
        </AutoScrollMarquee>
      </div>
    </section>
  );
}

export function JournalPreview({ blogs }: { blogs: BlogPost[] }) {
  if (!blogs.length) return null;
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-light-canvas text-gallery-black overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4">
        <RevealOnScroll className="text-center mb-16">
          <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-4">Stories from the Studio</p>
          <h2 className="font-display text-4xl md:text-6xl">The Artist&apos;s Journal</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.slice(0, 3).map((blog, i) => (
            <RevealOnScroll key={blog._id} delay={i * 0.15}>
              <Link href={`/blog/${blog.slug}`} className="group block" data-cursor>
                <div className="aspect-[16/10] relative mb-5 overflow-hidden bg-muted-beige">
                  {blog.heroImage && <Image src={getImageUrl(blog.heroImage)} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />}
                </div>
                <p className="text-warm-gray text-xs tracking-wider mb-2">{formatDate(blog.publishDate)}</p>
                <h3 className="font-display text-2xl group-hover:text-artist-crimson transition-colors">{blog.title}</h3>
                <p className="text-warm-gray text-sm mt-3 line-clamp-2">{blog.excerpt}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection({ section }: { section: PageSection }) {
  const isRed = section.theme === 'red-accent';
  return (
    <section className={`py-16 sm:py-24 md:py-32 relative overflow-hidden w-full max-w-full border-y border-warm-gray/20 ${isRed ? 'bg-warm-cream/60' : 'bg-light-canvas'}`}>
      <div className="absolute inset-0 spotlight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,138,77,0.1)_0%,transparent_60%)]" />
      <RevealOnScroll className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <SplitText text={section.heading} as="h2" className="font-display text-3xl md:text-5xl lg:text-6xl text-warm-cream mb-8" />
        {section.description && <p className="text-muted-beige text-lg mb-10 leading-relaxed">{section.description}</p>}
        {section.buttonText && (
          <Magnetic className="inline-block">
            <GlowButton href={section.buttonUrl || '/contact'}>{section.buttonText}</GlowButton>
          </Magnetic>
        )}
      </RevealOnScroll>
    </section>
  );
}

export function MeetArtist({ section }: { section: PageSection }) {
  const portrait = section.mainImage || ARTIST_PORTRAIT;
  const extras = section.additionalImages?.map((i) => i.url).filter(Boolean) || [];
  const images = [portrait, ...extras].slice(0, 4);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-warm-cream/30 overflow-hidden w-full max-w-full border-y border-warm-gray/15">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
        <RevealOnScroll direction="up">
          {images.length === 1 ? (
            <TiltFrame>
              <div className="gallery-frame max-w-md mx-auto lg:mx-0 lg:max-w-none">
                <div className="gallery-frame-inner relative bg-warm-cream aspect-[4/5]">
                  <Image src={getImageUrl(images[0])} alt="Sukh D. H. Khokhar" fill className="object-cover object-top" />
                </div>
              </div>
            </TiltFrame>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <TiltFrame key={i} className={i === 0 ? 'col-span-2' : ''}>
                  <div className="gallery-frame">
                    <div className={`gallery-frame-inner relative bg-warm-cream ${i === 0 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                      <Image src={getImageUrl(img)} alt="" fill className="object-cover" />
                    </div>
                  </div>
                </TiltFrame>
              ))}
            </div>
          )}
        </RevealOnScroll>
        <RevealOnScroll direction="up">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4">The Artist</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-cream mb-4 sm:mb-6 break-words">{section.heading}</h2>
          <p className="text-muted-beige leading-relaxed text-lg mb-8">{section.description}</p>
          <GlowButton href={section.buttonUrl || '/about'}>{section.buttonText || 'Discover the Artist'}</GlowButton>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function GalleryPreview({ images }: { images: GalleryImage[] }) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-warm-cream/40 overflow-hidden w-full max-w-full border-y border-warm-gray/15">
      <RevealOnScroll className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-warm-cream">Immersive Gallery</h2>
      </RevealOnScroll>
      <HorizontalScrollSection className="py-4 sm:py-8">
        {images.slice(0, 10).map((img) => (
          <div key={img._id} className="gallery-frame w-56 sm:w-64 md:w-80 flex-shrink-0 snap-center" data-cursor>
            <div className="gallery-frame-inner aspect-[3/4] relative">
              <Image src={getImageUrl(img.imageUrl)} alt={img.title} fill className="object-cover" />
            </div>
            <p className="text-warm-cream text-sm mt-3 text-center font-display">{img.title}</p>
          </div>
        ))}
      </HorizontalScrollSection>
      <div className="text-center mt-12">
        <GlowButton href="/gallery">View Full Gallery</GlowButton>
      </div>
    </section>
  );
}
