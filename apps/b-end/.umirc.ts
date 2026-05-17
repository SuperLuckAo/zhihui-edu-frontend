import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '智慧学院后台',
  },
  routes: [
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      name: '欢迎',
      path: '/welcome',
      component: './Welcome',
    },
    {
      name: '课程管理',
      path: '/courses',
      component: './Courses',
    },
    {
      name: '用户管理',
      path: '/users',
      component: './Users',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
