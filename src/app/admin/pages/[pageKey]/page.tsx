'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '@/services/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import type { Page, PageSection } from '@/types';

export default function AdminPageEditor() {
  const params = useParams();
  const pageKey = params.pageKey as string;
  const [page, setPage] = useState<Page | null>(null);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    adminApi.getPage(pageKey).then(setPage).catch(() => {});
  }, [pageKey]);

  const handleSaveSection = async () => {
    if (!editingSection) return;
    setSaving(true);
    try {
      const updated = await adminApi.updatePageSection(pageKey, editingSection.sectionKey, editingSection as unknown as Record<string, unknown>);
      setPage(updated);
      setMessage('Section saved successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: unknown) => {
    if (!editingSection) return;
    setEditingSection({ ...editingSection, [key]: value });
  };

  if (!page) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/pages" className="text-red-800 text-sm hover:underline mb-2 block">← Back to Pages</Link>
          <h1 className="text-2xl font-semibold text-gray-900">Edit: {page.title}</h1>
          <p className="text-gray-500 text-sm">{page.sections?.length} sections · Page key: {page.pageKey}</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-green-600 text-sm">{message}</span>}
          <a href={`/${pageKey === 'home' ? '' : pageKey}`} target="_blank" rel="noopener noreferrer" className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            Preview Page
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wider">Page Sections</h2>
          {page.sections?.sort((a, b) => a.order - b.order).map((section) => (
            <div
              key={section.sectionKey}
              className={`bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                editingSection?.sectionKey === section.sectionKey ? 'border-red-800 ring-2 ring-red-800/20' : 'border-gray-200'
              }`}
              onClick={() => setEditingSection({ ...section })}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{section.label}</p>
                  <p className="text-gray-500 text-xs">{section.sectionType} · {section.sectionKey}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${section.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {section.isVisible ? 'Visible' : 'Hidden'}
                </span>
              </div>
              {section.heading && <p className="text-gray-600 text-sm mt-2 truncate">{section.heading}</p>}
              {(section.backgroundImage || section.mainImage) && (
                <p className="text-xs text-blue-600 mt-1">Has images</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 xl:sticky xl:top-6 xl:max-h-[90vh] xl:overflow-y-auto">
          {editingSection ? (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900 text-lg">Edit: {editingSection.label}</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Section Type</label>
                  <input value={editingSection.sectionType} onChange={(e) => update('sectionType', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Layout</label>
                  <input value={editingSection.layout} onChange={(e) => update('layout', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
                </div>
              </div>

              {['eyebrow', 'heading', 'subheading', 'buttonText', 'buttonUrl'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input value={String((editingSection as unknown as Record<string, string>)[field] || '')} onChange={(e) => update(field, e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editingSection.description} onChange={(e) => update('description', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rich Text (HTML)</label>
                <textarea value={editingSection.richText} onChange={(e) => update('richText', e.target.value)} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" />
              </div>

              <ImageUpload label="Background Image" folder="pages" value={editingSection.backgroundImage} onChange={(url) => update('backgroundImage', url)} />
              <ImageUpload label="Main Image" folder="pages" value={editingSection.mainImage} onChange={(url) => update('mainImage', url)} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select value={editingSection.theme} onChange={(e) => update('theme', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="dark">Dark</option>
                  <option value="cream">Cream</option>
                  <option value="red-accent">Red Accent</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editingSection.isVisible} onChange={(e) => update('isVisible', e.target.checked)} />
                  Visible on page
                </label>
                <div>
                  <label className="text-sm text-gray-600 mr-2">Order</label>
                  <input type="number" value={editingSection.order} onChange={(e) => update('order', parseInt(e.target.value))} className="w-16 border border-gray-300 rounded px-2 py-1 text-sm" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button onClick={handleSaveSection} disabled={saving} className="bg-red-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-800 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Section'}
                </button>
                <button onClick={() => setEditingSection(null)} className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-16">Select a section to edit its content, images, and visibility</p>
          )}
        </div>
      </div>
    </div>
  );
}
