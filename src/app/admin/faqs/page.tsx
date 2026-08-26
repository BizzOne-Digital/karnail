'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/services/api';
import type { FAQ } from '@/types';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form, setForm] = useState({ question: '', answer: '', category: 'general' });

  const load = () => adminApi.getFAQs().then(setFaqs).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.question || !form.answer) return;
    await adminApi.createFAQ({ ...form, isPublished: true });
    setForm({ question: '', answer: '', category: 'general' });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await adminApi.deleteFAQ(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">FAQs</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-3 max-w-2xl">
        <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Question *" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Answer *" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <button onClick={handleAdd} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm">Add FAQ</button>
      </div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between">
            <div>
              <p className="font-medium text-gray-900">{faq.question}</p>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
              <span className="text-xs text-gray-400">{faq.category}</span>
            </div>
            <button onClick={() => handleDelete(faq._id)} className="text-red-600 text-sm hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
