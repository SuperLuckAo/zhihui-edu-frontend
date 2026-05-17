import type { RequestConfig } from '@umijs/max';

export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {
    errorHandler(error: any) {
      console.error('[request error]', error);
    },
  },
  requestInterceptors: [
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      }
      return config;
    },
  ],
};

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '智慧学院管理员' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
