'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/services/api';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { NavEditor, SocialEditor } from '@/components/admin/NavEditor';
import type { SiteSettings, NavItem } from '@/types';

type Tab = 'general' | 'branding' | 'header' | 'footer' | 'seo';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<Tab>('general');

  useEffect(() => {
    adminApi.getSettings().then(setSettings).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updateSettings(settings);
      setSettings(updated);
      setMessage('Settings saved successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'branding', label: 'Branding & Logos' },
    { id: 'header', label: 'Header' },
    { id: 'footer', label: 'Footer' },
    { id: 'seo', label: 'SEO' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Site Settings</h1>
          <p className="text-gray-500 text-sm">Manage logo, header, footer, navigation, and global content</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-green-600 text-sm">{message}</span>}
          <button onClick={handleSave} disabled={saving} className="bg-red-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-lg text-sm ${tab === t.id ? 'bg-red-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl space-y-6">
        {tab === 'general' && (
          <>
            {['artistName', 'headline', 'shortBio', 'email', 'phone', 'website', 'address', 'artPalUrl'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                {['shortBio', 'address'].includes(field) ? (
                  <textarea
                    value={(settings.general?.[field as keyof NonNullable<typeof settings.general>] as string) || ''}
                    onChange={(e) => setSettings((p) => ({ ...p, general: { ...p.general!, [field]: e.target.value } }))}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <input
                    value={(settings.general?.[field as keyof NonNullable<typeof settings.general>] as string) || ''}
                    onChange={(e) => setSettings((p) => ({ ...p, general: { ...p.general!, [field]: e.target.value } }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                )}
              </div>
            ))}
            <SocialEditor
              links={settings.general?.socialLinks || []}
              onChange={(links) => setSettings((p) => ({ ...p, general: { ...p.general!, socialLinks: links } }))}
            />
          </>
        )}

        {tab === 'branding' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload label="Main Logo" folder="settings" value={settings.branding?.mainLogo} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, mainLogo: url } }))} />
            <ImageUpload label="Dark Logo" folder="settings" value={settings.branding?.darkLogo} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, darkLogo: url } }))} />
            <ImageUpload label="Light Logo" folder="settings" value={settings.branding?.lightLogo} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, lightLogo: url } }))} />
            <ImageUpload label="Footer Logo" folder="settings" value={settings.branding?.footerLogo} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, footerLogo: url } }))} />
            <ImageUpload label="Favicon" folder="settings" value={settings.branding?.favicon} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, favicon: url } }))} />
            <ImageUpload label="Signature Image" folder="settings" value={settings.branding?.signatureImage} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, signatureImage: url } }))} />
            <ImageUpload label="Intro Logo" folder="settings" value={settings.branding?.introLogo} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, introLogo: url } }))} />
            <ImageUpload label="Placeholder Image" folder="settings" value={settings.branding?.placeholderImage} onChange={(url) => setSettings((p) => ({ ...p, branding: { ...p.branding!, placeholderImage: url } }))} />
          </div>
        )}

        {tab === 'header' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
              <input value={settings.header?.logoText || ''} onChange={(e) => setSettings((p) => ({ ...p, header: { ...p.header!, logoText: e.target.value } }))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                <input value={settings.header?.ctaText || ''} onChange={(e) => setSettings((p) => ({ ...p, header: { ...p.header!, ctaText: e.target.value } }))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button URL</label>
                <input value={settings.header?.ctaUrl || ''} onChange={(e) => setSettings((p) => ({ ...p, header: { ...p.header!, ctaUrl: e.target.value } }))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
            </div>
            <NavEditor
              label="Header Navigation"
              items={settings.header?.navigation || []}
              onChange={(navigation: NavItem[]) => setSettings((p) => ({ ...p, header: { ...p.header!, navigation } }))}
            />
          </>
        )}

        {tab === 'footer' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Description</label>
              <textarea value={settings.footer?.description || ''} onChange={(e) => setSettings((p) => ({ ...p, footer: { ...p.footer!, description: e.target.value } }))} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
              <input value={settings.footer?.copyright || ''} onChange={(e) => setSettings((p) => ({ ...p, footer: { ...p.footer!, copyright: e.target.value } }))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter Text</label>
              <textarea value={settings.footer?.newsletterText || ''} onChange={(e) => setSettings((p) => ({ ...p, footer: { ...p.footer!, newsletterText: e.target.value } }))} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['email', 'phone', 'website'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">Contact {field}</label>
                  <input
                    value={settings.footer?.contactInfo?.[field as keyof typeof settings.footer.contactInfo] || ''}
                    onChange={(e) => setSettings((p) => ({ ...p, footer: { ...p.footer!, contactInfo: { ...p.footer!.contactInfo, [field]: e.target.value } } }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              ))}
            </div>
            <NavEditor label="Footer Navigation" items={settings.footer?.navigation || []} onChange={(navigation) => setSettings((p) => ({ ...p, footer: { ...p.footer!, navigation } }))} />
            <SocialEditor links={settings.footer?.socialLinks || []} onChange={(links) => setSettings((p) => ({ ...p, footer: { ...p.footer!, socialLinks: links } }))} />
          </>
        )}

        {tab === 'seo' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default SEO Title</label>
              <input value={settings.seo?.defaultTitle || ''} onChange={(e) => setSettings((p) => ({ ...p, seo: { ...p.seo!, defaultTitle: e.target.value } }))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default SEO Description</label>
              <textarea value={settings.seo?.defaultDescription || ''} onChange={(e) => setSettings((p) => ({ ...p, seo: { ...p.seo!, defaultDescription: e.target.value } }))} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <ImageUpload label="Default OG Image" folder="settings" value={settings.seo?.defaultOgImage} onChange={(url) => setSettings((p) => ({ ...p, seo: { ...p.seo!, defaultOgImage: url } }))} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
              <input value={settings.seo?.keywords?.join(', ') || ''} onChange={(e) => setSettings((p) => ({ ...p, seo: { ...p.seo!, keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean) } }))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
