import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { sanitizeUploadPath } from '@/lib/stored-upload';
import { StoredUpload } from '@/models/StoredUpload';
import type { UploadFolder } from '@/lib/upload-constants';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ folder: string; filename: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { folder, filename } = await params;

  if (!sanitizeUploadPath(folder, filename)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  await connectDB();
  const doc = await StoredUpload.findOne({ folder: folder as UploadFolder, filename });

  if (!doc?.data) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return new NextResponse(new Uint8Array(doc.data), {
    status: 200,
    headers: {
      'Content-Type': doc.mimeType,
      'Content-Length': String(doc.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
