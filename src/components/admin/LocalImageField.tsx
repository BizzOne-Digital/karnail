'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2, Upload, X } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import type { UploadFolder } from '@/lib/upload-constants';

type ToastType = 'success' | 'error';

interface LocalImageFieldProps {
  value?: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  label?: string;
  className?: string;
}

async function deleteStoredUpload(url: string) {
  await fetch('/api/upload', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ url }),
  });
}

export function LocalImageField({
  value,
  onChange,
  folder,
  label = 'Image',
  className,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (type: ToastType, message: string) => setToast({ type, message });

  const handleRemove = async () => {
    if (value?.startsWith('/api/uploads/')) {
      try {
        await deleteStoredUpload(value);
      } catch {
        showToast('error', 'Failed to delete stored image');
        return;
      }
    }
    onChange('');
    showToast('success', 'Image removed');
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      showToast('error', 'Only JPEG, PNG, WebP, and GIF images are allowed');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showToast('error', 'Image must be 8MB or smaller');
      return;
    }

    const previousUrl = value;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = (await response.json()) as { success?: boolean; url?: string; message?: string };

      if (!response.ok || !result.success || !result.url) {
        throw new Error(result.message || 'Upload failed');
      }

      if (previousUrl?.startsWith('/api/uploads/')) {
        await deleteStoredUpload(previousUrl).catch(() => undefined);
      }

      onChange(result.url);
      showToast('success', 'Image uploaded');
    } catch (error) {
      showToast('error', error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-lg shadow-lg text-sm text-white ${
            toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'
          }`}
        >
          {toast.message}
        </div>
      )}

      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        {value ? (
          <div className="relative w-full aspect-video max-w-xs mb-3">
            <Image src={getImageUrl(value)} alt="Preview" fill className="object-cover rounded" unoptimized={value.startsWith('/api/uploads/')} />
          </div>
        ) : (
          <div className="w-full aspect-video max-w-xs bg-gray-200 rounded flex items-center justify-center mb-3 text-gray-400 text-sm">
            No image
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleUpload}
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-3">
          {uploading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 size={16} className="animate-spin" />
              Uploading...
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 text-sm text-red-800 hover:underline"
            >
              <Upload size={16} />
              {value ? 'Replace' : 'Upload'}
            </button>
          )}

          {value && !uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700"
            >
              <X size={16} />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
