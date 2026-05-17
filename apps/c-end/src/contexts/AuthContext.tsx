import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearAuth,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
  type AuthUser,
} from '@/lib/auth';
import {
  loginByOauth as apiLoginByOauth,
  loginByPassword as apiLoginByPassword,
  loginByPhoneCode as apiLoginByPhoneCode,
} from '@/api/auth';

type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  loginByPassword: (payload: {
    account: string;
    password: string;
  }) => Promise<void>;
  loginByPhoneCode: (payload: { phone: string; code: string }) => Promise<void>;
  loginByOauth: (provider: 'wechat' | 'apple') => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => ({
    token: getToken(),
    user: getStoredUser(),
  }));

  const applyLogin = useCallback(
    (result: { token: string; user: AuthUser }) => {
      setToken(result.token);
      setStoredUser(result.user);
      setState({ token: result.token, user: result.user });
    },
    [],
  );

  const loginByPassword = useCallback(
    async (payload: { account: string; password: string }) => {
      const res = await apiLoginByPassword(payload);
      applyLogin(res);
    },
    [applyLogin],
  );

  const loginByPhoneCode = useCallback(
    async (payload: { phone: string; code: string }) => {
      const res = await apiLoginByPhoneCode(payload);
      applyLogin(res);
    },
    [applyLogin],
  );

  const loginByOauth = useCallback(
    async (provider: 'wechat' | 'apple') => {
      const res = await apiLoginByOauth(provider);
      applyLogin(res);
    },
    [applyLogin],
  );

  const logout = useCallback(() => {
    clearAuth();
    setState({ token: null, user: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.token,
      loginByPassword,
      loginByPhoneCode,
      loginByOauth,
      logout,
    }),
    [state, loginByPassword, loginByPhoneCode, loginByOauth, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
