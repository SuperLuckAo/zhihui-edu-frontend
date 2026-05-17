# 智慧学院 C 端开发指南

本指南覆盖 `apps/c-end` 的日常开发流程：新增页面、使用/添加 UI 组件、声明路由、调用接口（含 Mock）、做表单、处理鉴权与样式。读完即可独立开发一个完整页面。

> 阅读前建议先翻一遍 `src/pages/login/`——它已经覆盖了表单、接口、Mock、鉴权、路由跳转全部要素，是最完整的样板。

---

## 1. 项目概览

### 技术栈

| 关注点 | 选型 |
|---|---|
| 构建 | Vite 5 |
| 框架 | React 18 + TypeScript |
| 路由 | react-router-dom v6 |
| UI | **shadcn/ui (new-york style)** + **Tailwind v4** |
| 表单 | react-hook-form + zod (v3) + @hookform/resolvers |
| 图标 | lucide-react |
| Toast | sonner |
| 鉴权 | React Context + localStorage(JWT) |
| 状态 | React Context（足够时不引入额外库） |

### 目录结构

```
apps/c-end/
├── .env                       # VITE_USE_MOCK / VITE_API_BASE
├── components.json            # shadcn 配置
├── index.html
├── vite.config.ts
├── tsconfig.app.json          # 含 @/* → src/* 路径别名
└── src/
    ├── main.tsx               # 挂载 AuthProvider + Toaster
    ├── App.tsx                # 路由总入口
    ├── index.css              # Tailwind v4 + shadcn CSS 变量
    ├── api/
    │   ├── auth.ts            # 业务接口（按 USE_MOCK 切真假）
    │   └── _mock/
    │       └── auth.ts        # 对应的 Mock 实现
    ├── components/
    │   ├── ui/                # ✨ shadcn 组件源码（落盘，不是 npm 包）
    │   ├── auth/RequireAuth.tsx
    │   └── layout/AppLayout.tsx
    ├── contexts/
    │   └── AuthContext.tsx    # useAuth()
    ├── lib/
    │   ├── auth.ts            # token 读写
    │   ├── request.ts         # fetch 封装（自动加 Bearer、401 重定向）
    │   └── utils.ts           # cn() 函数
    └── pages/
        ├── home/index.tsx
        ├── courses/index.tsx
        └── login/
            ├── index.tsx
            ├── PhoneCodeForm.tsx
            └── PasswordForm.tsx
```

### 环境与脚本

在仓库根目录运行：

```bash
pnpm dev:c        # 启动 C 端 dev server，默认 http://localhost:5173
pnpm build:c      # 类型检查 + 生产构建
```

在 `apps/c-end` 目录运行：

```bash
pnpm dev
pnpm build
pnpm exec tsc -b --noEmit    # 仅类型检查（提交前推荐）
```

`.env` 关键变量：

```ini
VITE_USE_MOCK=true    # true 走 src/api/_mock/*；false 走真实接口
VITE_API_BASE=/api    # 真实接口前缀
```

---

## 2. 新增一个页面：从零到能访问

以新建"我的学习"页 `/my-learning` 为例，4 步：

### Step 1 — 创建页面文件

约定每个页面是 `src/pages/<name>/index.tsx`，default export 一个组件。

```tsx
// src/pages/my-learning/index.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyLearningPage() {
  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">我的学习</h1>
        <p className="text-muted-foreground text-sm">最近的学习记录与进度</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>暂无数据</CardTitle>
          <CardDescription>开始学习一门课程后会显示在这里</CardDescription>
        </CardHeader>
        <CardContent>...</CardContent>
      </Card>
    </div>
  );
}
```

### Step 2 — 在 `App.tsx` 注册路由

`src/App.tsx` 已经分好两个区域：公开路由（`/login`）和**受保护路由**（外层包了 `RequireAuth + AppLayout`，未登录会自动跳走）。99% 的业务页面放在受保护区：

```tsx
import MyLearningPage from '@/pages/my-learning';

<Route element={<RequireAuth><AppLayout /></RequireAuth>}>
  <Route path="/" element={<HomePage />} />
  <Route path="/courses" element={<CoursesPage />} />
  <Route path="/my-learning" element={<MyLearningPage />} />  {/* ← 新增 */}
</Route>
```

需要带参数的页面：

```tsx
<Route path="/courses/:courseId" element={<CourseDetailPage />} />
```

