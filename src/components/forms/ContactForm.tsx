'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { publicApi } from '@/services/api';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(7, 'Phone number is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get('subject');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [refNumber, setRefNumber] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: '' },
  });

  useEffect(() => {
    if (subjectParam) {
      setValue('message', `Regarding: ${subjectParam}\n\n`);
    }
  }, [subjectParam, setValue]);

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const result = await publicApi.createEnquiry({
        name: data.name,
        phone: data.phone,
        message: data.message,
        email: '',
        enquiryType: 'general',
        artworkOrService: '',
      });
      setRefNumber(result.referenceNumber);
      setStatus('success');
      reset({ name: '', phone: '', message: subjectParam ? `Regarding: ${subjectParam}\n\n` : '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-warm-cream/60 border border-warm-gray/30 p-8 text-center">
        <h3 className="font-display text-2xl text-deep-oxblood mb-4">Thank You</h3>
        <p className="text-gallery-black/75 mb-2">Your message has been received.</p>
        {refNumber && <p className="text-gold-text font-medium">Reference: {refNumber}</p>}
        <Button onClick={() => setStatus('idle')} variant="outline" className="mt-6">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm text-gallery-black/80 mb-2">Name *</label>
        <input
          {...register('name')}
          className="w-full bg-light-canvas border border-warm-gray/40 text-gallery-black px-4 py-3 focus:outline-none focus:border-artist-crimson"
        />
        {errors.name && <p className="text-artist-crimson text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gallery-black/80 mb-2">Phone Number *</label>
        <input
          {...register('phone')}
          type="tel"
          autoComplete="tel"
          className="w-full bg-light-canvas border border-warm-gray/40 text-gallery-black px-4 py-3 focus:outline-none focus:border-aged-gold"
        />
        {errors.phone && <p className="text-artist-crimson text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gallery-black/80 mb-2">Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full bg-light-canvas border border-warm-gray/40 text-gallery-black px-4 py-3 focus:outline-none focus:border-aged-gold resize-none"
        />
        {errors.message && <p className="text-artist-crimson text-xs mt-1">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-artist-crimson text-sm">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" disabled={status === 'loading'} size="lg">
        {status === 'loading' ? 'Sending...' : 'Submit Message'}
      </Button>
    </form>
  );
}
