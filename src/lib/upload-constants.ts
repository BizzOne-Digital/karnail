export const UPLOAD_FOLDERS = ['products', 'gallery', 'pages', 'misc'] as const;

export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const;

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}
