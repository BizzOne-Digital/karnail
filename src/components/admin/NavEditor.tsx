'use client';

import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import type { NavItem } from '@/types';

interface NavEditorProps {
  items: NavItem[];
  onChange: (items: NavItem[]) => void;
  label?: string;
}

export function NavEditor({ items, onChange, label = 'Navigation' }: NavEditorProps) {
  const update = (index: number, field: keyof NavItem, value: string | boolean | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const add = () => {
    onChange([...items, { label: 'New Link', url: '/', isVisible: true, order: items.length }]);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((item, i) => (item.order = i));
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-red-800 hover:underline">
          <Plus size={14} /> Add Link
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">
                <ChevronUp size={14} />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">
                <ChevronDown size={14} />
              </button>
            </div>
            <input
              value={item.label}
              onChange={(e) => update(i, 'label', e.target.value)}
              placeholder="Label"
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              value={item.url}
              onChange={(e) => update(i, 'url', e.target.value)}
              placeholder="URL"
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <label className="flex items-center gap-1 text-xs whitespace-nowrap">
              <input type="checkbox" checked={item.isVisible} onChange={(e) => update(i, 'isVisible', e.target.checked)} />
              Visible
            </label>
            <button type="button" onClick={() => remove(i)} className="text-red-600 hover:text-red-800">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SocialEditorProps {
  links: { platform: string; url: string; username?: string }[];
  onChange: (links: { platform: string; url: string; username?: string }[]) => void;
}

export function SocialEditor({ links, onChange }: SocialEditorProps) {
  const update = (index: number, field: string, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Social Links</label>
        <button
          type="button"
          onClick={() => onChange([...links, { platform: '', url: '' }])}
          className="text-sm text-red-800 hover:underline"
        >
          + Add
        </button>
      </div>
      {links.map((link, i) => (
        <div key={i} className="flex gap-2">
          <input value={link.platform} onChange={(e) => update(i, 'platform', e.target.value)} placeholder="Platform" className="w-1/4 border border-gray-300 rounded px-2 py-1 text-sm" />
          <input value={link.url} onChange={(e) => update(i, 'url', e.target.value)} placeholder="URL" className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
          <input value={link.username || ''} onChange={(e) => update(i, 'username', e.target.value)} placeholder="Username" className="w-1/4 border border-gray-300 rounded px-2 py-1 text-sm" />
          <button type="button" onClick={() => onChange(links.filter((_, j) => j !== i))} className="text-red-600"><Trash2 size={14} /></button>
        </div>
      ))}
    </div>
  );
}
