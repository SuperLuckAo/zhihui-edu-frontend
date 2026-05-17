# 智慧学院 - 前端 Monorepo

智慧学院（zhihui-edu）前端工程，使用 **pnpm workspace** 管理 C 端与 B 端两个独立应用。

## 目录结构

```
zhihui-edu/
├── apps/
│   ├── c-end/          # C 端用户站点 (Vite + React 18 + TS)
│   └── b-end/          # B 端管理后台 (UmiJS Max + Ant Design Pro)
├── package.json
├── pnpm-workspace.yaml
├── .npmrc
└── .gitignore
```

## 环境要求

- Node.js >= 18
- pnpm >= 8（推荐 9）

```bash
# 全局安装 pnpm（如未安装）
npm i -g pnpm
```

## 安装依赖

在根目录执行一次即可，会同时安装 C 端、B 端的依赖：

```bash
pnpm install
```

## 常用脚本

| 命令              | 说明                       |
| ----------------- | -------------------------- |
| `pnpm dev:c`      | 启动 C 端开发服务（5173） |
| `pnpm dev:b`      | 启动 B 端开发服务（8000） |
| `pnpm build:c`    | 构建 C 端                  |
| `pnpm build:b`    | 构建 B 端                  |
| `pnpm build`      | 同时构建 C/B 端            |

也可以进入子工程单独操作：

```bash
cd apps/c-end && pnpm dev
cd apps/b-end && pnpm dev
```

## 后续扩展

- 在 `packages/` 下可放置 C/B 共用的工具库、UI 组件、类型定义等；
- `pnpm-workspace.yaml` 已预留 `packages/*` 配置。
