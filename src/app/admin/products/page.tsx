'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    adminApi.getProducts().then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await adminApi.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Products / Artwork</h1>
        <Link href="/admin/products/new" className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800">Add Product</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Availability</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{product.title}</p>
                  <p className="text-gray-500 text-xs">{product.category} · /{product.slug}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 capitalize">{product.availability}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/products/${product._id}`} className="text-red-800 text-sm hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
