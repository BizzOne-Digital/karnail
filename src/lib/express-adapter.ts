import type { Express } from 'express';
import { EventEmitter } from 'events';
import { createRequest, createResponse, type RequestMethod } from 'node-mocks-http';
import type { NextRequest } from 'next/server';

export async function runExpressApp(
  app: Express,
  request: NextRequest,
  pathSegments: string[] = []
): Promise<Response> {
  const url = new URL(request.url);
  const pathname = `/api/${pathSegments.join('/')}`;
  const targetUrl = (pathname === '/api/' ? '/api' : pathname) + url.search;

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let body: string | Record<string, unknown> | Buffer | undefined;
  if (!['GET', 'HEAD'].includes(request.method)) {
    const contentType = headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        body = undefined;
      }
    } else {
      const buffer = Buffer.from(await request.arrayBuffer());
      body = buffer.length > 0 ? buffer : undefined;
    }
  }

  const req = createRequest({
    method: request.method as RequestMethod,
    url: targetUrl,
    headers,
    // node-mocks-http body typing is narrow; runtime accepts JSON objects and buffers.
    body: body as never,
  });

  const res = createResponse({ eventEmitter: EventEmitter });

  return new Promise<Response>((resolve, reject) => {
    res.on('finish', () => {
      const responseHeaders = new Headers();
      const rawHeaders = res.getHeaders();

      for (const [key, value] of Object.entries(rawHeaders)) {
        if (value === undefined) continue;
        if (Array.isArray(value)) {
          value.forEach((entry) => responseHeaders.append(key, String(entry)));
        } else {
          responseHeaders.set(key, String(value));
        }
      }

      const payload = res._getBuffer?.() ?? Buffer.from(res._getData?.() ?? '');
      const bodyInit = payload.byteLength > 0 ? new Uint8Array(payload) : null;

      resolve(
        new Response(bodyInit, {
          status: res.statusCode,
          headers: responseHeaders,
        })
      );
    });

    res.on('error', reject);
    app(req, res);
  });
}
