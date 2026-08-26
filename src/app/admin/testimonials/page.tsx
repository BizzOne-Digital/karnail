'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/services/api';
import type { Testimonial } from '@/types';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({ customerName: '', customerTitle: '', review: '', rating: 5 });

  const load = () => adminApi.getTestimonials().then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.customerName || !form.review) return;
    await adminApi.createTestimonial({ ...form, isPublished: true });
    setForm({ customerName: '', customerTitle: '', review: '', rating: 5 });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await adminApi.deleteTestimonial(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Testimonials</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-3 max-w-2xl">
        <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} placeholder="Customer Name *" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <input value={form.customerTitle} onChange={(e) => setForm({ ...form, customerTitle: e.target.value })} placeholder="Title/Role" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} placeholder="Review *" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <button onClick={handleAdd} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm">Add Testimonial</button>
      </div>
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t._id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between">
            <div>
              <p className="font-medium text-gray-900">{t.customerName}</p>
              <p className="text-gray-600 text-sm italic">&ldquo;{t.review}&rdquo;</p>
            </div>
            <button onClick={() => handleDelete(t._id)} className="text-red-600 text-sm hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
