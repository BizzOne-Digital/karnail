'use client';

import { LocalImageField } from '@/components/admin/LocalImageField';
import type { UploadFolder } from '@/lib/upload-constants';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
  className?: string;
}

const FOLDER_MAP: Record<string, UploadFolder> = {
  products: 'products',
  gallery: 'gallery',
  pages: 'pages',
  misc: 'misc',
  settings: 'misc',
  services: 'misc',
  testimonials: 'misc',
  blogs: 'misc',
};

export function ImageUpload({ folder, ...props }: ImageUploadProps) {
  const mappedFolder = FOLDER_MAP[folder] || 'misc';
  return <LocalImageField {...props} folder={mappedFolder} />;
}