在页面里：

```tsx
import { useParams } from 'react-router-dom';
const { courseId } = useParams<{ courseId: string }>();
```

### Step 3 — 加入顶栏导航（可选）

如果需要进入主导航，编辑 `src/components/layout/AppLayout.tsx` 顶部的 `NAV_ITEMS`：

```ts
const NAV_ITEMS = [
  { to: '/', label: '首页', end: true },
  { to: '/courses', label: '课程' },
  { to: '/my-learning', label: '我的学习' },  // ← 新增
];
```

### Step 4 — 验证

```bash
pnpm dev:c
# 浏览器访问 http://localhost:5173/my-learning
# 未登录会被踢回 /login？from=/my-learning
```

---

## 3. UI 组件：复用与新增

### 3.1 使用已有组件

所有 shadcn 组件的源码都在 `src/components/ui/`，直接 import 即可。当前可用：

| 组件 | 路径 | 用途 |
|---|---|---|
| `Button` | `@/components/ui/button` | 按钮，含 default / outline / ghost / link / destructive 变体 |
| `Input` | `@/components/ui/input` | 文本输入框 |
| `Label` | `@/components/ui/label` | 表单标签 |
| `Card` 系列 | `@/components/ui/card` | 卡片容器 |
| `Form` 系列 | `@/components/ui/form` | react-hook-form 适配器 |
| `Tabs` 系列 | `@/components/ui/tabs` | 标签页 |
| `Separator` | `@/components/ui/separator` | 分隔线 |
| `Toaster` / `toast` | `@/components/ui/sonner` + `sonner` | Toast 提示 |

最小示例：

```tsx
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

<Button variant="outline" onClick={() => toast.success('已保存')}>
  <Loader2 className="animate-spin" />
  点我
</Button>
```

### 3.2 添加一个 shadcn 没有的组件（例：`dialog`）

> ⚠️ **不要跑 `pnpm dlx shadcn@latest add ...`**——当前 Node 环境下会因 zod 子路径问题崩溃。改为手动落盘。

1. 打开 [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog) → 切到 "New York" 样式 → 复制 `Code` 区源码。
2. 创建 `src/components/ui/dialog.tsx`，粘贴源码。
3. 看顶部 import，把缺的 Radix 包补装上：

   ```bash
   pnpm --filter c-end add @radix-ui/react-dialog
   ```

4. 直接 import 使用：

   ```tsx
   import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
   ```

源码里若有 `from "@/lib/utils"`、`from "@/components/ui/button"` 等路径，本项目已经配好，无需改动。

### 3.3 新建业务组件

业务组件（非通用 UI）放 `src/components/<domain>/<Name>.tsx`，例如：

```
src/components/course/CourseCard.tsx
src/components/course/CourseFilterBar.tsx
```

页面专属、不会跨页复用的小组件，可以直接放在该页面目录下：

```
src/pages/courses/components/CourseHero.tsx
```

### 3.4 样式约定

- **优先用 Tailwind 工具类**，不写新的 CSS 文件。
- 颜色、圆角、间距用主题变量类：`bg-background` / `text-foreground` / `bg-card` / `text-muted-foreground` / `border-border` / `bg-primary` / `text-primary-foreground` / `rounded-md` 等。变量定义在 `src/index.css` 的 `:root` 与 `.dark`。
- 需要条件类名时用 `cn()`：

  ```tsx
  import { cn } from '@/lib/utils';
  <div className={cn('rounded-md p-4', isActive && 'bg-accent')} />
  ```

- 暗色模式：CSS 变量已经准备好两套，但页面里**不要写**任何 `dark:` 工具类的硬编码颜色，统一用变量类，未来加上 `<html class="dark">` 切换器就能整体生效。

---

## 4. 路由

### 4.1 受保护 vs 公开

- **公开页面**（登录/注册/找回密码/落地页/分享页）：放在 `App.tsx` 中 `<RequireAuth>` 之外。
- **业务页面**：放进 `<RequireAuth><AppLayout /></RequireAuth>` 包裹的 `<Route>` 子节点，自动获得：未登录跳转、顶栏 + 内容居中布局。

### 4.2 编程式跳转

```tsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/courses');                 // 普通跳转
navigate('/courses', { replace: true }); // 替换历史
navigate(-1);                          // 后退
```

### 4.3 URL 参数

