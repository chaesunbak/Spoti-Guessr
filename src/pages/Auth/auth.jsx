import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogInForm from '../../components/Auth/loginform';
import SignUpForm from '../../components/Auth/signupform';

export default function Auth() {
    return (
        <section className=" p-2 md:p-3 lg:p-4">
            <Tabs defaultValue="login" className="w-[400px] m-auto">
                <TabsContent value="login">
                    <LogInForm/>
                </TabsContent>
                <TabsContent value="signup">
                    <SignUpForm/>
                </TabsContent>
                <TabsList className="w-[400px] flex">
                    <TabsTrigger value="login">로그인</TabsTrigger>
                    <TabsTrigger value="signup">계정 만들기</TabsTrigger>
                </TabsList>
            </Tabs>
        </section>
    )
}