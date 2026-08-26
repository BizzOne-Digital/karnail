'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import type { Service } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    adminApi.getServices().then((r) => setServices(r.data)).catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await adminApi.deleteService(id);
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <Link href="/admin/services/new" className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800">Add Service</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{service.title}</p>
                  <p className="text-gray-500 text-xs">/{service.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${service.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {service.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/services/${service._id}`} className="text-red-800 text-sm hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(service._id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