- 路径参数：`useParams<{ id: string }>()`
- 查询参数：`const [params] = useSearchParams(); params.get('q')`

### 4.4 跳转后回跳（登录后回原页）

`RequireAuth` 会把目标页拼成 `?from=...` 传给 `/login`，登录成功后 `LoginPage` 用：

```ts
const from = params.get('from');
navigate(from ? decodeURIComponent(from) : '/', { replace: true });
```

任何需要"先登录再回来"的场景照搬即可。

---

## 5. 接口与 Mock

### 5.1 整体模式

每个业务领域对应一对文件：

```
src/api/<domain>.ts          # 对外暴露的接口函数，按 VITE_USE_MOCK 切真假
src/api/_mock/<domain>.ts    # Mock 实现，仅在 USE_MOCK=true 时被调用
```

`src/api/auth.ts` 是参考模板。

### 5.2 新增一个领域：以"课程"为例

#### Step A — 写 Mock 实现

```ts
// src/api/_mock/course.ts
import { ApiError } from '@/lib/request';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export type Course = {
  id: string;
  title: string;
  cover: string;
  teacher: string;
};

const COURSES: Course[] = [
  { id: 'c1', title: 'React 入门', cover: '/cover1.jpg', teacher: '张老师' },
  { id: 'c2', title: 'TypeScript 进阶', cover: '/cover2.jpg', teacher: '李老师' },
];

export async function listCourses(): Promise<Course[]> {
  await delay();
  return COURSES;
}

export async function getCourse(id: string): Promise<Course> {
  await delay();
  const c = COURSES.find((x) => x.id === id);
  if (!c) throw new ApiError(404, '课程不存在');
  return c;
}
```

#### Step B — 写真假切换的接口入口

```ts
// src/api/course.ts
import { request } from '@/lib/request';
import * as mock from './_mock/course';
import type { Course } from './_mock/course';

export type { Course };

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const listCourses = USE_MOCK
  ? mock.listCourses
  : () => request<Course[]>('/courses');

export const getCourse = USE_MOCK
  ? mock.getCourse
  : (id: string) => request<Course>(`/courses/${id}`);
```

#### Step C — 在页面里使用

```tsx
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { listCourses, type Course } from '@/api/course';
import { ApiError } from '@/lib/request';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch((e) => toast.error(e instanceof ApiError ? e.message : '加载失败'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>加载中...</div>;
  return /* 渲染 courses */;
}
```

### 5.3 `request` 封装的约定

`src/lib/request.ts` 默认行为：

- 自动加 `Content-Type: application/json`
- 有 token 自动加 `Authorization: Bearer <token>`
- 后端响应**必须**形如 `{ code: number, message: string, data: T }`，`code !== 0` 抛 `ApiError`
- 收到 HTTP 401：清 token，重定向到 `/login?from=<当前路径>`

**如果后端格式不一样**，改 `src/lib/request.ts`，所有 api 自动跟随。**不要**在每个 api 函数里重复处理。

### 5.4 切回真实接口

后端就绪后：

1. `.env` 改 `VITE_USE_MOCK=false`
2. 确认 `VITE_API_BASE` 指向正确（开发期可在 `vite.config.ts` 加 `server.proxy` 代理到后端）
3. 重启 `pnpm dev:c`

**所有 api 函数代码零改动**——这就是真假分离的价值。

### 5.5 何时引入更重的请求库

目前 `request` 是 fetch 薄封装，没做缓存、去重、自动重试。如果一个页面要：

- 多接口共用一份缓存
- 后台轮询
- 乐观更新
- SWR 风格的 stale-while-revalidate

再考虑引入 `@tanstack/react-query`，单独立任务讨论。

---

## 6. 表单（react-hook-form + zod + shadcn）

完整样板参考 `src/pages/login/PasswordForm.tsx`，套路如下：

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';

// 1. 用 zod 写 schema（注意：必须 zod v3，不要 v4）
const schema = z.object({
  name: z.string().min(2, '至少 2 个字符'),
  age: z.coerce.number().min(1, '请输入年龄'),
});
type FormValues = z.infer<typeof schema>;

// 2. 在组件里 useForm
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { name: '', age: 0 },
});

// 3. 渲染
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>姓名</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit" disabled={form.formState.isSubmitting}>提交</Button>
  </form>
