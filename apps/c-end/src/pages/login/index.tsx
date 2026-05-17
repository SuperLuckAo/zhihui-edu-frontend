import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Apple } from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/lib/request';

import { PhoneCodeForm } from './PhoneCodeForm';
import { PasswordForm } from './PasswordForm';

function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8.69 4C4.99 4 2 6.46 2 9.49c0 1.74 1 3.28 2.55 4.29l-.64 1.93 2.25-1.13c.8.16 1.62.24 2.46.24h.27a5.62 5.62 0 0 1-.2-1.46c0-3.2 3.06-5.78 6.81-5.78.25 0 .5.02.74.05C15.62 5.43 12.5 4 8.69 4Zm-2.5 2.5a.85.85 0 0 1 .85.86.85.85 0 1 1-1.7 0c0-.48.38-.86.85-.86Zm5 0a.85.85 0 0 1 .85.86.85.85 0 1 1-1.7 0c0-.48.38-.86.85-.86Z" />
      <path d="M22 14.6c0-2.55-2.55-4.62-5.69-4.62-3.21 0-5.78 2.07-5.78 4.62 0 2.56 2.57 4.63 5.78 4.63.67 0 1.31-.08 1.92-.21l1.86.93-.5-1.55c1.43-.86 2.41-2.16 2.41-3.8Zm-7.55-1.1a.7.7 0 0 1-.7.71.7.7 0 1 1 0-1.4c.39 0 .7.3.7.7Zm4.3 0a.7.7 0 0 1-.7.71.7.7 0 1 1 0-1.4c.39 0 .7.3.7.7Z" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { loginByOauth } = useAuth();

  const handleSuccess = useCallback(() => {
    const from = params.get('from');
    navigate(from ? decodeURIComponent(from) : '/', { replace: true });
  }, [navigate, params]);

  const handleOauth = async (provider: 'wechat' | 'apple') => {
    try {
      await loginByOauth(provider);
      toast.success('登录成功');
      handleSuccess();
    } catch (err) {
      toast.info(err instanceof ApiError ? err.message : '暂未开放');
    }
  };

  return (
    <div className="bg-muted/30 flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">智慧学院</CardTitle>
          <CardDescription>登录后开启你的学习之旅</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <Tabs defaultValue="sms" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sms">验证码登录</TabsTrigger>
              <TabsTrigger value="password">密码登录</TabsTrigger>
            </TabsList>
            <TabsContent value="sms" className="pt-4">
              <PhoneCodeForm onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="password" className="pt-4">
              <PasswordForm onSuccess={handleSuccess} />
            </TabsContent>
          </Tabs>

          <div className="relative">
            <Separator />
            <span className="bg-card text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
              第三方登录
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOauth('wechat')}
            >
              <WeChatIcon className="size-4 text-[#07c160]" />
              微信
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOauth('apple')}
            >
              <Apple className="size-4" />
              Apple
            </Button>
          </div>

          <p className="text-muted-foreground text-center text-xs">
            登录即代表同意《用户协议》与《隐私政策》
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
