'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminApi } from '@/services/api';
import type { Service } from '@/types';

export default function EditServicePage() {
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'listing' | 'detail'>('listing');

  useEffect(() => {
    adminApi.getService(id).then(setForm).catch(() => {});
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updateService(id, form);
      setForm(updated);
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: unknown) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Service</h1>
        <button onClick={handleSave} disabled={saving} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('listing')} className={`px-4 py-2 rounded-lg text-sm ${tab === 'listing' ? 'bg-red-900 text-white' : 'bg-gray-100'}`}>Listing Info</button>
        <button onClick={() => setTab('detail')} className={`px-4 py-2 rounded-lg text-sm ${tab === 'detail' ? 'bg-red-900 text-white' : 'bg-gray-100'}`}>Detail Page</button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl space-y-4">
        {tab === 'listing' ? (
          <>
            {['title', 'slug', 'shortDescription', 'mainImage', 'imageAlt'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input value={(form as Record<string, string>)[field] || ''} onChange={(e) => update(field, e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
            ))}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Published</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} /> Featured</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.contactForPricing} onChange={(e) => update('contactForPricing', e.target.checked)} /> Contact for Pricing</label>
            </div>
          </>
        ) : (
          <>
            {['heroHeading', 'heroDescription', 'heroBackgroundImage', 'fullDescription', 'pricingInfo', 'ctaText', 'ctaUrl', 'seoTitle', 'seoDescription'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                {field.includes('Description') || field === 'fullDescription' ? (
                  <textarea value={(form as Record<string, string>)[field] || ''} onChange={(e) => update(field, e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                ) : (
                  <input value={(form as Record<string, string>)[field] || ''} onChange={(e) => update(field, e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rich Text Content</label>
              <textarea value={form.richTextContent || ''} onChange={(e) => update('richTextContent', e.target.value)} rows={8} className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
