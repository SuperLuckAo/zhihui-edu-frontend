import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CoursesPage() {
  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-bold">课程列表</h1>
        <p className="text-muted-foreground text-sm">
          课程接口尚未接入，先做 UI 占位。
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>敬请期待</CardTitle>
          <CardDescription>
            课程列表与详情会在下个迭代接入真实数据。
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          目前 C 端已完成基础设施：shadcn/ui + 登录鉴权 + 路由守卫。
        </CardContent>
      </Card>
    </div>
  );
}
