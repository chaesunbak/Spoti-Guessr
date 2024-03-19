import useAuthStore from "../../store/authStore";
import {useNavigate} from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicAdminForm from "./MusicAdminForm";


export default function Admin() {
    const user = useAuthStore((state) => state.user);

    return (
        <>
            {user.permission !== useNavigate(-1)}
            <h2>관리자 메뉴</h2>
            <Tabs defaultValue="music" className="w-full">
                <TabsList className='w-full justify-start'>
                    <TabsTrigger value="music">음악</TabsTrigger>
                    <TabsTrigger value="figure">인물</TabsTrigger>
                </TabsList>
                <TabsContent value="music"><MusicAdminForm /></TabsContent>
                <TabsContent value="figure">인물 관리자 메뉴입니다.</TabsContent>
            </Tabs>
        </>
    )
};
