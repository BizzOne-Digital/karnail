function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '/api';
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (siteUrl) {
    return `${siteUrl}/api`;
  }

  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${getApiBaseUrl()}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    cache: fetchOptions.cache || 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) =>
    apiFetch<{ success: boolean; data: T }>(endpoint, { params }).then((r) => r.data),

  getPaginated: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) =>
    apiFetch<{ success: boolean; data: T[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>(
      endpoint,
      { params }
    ),

  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<{ success: boolean; data: T }>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((r) => r.data),

  put: <T>(endpoint: string, body: unknown) =>
    apiFetch<{ success: boolean; data: T }>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }).then((r) => r.data),

  delete: <T>(endpoint: string) =>
    apiFetch<{ success: boolean; data: T }>(endpoint, { method: 'DELETE' }).then((r) => r.data),

  upload: async (folder: string, file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return new Promise<{ url: string; filename: string }>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');
      xhr.withCredentials = true;

      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          resolve({ url: data.url, filename: data.filename });
        } else {
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.send(formData);
    });
  },
};
