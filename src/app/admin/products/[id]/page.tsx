'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminApi } from '@/services/api';
import type { Product } from '@/types';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState<Partial<Product>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getProduct(id).then(setForm).catch(() => {});
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updateProduct(id, form);
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
        <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
        <button onClick={handleSave} disabled={saving} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl space-y-4">
        {['title', 'slug', 'category', 'mainImage', 'description', 'story', 'medium', 'dimensions', 'year', 'sku', 'artPalUrl', 'seoTitle', 'seoDescription'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            {['description', 'story'].includes(field) ? (
              <textarea value={(form as Record<string, string>)[field] || ''} onChange={(e) => update(field, e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            ) : (
              <input value={(form as Record<string, string>)[field] || ''} onChange={(e) => update(field, e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            )}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input type="number" value={form.price || ''} onChange={(e) => update('price', e.target.value ? Number(e.target.value) : undefined)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Published</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.showPrice} onChange={(e) => update('showPrice', e.target.checked)} /> Show Price</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Mode</label>
          <select value={form.purchaseMode || 'contact_for_price'} onChange={(e) => update('purchaseMode', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="contact_for_price">Contact for Price</option>
            <option value="artpal">ArtPal</option>
            <option value="direct_order">Direct Order</option>
            <option value="sold">Sold</option>
            <option value="not_available">Not Available</option>
          </select>
        </div>
      </div>
    </div>
  );
}
