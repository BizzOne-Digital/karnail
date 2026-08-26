'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminApi } from '@/services/api';
import type { GalleryImage } from '@/types';

export default function AdminGalleryCategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [form, setForm] = useState({ title: '', description: '', medium: '', dimensions: '', availability: 'contact' });

  const load = () => adminApi.getGalleryImages(categoryId).then(setImages).catch(() => {});
  useEffect(() => { load(); }, [categoryId]);

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    await adminApi.createGalleryImage({ ...form, categoryId });
    setForm({ title: '', description: '', medium: '', dimensions: '', availability: 'contact' });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await adminApi.deleteGalleryImage(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gallery Images</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title *" className="border border-gray-300 rounded-lg px-3 py-2" />
        <input value={form.medium} onChange={(e) => setForm({ ...form, medium: e.target.value })} placeholder="Medium" className="border border-gray-300 rounded-lg px-3 py-2" />
        <input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} placeholder="Dimensions" className="border border-gray-300 rounded-lg px-3 py-2" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2" />
        <button onClick={handleAdd} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm">Add Image Entry</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img._id} className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">{img.title}</h3>
            <p className="text-gray-500 text-xs">{img.medium} · {img.dimensions}</p>
            <p className="text-gray-600 text-sm mt-1">{img.availability}</p>
            <button onClick={() => handleDelete(img._id)} className="text-red-600 text-sm mt-2 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
