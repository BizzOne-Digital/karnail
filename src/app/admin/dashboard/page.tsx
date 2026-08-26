'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import type { DashboardStats } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    adminApi.getDashboardStats().then(setStats).catch(() => {});
  }, []);

  const s = stats?.stats;

  const statCards = [
    { label: 'Services', value: s?.totalServices, href: '/admin/services' },
    { label: 'Gallery Images', value: s?.totalGalleryImages, href: '/admin/gallery' },
    { label: 'Products', value: s?.totalProducts, href: '/admin/products' },
    { label: 'Blog Posts', value: s?.totalBlogs, href: '/admin/blogs' },
    { label: 'Testimonials', value: s?.totalTestimonials, href: '/admin/testimonials' },
    { label: 'FAQs', value: s?.totalFAQs, href: '/admin/faqs' },
    { label: 'Available Artwork', value: s?.availableArtwork, href: '/admin/products' },
    { label: 'Sold Artwork', value: s?.soldArtwork, href: '/admin/products' },
    { label: 'New Orders', value: s?.newOrders, href: '/admin/orders' },
    { label: 'New Enquiries', value: s?.newEnquiries, href: '/admin/orders' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-2xl font-bold text-gray-900">{card.value ?? '—'}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {stats?.recentActivity && (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Recent Services</h2>
              <ul className="space-y-2">
                {stats.recentActivity.services.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600">{s.title}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Recent Blogs</h2>
              <ul className="space-y-2">
                {stats.recentActivity.blogs.map((b, i) => (
                  <li key={i} className="text-sm text-gray-600">{b.title}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Recent Products</h2>
              <ul className="space-y-2">
                {stats.recentActivity.products.map((p, i) => (
                  <li key={i} className="text-sm text-gray-600">{p.title}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/services/new" className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800">Add Service</Link>
        <Link href="/admin/products/new" className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800">Add Product</Link>
        <Link href="/admin/blogs/new" className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800">Add Blog Post</Link>
        <Link href="/admin/pages" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Edit Pages</Link>
      </div>
    </div>
  );
}
