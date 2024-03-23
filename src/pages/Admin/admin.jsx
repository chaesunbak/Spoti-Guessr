import useAuthStore from "../../store/authStore";
import {useNavigate} from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddDataForm from "./AddDataForm";
import UpdateDataForm from "./UpdataDataForm";

export default function Admin() {
    const user = useAuthStore((state) => state.user);

    return (
        <>
            {user.permission !== useNavigate(-1)}
            <h2 className='font-bold text-5xl lg:text-6xl my-2'>관리자 메뉴</h2>
            <Tabs defaultValue="artist" className="w-full">
                <TabsList className='w-full justify-start'>
                    <TabsTrigger value="artist">데이터 추가하기</TabsTrigger>
                    <TabsTrigger value="album">데이터 업데이트하기</TabsTrigger>
                </TabsList>
                <TabsContent value="artist"><AddDataForm /></TabsContent>
                <TabsContent value="album"><UpdateDataForm/></TabsContent>
            </Tabs>
        </>
    )
};
