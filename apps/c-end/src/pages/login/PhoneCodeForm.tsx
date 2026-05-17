import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sendSmsCode } from '@/api/auth';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/lib/request';

const schema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入正确的手机号'),
  code: z.string().regex(/^\d{4,6}$/, '验证码应为 4-6 位数字'),
});

type FormValues = z.infer<typeof schema>;

const COUNTDOWN_SECONDS = 60;

export function PhoneCodeForm({ onSuccess }: { onSuccess: () => void }) {
  const { loginByPhoneCode } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phone: '', code: '' },
  });

  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );

  const startCountdown = () => {
    setCountdown(COUNTDOWN_SECONDS);
    timerRef.current = window.setInterval(() => {
      setCountdown((s) => {
        if (s <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    const valid = await form.trigger('phone');
    if (!valid) return;
    const phone = form.getValues('phone');
    setSending(true);
    try {
      await sendSmsCode(phone);
      toast.success('验证码已发送（Mock：1234）');
      startCountdown();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : '发送失败');
    } finally {
      setSending(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await loginByPhoneCode(values);
      toast.success('登录成功');
      onSuccess();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : '登录失败');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>手机号</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入手机号"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={11}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>验证码</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="请输入验证码"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  className="w-32 shrink-0"
                  disabled={sending || countdown > 0}
                  onClick={handleSendCode}
                >
                  {sending ? (
                    <Loader2 className="animate-spin" />
                  ) : countdown > 0 ? (
                    `${countdown}s 后重发`
                  ) : (
                    '获取验证码'
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin" />
          )}
          登录
        </Button>
      </form>
    </Form>
  );
}
