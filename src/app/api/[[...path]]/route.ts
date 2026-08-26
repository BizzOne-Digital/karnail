import type { NextRequest } from 'next/server';
import { getExpressApp } from '@/server/app';
import { runExpressApp } from '@/lib/express-adapter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ path?: string[] }> };

async function handler(request: NextRequest, context: RouteContext) {
  const { path = [] } = await context.params;
  const app = getExpressApp();
  return runExpressApp(app, request, path);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
