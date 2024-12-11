import { useForm } from 'react-hook-form';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './googleauth';

export default function SignupForm() {
  const { loading, error, signUp } = useSignUpWithEmailAndPassword();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <
  FormValues >
  {
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  };

  const onSubmit = data => {
    if (data.password !== data.passwordConfirm) {
      return toast({
        title: '비밀번호 오류',
        description: '비밀번호가 일치하지 않습니다.',
        status: 'error',
      });
    }

    signUp(data.email, data.password)
      .then(() => {
        toast({
          title: '회원가입 성공',
          description: '회원가입이 완료되었습니다.',
          status: 'success',
        });
        navigate('/');
      })
      .catch(err => {
        toast({
          title: '회원가입 실패',
          description: err.message,
          status: 'error',
        });
      });
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>계정 만들기</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1">
          <GoogleAuth />
        </div>
        <Separator />
        <Form>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField>
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
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
            <FormField>
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...register('passwordConfirm', {
                      required: '비밀번호 확인을 입력해주세요.',
                    })}
                  />
                </FormControl>
                {errors.passwordConfirm && <FormMessage>{errors.passwordConfirm.message}</FormMessage>}
              </FormItem>
            </FormField>
            <Button type="submit" disabled={loading} className="w-full my-2">
              가입하기
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
