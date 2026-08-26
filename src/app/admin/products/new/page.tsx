'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/services/api';
import { slugify } from '@/lib/utils';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', slug: '', category: '', description: '', medium: '', dimensions: '',
    purchaseMode: 'contact_for_price', availability: 'contact', isPublished: true, showPrice: false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const product = await adminApi.createProduct({ ...form, slug: form.slug || slugify(form.title) });
      router.push(`/admin/products/${product._id}`);
    } catch {
      alert('Failed to create');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
            {(['title', 'slug', 'category', 'medium', 'dimensions'] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                <input value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
        <button type="submit" disabled={saving} className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 disabled:opacity-50">{saving ? 'Creating...' : 'Create Product'}</button>
      </form>
    </div>
  );
}
