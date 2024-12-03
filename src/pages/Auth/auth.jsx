import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/loginform';
import SignupForm from '@/components/auth/signupform';

export default function Auth() {
  return (
    <section className="flex justify-center items-center p-2 md:p-3 lg:p-4 min-h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsContent value="login">
          <LogInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
        <TabsList className="w-[400px] flex">
          <TabsTrigger value="login">로그인</TabsTrigger>
          <TabsTrigger value="signup">계정 만들기</TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  );
}
