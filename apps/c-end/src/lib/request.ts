import { clearAuth, getToken } from './auth';

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 401) {
    clearAuth();
    if (location.pathname !== '/login') {
      const from = encodeURIComponent(location.pathname + location.search);
      location.replace(`/login?from=${from}`);
    }
    throw new ApiError(401, '登录已过期，请重新登录');
  }

  const json = (await res.json()) as ApiResponse<T>;
  if (json.code !== 0) {
    throw new ApiError(json.code, json.message || '请求失败');
  }
  return json.data;
}
