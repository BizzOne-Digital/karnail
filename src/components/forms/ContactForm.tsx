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
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  artworkOrService: z.string().optional(),
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
    defaultValues: {
      enquiryType: subjectParam ? 'book' : 'general',
      artworkOrService: subjectParam || '',
    },
  });

  useEffect(() => {
    if (subjectParam) {
      setValue('enquiryType', 'book');
      setValue('artworkOrService', subjectParam);
    }
  }, [subjectParam, setValue]);

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const result = await publicApi.createEnquiry(data);
      setRefNumber(result.referenceNumber);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-soft-black border border-aged-gold/30 p-8 text-center">
        <h3 className="font-display text-2xl text-warm-cream mb-4">Thank You</h3>
        <p className="text-muted-beige mb-2">Your enquiry has been received.</p>
        {refNumber && <p className="text-aged-gold">Reference: {refNumber}</p>}
        <Button onClick={() => setStatus('idle')} variant="outline" className="mt-6">
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-muted-beige mb-2">Name *</label>
          <input
            {...register('name')}
            className="w-full bg-gallery-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold"
          />
          {errors.name && <p className="text-artist-crimson text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-muted-beige mb-2">Email *</label>
          <input
            {...register('email')}
            type="email"
            className="w-full bg-gallery-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold"
          />
          {errors.email && <p className="text-artist-crimson text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-muted-beige mb-2">Phone</label>
          <input
            {...register('phone')}
            className="w-full bg-gallery-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-beige mb-2">Enquiry Type *</label>
          <select
            {...register('enquiryType')}
            className="w-full bg-gallery-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold"
          >
            <option value="general">General Enquiry</option>
            <option value="book">Book Enquiry</option>
            <option value="artwork">Artwork Enquiry</option>
            <option value="mural">Mural Enquiry</option>
            <option value="commission">Commission Enquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted-beige mb-2">Artwork or Service</label>
        <input
          {...register('artworkOrService')}
          placeholder="e.g. The Mystery of the Rose"
          className="w-full bg-gallery-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold"
        />
      </div>

      <div>
        <label className="block text-sm text-muted-beige mb-2">Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full bg-gallery-black border border-warm-gray/30 text-warm-cream px-4 py-3 focus:outline-none focus:border-aged-gold resize-none"
        />
        {errors.message && <p className="text-artist-crimson text-xs mt-1">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-artist-crimson text-sm">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" disabled={status === 'loading'} size="lg">
        {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
      </Button>
    </form>
  );
}
