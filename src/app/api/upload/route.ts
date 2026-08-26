import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/admin-auth';
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  MIME_TO_EXT,
  isUploadFolder,
} from '@/lib/upload-constants';
import { buildStoredUploadUrl, deleteStoredUploadByUrl } from '@/lib/stored-upload';
import { StoredUpload } from '@/models/StoredUpload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    await requireAdmin(request);

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') || '');

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'File is required' }, { status: 400 });
    }

    if (!isUploadFolder(folder)) {
      return NextResponse.json({ success: false, message: 'Invalid folder' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      return NextResponse.json({ success: false, message: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ success: false, message: 'File exceeds 8MB limit' }, { status: 400 });
    }

    const ext = MIME_TO_EXT[file.type];
    if (!ext) {
      return NextResponse.json({ success: false, message: 'Unsupported file extension' }, { status: 400 });
    }

    const filename = `${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await connectDB();
    await StoredUpload.create({
      folder,
      filename,
      mimeType: file.type,
      size: buffer.length,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      url: buildStoredUploadUrl(folder, filename),
      filename,
      size: buffer.length,
      folder,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    const status = message === 'Authentication required' || message.includes('Invalid') ? 401 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin(request);

    const body = (await request.json()) as { url?: string };
    if (!body.url) {
      return NextResponse.json({ success: false, message: 'URL is required' }, { status: 400 });
    }

    const deleted = await deleteStoredUploadByUrl(body.url);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delete failed';
    const status = message === 'Authentication required' ? 401 : 500;
    return NextResponse.json({ success: false, message }, { status });
  }
}
