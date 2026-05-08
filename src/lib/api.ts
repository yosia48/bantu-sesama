/**
 * API Configuration
 *
 * Untuk menghubungkan frontend ke backend Cloudflare Worker:
 *
 * 1. Deploy Worker: `cd worker && npx wrangler deploy`
 * 2. Dapatkan URL Worker: `bantu-sesama-api.<username>.workers.dev`
 * 3. Set environment variable NEXT_PUBLIC_API_URL di Cloudflare Pages:
 *    - Buka Dashboard → Pages → bantu-sesama → Settings → Environment variables
 *    - Tambahkan: NEXT_PUBLIC_API_URL = https://bantu-sesama-api.<username>.workers.dev
 *
 * Selama belum ada backend, frontend akan menggunakan mock data.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function getApiUrl(): string {
  return API_URL;
}

export function isApiConfigured(): boolean {
  return API_URL.length > 0;
}

export async function fetchFromApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (!isApiConfigured()) {
    throw new Error(
      "API belum dikonfigurasi. Set NEXT_PUBLIC_API_URL di environment variables."
    );
  }

  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
