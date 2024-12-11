import { useForm } from 'react-hook-form';
import { getRandomNickname } from '../../lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAuthStore from '../../store/authStore';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useParams } from 'react-router-dom';

export default function AddCommentForm() {
  const params = useParams();
  const { gamemode, id } = params;

  const user = useAuthStore(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: user ? user.nickname : getRandomNickname(),
      password: user ? user.uid : '',
      comment: '',
    },
  });

  async function onSubmit(values) {
    if (!gamemode || !id) return;
    try {
      // Firestore에 데이터 저장
      await addDoc(collection(db, gamemode, id, 'comments'), {
        username: values.username,
        password: values.password,
        comment: values.comment,
        createdAt: new Date().toISOString(),
      });
      console.log('댓글이 성공적으로 저장되었습니다.');
      reset();
    } catch (e) {
      console.error('댓글 저장 중 오류 발생: ', e);
    }
  }

  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <FormItem>
            <FormLabel>닉네임</FormLabel>
            <FormControl>
              <Input
                placeholder="닉네임을 입력하세요"
                {...register('username', { required: '닉네임을 입력해주세요.' })}
              />
            </FormControl>
            <FormMessage>{errors.username && errors.username.message}</FormMessage>
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                {...register('password', { required: '비밀번호를 입력해주세요.' })}
              />
            </FormControl>
            <FormMessage>{errors.password && errors.password.message}</FormMessage>
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel>댓글</FormLabel>
            <FormControl>
              <Textarea
                placeholder="댓글을 입력하세요"
                {...register('comment', {
                  required: '댓글을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '2자 이상 입력해주세요.',
                  },
                  maxLength: {
                    value: 200,
                    message: '200자를 초과할 수 없습니다.',
                  },
                })}
              />
            </FormControl>
            <FormMessage>{errors.comment && errors.comment.message}</FormMessage>
          </FormItem>
        </FormField>

        <Button type="submit">댓글 작성</Button>
      </form>
    </Form>
  );
}
