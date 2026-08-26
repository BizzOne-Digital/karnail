'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/services/api';
import type { PricingContent } from '@/types';

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState<Partial<PricingContent>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getPricing().then(setPricing).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await adminApi.updatePricing(pricing);
      setPricing(updated);
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: unknown) => setPricing((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Pricing</h1>
        <button onClick={handleSave} disabled={saving} className="bg-red-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-800 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl space-y-4">
        {['heroHeading', 'heroDescription', 'introduction', 'contactForPricingMessage', 'commissionNotes', 'artPalUrl', 'ctaText', 'ctaUrl'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <textarea value={(pricing as Record<string, string>)[field] || ''} onChange={(e) => update(field, e.target.value)} rows={field.includes('Message') || field.includes('Notes') ? 3 : 1} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
