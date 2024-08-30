import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getRandomNickname } from "../../utils/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuthStore from "../../store/authStore";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from  "@/firebase/firebase";
import { useParams } from "react-router-dom";

const commentFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  comment: z.string().min(2).max(200),
})


export default function AddCommentForm() {
  const params = useParams();
  const gamemode = params.gamemode;
  const id = params.id;

  const user = useAuthStore((state) => state.user);

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      username: `${getRandomNickname()}`,
      password: "",
      comment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {

    try {
      // Firestore에 데이터 저장
      await addDoc(collection(db, gamemode, id, "comments"), {
        username: values.username,
        password: values.password,
        comment: values.comment,
        createdAt: new Date().toISOString(),
      });
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  }

      return (
        <Form className="p-4 md:p-8 lg:p-12" {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>댓글</FormLabel>
                  <FormControl>
                    <Textarea placeholder="댓글을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">등록</Button>
          </form>
        </Form>
      );
}