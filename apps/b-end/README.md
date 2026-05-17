# B 端 - 智慧学院（管理后台）

基于 **UmiJS Max + Ant Design Pro Components + TypeScript** 的 B 端管理后台。

## 启动

```bash
# 在 monorepo 根目录
pnpm install
pnpm dev:b

# 或者在当前目录
pnpm dev
```

默认端口 8000，会自动打开浏览器。

## 目录结构

```
b-end/
├── mock/               # mock 接口
├── src/
│   ├── pages/          # 页面（Welcome / Courses / Users）
│   ├── services/       # 后端接口封装
│   └── app.tsx         # 运行时配置（请求拦截、initialState、layout）
├── .umirc.ts           # Umi 配置（路由、代理等）
├── tsconfig.json
└── package.json
```

## 内置功能

- Ant Design 5 + ProComponents（PageContainer / ProTable）
- 请求库（axios 封装），统一 token 注入
- mock 接口、`/api` 代理转发
- 路由级 access、initialState、layout
