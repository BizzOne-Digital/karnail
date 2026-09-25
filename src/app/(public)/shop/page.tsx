import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { serverPublicApi } from '@/services/server-public-api';
import { SectionHero } from '@/components/public/SectionHero';
import { getImageUrl, getAvailabilityLabel, getPurchaseModeLabel } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Shop' };
}

export default async function ShopPage() {
  const [page, productsRes] = await Promise.all([
    serverPublicApi.getPage('shop').catch(() => null),
    serverPublicApi.getProducts({ limit: 50 }),
  ]);

  const hero = page?.sections?.find((s) => s.sectionKey === 'hero');
  const products = productsRes.data;

  return (
    <>
      <SectionHero
        eyebrow={hero?.eyebrow || 'Shop'}
        heading={hero?.heading || 'The Collection'}
        description={hero?.description}
      />

      <section className="py-10 sm:py-16 md:py-24 bg-gallery-black overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <Link key={product._id} href={`/shop/${product.slug}`} className="group">
                <div className="gallery-frame mb-4">
                  <div className="gallery-frame-inner aspect-[4/5] relative overflow-hidden">
                    <Image
                      src={getImageUrl(product.mainImage)}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.availability === 'sold' && (
                      <div className="absolute inset-0 bg-gallery-black/60 flex items-center justify-center">
                        <span className="text-warm-cream font-dramatic tracking-wider">SOLD</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-display text-lg text-warm-cream group-hover:text-aged-gold transition-colors">{product.title}</h3>
                <p className="text-muted-beige text-sm">{product.medium}</p>
                <p className="text-aged-gold text-sm mt-1">
                  {product.showPrice && product.price ? `$${product.price}` : getPurchaseModeLabel(product.purchaseMode)}
                </p>
              </Link>
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-muted-beige py-12">No artwork available at this time.</p>
          )}
        </div>
      </section>
    </>
  );
}
