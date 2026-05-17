import type { AuthUser } from '@/lib/auth';
import { ApiError } from '@/lib/request';

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

const fakeJwt = (uid: string) =>
  `mock.${btoa(JSON.stringify({ uid, ts: Date.now() }))}.sig`;

const VALID_PHONE = '13800138000';
const VALID_CODE = '1234';
const VALID_ACCOUNT = 'admin';
const VALID_PASSWORD = 'admin123';

export type LoginResult = { token: string; user: AuthUser };

export async function loginByPhoneCode(payload: {
  phone: string;
  code: string;
}): Promise<LoginResult> {
  await delay();
  if (payload.phone !== VALID_PHONE || payload.code !== VALID_CODE) {
    throw new ApiError(1001, '手机号或验证码错误（试试 13800138000 / 1234）');
  }
  const user: AuthUser = {
    id: 'u_phone_1',
    name: '智慧学院用户',
    phone: payload.phone,
  };
  return { token: fakeJwt(user.id), user };
}

export async function loginByPassword(payload: {
  account: string;
  password: string;
}): Promise<LoginResult> {
  await delay();
  if (
    payload.account !== VALID_ACCOUNT ||
    payload.password !== VALID_PASSWORD
  ) {
    throw new ApiError(1002, '账号或密码错误（试试 admin / admin123）');
  }
  const user: AuthUser = { id: 'u_admin', name: 'admin' };
  return { token: fakeJwt(user.id), user };
}

export async function sendSmsCode(phone: string): Promise<void> {
  await delay(300);
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    throw new ApiError(1003, '手机号格式不正确');
  }
}

export async function loginByOauth(
  provider: 'wechat' | 'apple',
): Promise<LoginResult> {
  await delay(200);
  throw new ApiError(
    9000,
    provider === 'wechat' ? '微信登录敬请期待' : 'Apple 登录敬请期待',
  );
}

export async function getCurrentUser(): Promise<AuthUser> {
  await delay(200);
  return { id: 'u_admin', name: 'admin' };
}