</Form>
```

要点：

- 提交时 `try/catch`，错误用 `toast.error()`；不要让异常冒泡到 React 树。
- 数字、布尔字段在 schema 里用 `z.coerce.number()` / `z.coerce.boolean()`，避免 input value 都是 string 带来的类型不一致。
- 提交按钮在 `isSubmitting` 期间 disable 并显示 `<Loader2 className="animate-spin" />`。

---

## 7. 鉴权

### 7.1 在组件里读当前用户

```tsx
import { useAuth } from '@/contexts/AuthContext';

const { user, isAuthenticated, logout } = useAuth();
```

`user` 类型见 `src/lib/auth.ts` 的 `AuthUser`，需要扩字段时直接改这个类型。

### 7.2 调用登录

```tsx
const { loginByPassword } = useAuth();
await loginByPassword({ account, password });
// 成功后 token 已写入 localStorage 并更新 Context，直接 navigate 即可
```

### 7.3 退出

```tsx
const { logout } = useAuth();
logout();
navigate('/login', { replace: true });
```

### 7.4 给某个区块加额外权限校验

`RequireAuth` 只判"是否登录"。如果未来要按角色，扩展它（建议加 `roles?: string[]` prop）或新加 `RequireRole`，**不要**在每个页面里写权限分支。

---

## 8. Toast / 反馈

```ts
import { toast } from 'sonner';

toast.success('保存成功');
toast.error('提交失败，请重试');
toast.info('敬请期待');
toast.warning('网络较慢');
toast.loading('上传中…');
```

`<Toaster />` 已经在 `main.tsx` 全局挂了 `richColors position="top-center"`，页面里只 import `toast` 用即可。

---

## 9. 类型检查 & 构建

提交前必跑：

```bash
pnpm exec tsc -b --noEmit   # 类型检查（应该 0 错）
pnpm build:c                # 生产构建（同时也跑 tsc）
```

常见报错与处理：

| 报错 | 多半原因 |
|---|---|
| `Cannot find module '@/...'` | 文件路径打错；alias 在 `tsconfig.app.json` + `vite.config.ts` 里已配 |
| `xxx is declared but its value is never read` | `noUnusedLocals` 开了，删掉未使用的 import |
| `zodResolver` 类型不匹配 | 检查 zod 版本是不是 3.x；不要装 zod 4 |
| `from 'lucide-react'` 报 undefined | 版本被解析到了废弃的 1.x，重新 `pnpm add lucide-react@^0.460.0` |

---

## 10. 依赖版本陷阱（务必读）

这三条目前不能违反，否则编译/运行会立刻坏：

1. **`zod` 必须 ^3.25**，不要升 v4。`@hookform/resolvers@5.2.x` 与 zod v4.4 的内部类型还没对齐。
2. **`lucide-react` 必须 ^0.460**。直接 `pnpm add lucide-react` 默认解析到一个早年抢注的废弃 v1.16.0 包，会出现导入符号不存在的运行时错误。
3. **不要跑 `pnpm dlx shadcn@latest ...`**。当前 Node 环境下 shadcn CLI 会因上游 `@modelcontextprotocol/sdk` 的 `zod/v3` 子路径解析失败崩溃。新增 shadcn 组件请按 §3.2 的手抄流程。

升级这些依赖前先单独验证 `pnpm exec tsc -b --noEmit` 通过再合入。

---

## 11. 新页面开发 Checklist

每次新建页面照着过一遍：

- [ ] `src/pages/<name>/index.tsx` 创建，default export
- [ ] `App.tsx` 加 `<Route>`，确认放在 `<RequireAuth>` 内部还是外部
- [ ] 需要顶栏导航？改 `AppLayout` 的 `NAV_ITEMS`
- [ ] 需要后端数据？建 `src/api/<domain>.ts` + `src/api/_mock/<domain>.ts`，先用 Mock 跑通
- [ ] 表单走 §6 套路：zod schema + react-hook-form + shadcn Form
- [ ] 错误反馈用 `toast.error`，loading 状态显式渲染
- [ ] 样式只用 Tailwind 工具类 + 主题变量类（不写新 CSS 文件）
- [ ] 缺组件先在 `src/components/ui/` 找，没有按 §3.2 手抄
- [ ] 提交前跑 `pnpm exec tsc -b --noEmit` 与 `pnpm build:c`

---

如有疑问，先看 `src/pages/login/` 整套实现，它是当前项目最完整的端到端示例。
