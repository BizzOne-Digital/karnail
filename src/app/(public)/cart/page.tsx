'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { getImageUrl } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl text-warm-cream mb-4">Your Cart</h1>
          <p className="text-muted-beige mb-8">Your cart is empty.</p>
          <Button href="/shop" size="lg">Browse Artwork</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-display text-4xl text-warm-cream mb-8">Your Cart ({totalItems})</h1>

        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-6 bg-soft-black p-4 border border-warm-gray/10">
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image src={getImageUrl(item.image)} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={`/shop/${item.slug}`} className="font-display text-lg text-warm-cream hover:text-aged-gold">
                  {item.title}
                </Link>
                {item.price && <p className="text-aged-gold text-sm">${item.price}</p>}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="text-muted-beige hover:text-warm-cream w-8 h-8 border border-warm-gray/30"
                  >
                    −
                  </button>
                  <span className="text-warm-cream">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="text-muted-beige hover:text-warm-cream w-8 h-8 border border-warm-gray/30"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-artist-crimson text-sm ml-4 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button href="/shop" variant="outline">Continue Shopping</Button>
          <Button href="/checkout" size="lg">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
