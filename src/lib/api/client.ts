// Thin fetch wrapper for the Node/Express backend documented in BACKEND.md.
// Base URL is configured via VITE_API_BASE_URL; when unset we fall back to
// simulated responses so the frontend stays fully usable in dev.

export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const HAS_BACKEND = API_BASE.length > 0;

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (!HAS_BACKEND) {
    throw new ApiError(0, "Backend not configured (VITE_API_BASE_URL missing).", null);
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, (body as { message?: string })?.message ?? res.statusText, body);
  return body as T;
}
