import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useLogIn from '../../hooks/useLogIn';
import GoogleAuth from './googleauth';

export default function LoginForm() {
  const { loading, error, logIn } = useLogIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    logIn(data.email, data.password);
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1">
          <GoogleAuth />
        </div>
        <Separator />
        <Form>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField>
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    {...register('email', {
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '올바르지 않은 이메일입니다.',
                      },
                    })}
                  />
                </FormControl>
                {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
              </FormItem>
            </FormField>
            <FormField>
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                      minLength: {
                        value: 8,
                        message: '8자 이상 입력해주세요.',
                      },
                      maxLength: {
                        value: 50,
                        message: '50자를 초과할 수 없습니다.',
                      },
                    })}
                  />
                </FormControl>
                {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
              </FormItem>
            </FormField>
            <Button type="submit" disabled={loading}>
              로그인
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
