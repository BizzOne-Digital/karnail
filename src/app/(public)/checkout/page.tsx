'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/hooks/useCart';
import { publicApi } from '@/services/api';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { items, clearCart, totalItems } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [refNumber, setRefNumber] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (items.length === 0 && status !== 'success') {
    return (
      <div className="pt-32 pb-16 min-h-screen text-center">
        <h1 className="font-display text-4xl text-warm-cream mb-4">Checkout</h1>
        <p className="text-muted-beige mb-8">Your cart is empty.</p>
        <Button href="/shop">Browse Artwork</Button>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const result = await publicApi.createOrder({
        ...data,
        items: items.map((i) => ({
          productTitle: i.title,
          productSlug: i.slug,
          quantity: i.quantity,
          price: i.price,
          image: i.image,
        })),
      });
      setRefNumber(result.referenceNumber);
      clearCart();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="pt-32 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl text-warm-cream mb-4">Order Request Received</h1>
          <p className="text-muted-beige mb-2">Thank you for your order request. We will be in touch shortly.</p>
          <p className="text-aged-gold mb-8">Reference: {refNumber}</p>
          <Button href="/shop">Continue Browsing</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="font-display text-4xl text-warm-cream mb-8">Checkout</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm text-muted-beige mb-2">Name *</label>
              <input {...register('customerName')} className="w-full bg-soft-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold" />
              {errors.customerName && <p className="text-artist-crimson text-xs mt-1">{errors.customerName.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-muted-beige mb-2">Email *</label>
              <input {...register('email')} type="email" className="w-full bg-soft-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold" />
              {errors.email && <p className="text-artist-crimson text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-muted-beige mb-2">Phone</label>
              <input {...register('phone')} className="w-full bg-soft-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold" />
            </div>
            <div>
              <label className="block text-sm text-muted-beige mb-2">Message</label>
              <textarea {...register('message')} rows={4} className="w-full bg-soft-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold resize-none" />
            </div>
            {status === 'error' && <p className="text-artist-crimson text-sm">Something went wrong. Please try again.</p>}
            <Button type="submit" disabled={status === 'loading'} size="lg" className="w-full">
              {status === 'loading' ? 'Submitting...' : 'Submit Order Request'}
            </Button>
            <p className="text-warm-gray text-xs">No payment is processed at checkout. You will be contacted regarding availability and pricing.</p>
          </form>
        </div>

        <div className="bg-soft-black p-6 border border-warm-gray/10 h-fit">
          <h2 className="font-display text-xl text-warm-cream mb-4">Order Summary ({totalItems} items)</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-muted-beige">{item.title} × {item.quantity}</span>
                {item.price && <span className="text-aged-gold">${item.price * item.quantity}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
