'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { publicApi } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { getImageUrl, getPurchaseModeLabel } from '@/lib/utils';
import type { Product } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [slug, setSlug] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
      publicApi.getProduct(p.slug).then(setProduct).catch(() => setProduct(null));
    });
  }, [params]);

  if (product === null && slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-beige">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-warm-cream mb-4">Artwork Not Found</h1>
          <Button href="/shop">Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      image: product.mainImage,
      quantity: 1,
      price: product.price,
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="gallery-frame mb-4">
            <div className="gallery-frame-inner aspect-[4/5] relative">
              <Image src={getImageUrl(product.mainImage)} alt={product.title} fill className="object-cover" priority />
            </div>
          </div>
          {product.galleryImages?.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.galleryImages.map((img, i) => (
                <div key={i} className="aspect-square relative">
                  <Image src={getImageUrl(img.url)} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-aged-gold text-sm mb-2">{product.category}</p>
          <h1 className="font-display text-4xl text-warm-cream mb-4">{product.title}</h1>
          <div className="space-y-2 text-muted-beige text-sm mb-6">
            {product.medium && <p>Medium: {product.medium}</p>}
            {product.dimensions && <p>Dimensions: {product.dimensions}</p>}
            {product.year && <p>Year: {product.year}</p>}
            {product.sku && <p>SKU: {product.sku}</p>}
          </div>

          <p className="text-muted-beige leading-relaxed mb-4">{product.description}</p>
          {product.story && (
            <div className="bg-soft-black p-6 mb-6 border-l-2 border-artist-crimson">
              <h3 className="font-display text-lg text-warm-cream mb-2">The Story</h3>
              <p className="text-muted-beige text-sm">{product.story}</p>
            </div>
          )}

          <p className="font-display text-2xl text-aged-gold mb-6">
            {product.showPrice && product.price ? `$${product.price}` : getPurchaseModeLabel(product.purchaseMode)}
          </p>

          <div className="flex flex-wrap gap-4">
            {product.purchaseMode === 'artpal' && product.artPalUrl && (
              <Button href={product.artPalUrl} variant="primary" size="lg">View on ArtPal</Button>
            )}
            {product.purchaseMode === 'direct_order' && product.availability !== 'sold' && (
              <Button onClick={handleAddToCart} size="lg">Add to Cart</Button>
            )}
            <Button href="/contact" variant="outline" size="lg">Enquire About This Piece</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
