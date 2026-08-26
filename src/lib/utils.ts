import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path?: string): string {
  if (!path) return '/placeholder-artwork.svg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/api/uploads/')) return path;
  if (path.startsWith('/uploads')) return '/placeholder-artwork.svg';
  if (path.startsWith('/')) return path;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  return `${backendUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAvailabilityLabel(availability: string): string {
  const labels: Record<string, string> = {
    available: 'Available',
    sold: 'Sold',
    not_available: 'Not Available',
    contact: 'Contact for Pricing',
  };
  return labels[availability] || availability;
}

export function getPurchaseModeLabel(mode: string): string {
  const labels: Record<string, string> = {
    contact_for_price: 'Contact for Pricing',
    artpal: 'View on ArtPal',
    direct_order: 'Request Order',
    sold: 'Sold',
    not_available: 'Not Available',
  };
  return labels[mode] || mode;
}
