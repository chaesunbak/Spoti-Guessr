import { useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddDataForm from './AddDataForm';
import UpdateDataForm from './UpdataDataForm';

export default function AddData() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('접근 권한이 없습니다. 이전 페이지로 돌아갑니다.');
      navigate(-1);
    } else if (!user?.permission !== 'ADMIN') {
      alert('현재는 어드민만 접근할 수 있습니다. 이전 페이지로 돌아갑니다.');
      navigate(-1);
    }
  }, []);

  return (
    <div className="p-2 md:p-3 lg:p-4">
      <h2 className="font-bold text-5xl lg:text-6xl my-2">관리자 메뉴</h2>
      <Tabs defaultValue="artist" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="artist">데이터 추가하기</TabsTrigger>
          <TabsTrigger value="album">데이터 업데이트하기</TabsTrigger>
        </TabsList>
        <TabsContent value="artist">
          <AddDataForm />
        </TabsContent>
        <TabsContent value="album">
          <UpdateDataForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
