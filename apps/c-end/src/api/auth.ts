import type { AuthUser } from '@/lib/auth';
import { request } from '@/lib/request';
import * as mock from './_mock/auth';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export type LoginResult = { token: string; user: AuthUser };

export const loginByPhoneCode = USE_MOCK
  ? mock.loginByPhoneCode
  : (payload: { phone: string; code: string }) =>
      request<LoginResult>('/auth/login/sms', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

export const loginByPassword = USE_MOCK
  ? mock.loginByPassword
  : (payload: { account: string; password: string }) =>
      request<LoginResult>('/auth/login/password', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

export const sendSmsCode = USE_MOCK
  ? mock.sendSmsCode
  : (phone: string) =>
      request<void>('/auth/sms/send', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });

export const loginByOauth = USE_MOCK
  ? mock.loginByOauth
  : (provider: 'wechat' | 'apple') =>
      request<LoginResult>(`/auth/login/oauth/${provider}`, { method: 'POST' });

export const getCurrentUser = USE_MOCK
  ? mock.getCurrentUser
  : () => request<AuthUser>('/auth/me');
