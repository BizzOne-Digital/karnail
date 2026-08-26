'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import type { Page } from '@/types';

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    adminApi.getPages().then(setPages).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Pages</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Page</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Sections</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.pageKey} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{page.title}</p>
                  <p className="text-gray-500 text-xs">{page.slug}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{page.sections?.length || 0} sections</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${page.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {page.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/pages/${page.pageKey}`} className="text-red-800 text-sm hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
