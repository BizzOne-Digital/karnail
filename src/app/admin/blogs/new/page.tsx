'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/services/api';
import { slugify } from '@/lib/utils';

export default function NewBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', isPublished: false });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const blog = await adminApi.createBlog({ ...form, slug: form.slug || slugify(form.title) });
      router.push(`/admin/blogs/${blog._id}`);
    } catch {
      alert('Failed to create');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl space-y-4">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title *" required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Content (HTML)" rows={12} className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Publish</label>
        <button type="submit" disabled={saving} className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 disabled:opacity-50">{saving ? 'Creating...' : 'Create Post'}</button>
      </form>
    </div>
  );
}
