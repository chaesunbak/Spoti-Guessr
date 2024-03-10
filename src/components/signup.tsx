import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { app, auth, database } from "../config/firebase";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    email: z.string().email({ message: "올바르지 않은 이메일입니다." }),
    password: z.string().min(8, { message: "8자 이상 입력해주세요." }).max(50, { message: "50자를 초과할 수 없습니다." }),
    passwordConfirm: z.string(),
  }).refine((data) => {
    return data.password === data.passwordConfirm
  }, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfrim"],
  }
  )


export default function SignUp() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

    const auth = getAuth();

    const handleSubmit = () => {
        console.log(form.email + form.password);
        createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            }
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            }
        );
        addDoc(dbInstance, data)
        .then
        .catch((error) => {
            
        })

    }

    return (
        <Card className="flex flex-col justify-between max-w-lg">
            <CardHeader>
                <CardTitle>계정 만들기</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline">구글로 계속하기</Button>
                <Button variant="outline">Button</Button>
                <Button variant="outline">Button</Button>
                <Button variant="outline">Button</Button>
                <div className="flex"><Separator />또는<Separator /></div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input placeholder="exmaple@gmail.com" tpye="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                         <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>비밀번호</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                         <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>비밀번호 확인</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        <Button type="submit">가입하기</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>이미 계정이 있으신가요?</p> <Link>로그인하기</Link>
            </CardFooter>
        </Card>
    )
}