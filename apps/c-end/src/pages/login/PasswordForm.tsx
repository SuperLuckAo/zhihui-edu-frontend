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
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/lib/request';

const schema = z.object({
  account: z.string().min(2, '账号至少 2 个字符'),
  password: z.string().min(6, '密码至少 6 位'),
});

type FormValues = z.infer<typeof schema>;

export function PasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const { loginByPassword } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { account: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await loginByPassword(values);
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
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>账号</FormLabel>
              <FormControl>
                <Input
                  placeholder="账号 / 手机号 / 邮箱"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
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
