'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import type { GalleryCategory } from '@/types';

export default function AdminGalleryPage() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [newCat, setNewCat] = useState('');

  const load = () => adminApi.getGalleryCategories().then(setCategories).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!newCat.trim()) return;
    await adminApi.createGalleryCategory({ name: newCat, slug: newCat.toLowerCase().replace(/\s+/g, '-') });
    setNewCat('');
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete category and all its images?')) return;
    await adminApi.deleteGalleryCategory(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gallery Categories</h1>
      <div className="flex gap-2 mb-6">
        <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name" className="border border-gray-300 rounded-lg px-3 py-2" />
        <button onClick={handleAdd} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm">Add Category</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">{cat.name}</h3>
            <p className="text-gray-500 text-xs mb-3">/{cat.slug}</p>
            <div className="flex gap-3">
              <Link href={`/admin/gallery/${cat._id}`} className="text-red-800 text-sm hover:underline">Manage Images</Link>
              <button onClick={() => handleDelete(cat._id)} className="text-red-600 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
