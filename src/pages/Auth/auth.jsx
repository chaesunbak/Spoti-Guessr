import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from '../../components/Auth/signin';
import SignUp from '../../components/Auth/signup';

export default function Auth() {
    return (
        <section className=" p-2 md:p-3 lg:p-4">
            <Tabs defaultValue="signin" className="w-[400px] m-auto">
                <TabsContent value="signin">
                    <SignIn/>
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp/>
                </TabsContent>
                <TabsList className="w-[400px] flex">
                    <TabsTrigger value="signin">로그인</TabsTrigger>
                    <TabsTrigger value="signup">계정 만들기</TabsTrigger>
                </TabsList>
            </Tabs>
        </section>
    )
}