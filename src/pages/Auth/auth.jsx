import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogInForm from '@/components/auth/Temp1';
import SignUpForm from '@/components/auth/Temp2';

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
