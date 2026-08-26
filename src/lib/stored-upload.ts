import { connectDB } from '@/lib/mongodb';
import { StoredUpload } from '@/models/StoredUpload';
import { isUploadFolder, type UploadFolder } from '@/lib/upload-constants';

export function parseStoredUploadUrl(url: string): { folder: string; filename: string } | null {
  if (!url.startsWith('/api/uploads/')) return null;

  const rest = url.slice('/api/uploads/'.length);
  const slash = rest.indexOf('/');
  if (slash <= 0) return null;

  const folder = rest.slice(0, slash);
  const filename = rest.slice(slash + 1);

  if (!isUploadFolder(folder)) return null;
  if (!filename || filename.includes('..') || filename.includes('/')) return null;

  return { folder, filename };
}

export function sanitizeUploadPath(folder: string, filename: string): boolean {
  if (!isUploadFolder(folder)) return false;
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) return false;
  return true;
}

export async function deleteStoredUploadByUrl(url?: string): Promise<boolean> {
  const parsed = url ? parseStoredUploadUrl(url) : null;
  if (!parsed) return false;

  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder as UploadFolder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}

export function buildStoredUploadUrl(folder: string, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}
