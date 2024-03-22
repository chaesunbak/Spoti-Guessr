import useAuthStore from "../../store/authStore";
import {useNavigate} from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistForm from "./ArtistForm";

export default function Admin() {
    const user = useAuthStore((state) => state.user);

    return (
        <>
            {user.permission !== useNavigate(-1)}
            <h2 className='font-bold text-5xl lg:text-6xl my-2'>관리자 메뉴</h2>
            <Tabs defaultValue="artist" className="w-full">
                <TabsList className='w-full justify-start'>
                    <TabsTrigger value="artist">아티스트</TabsTrigger>
                    <TabsTrigger value="album">앨범</TabsTrigger>
                    <TabsTrigger value="track">트랙</TabsTrigger>
                </TabsList>
                <TabsContent value="artist"><ArtistForm /></TabsContent>
                <TabsContent value="album">앨범 어드민</TabsContent>
                <TabsContent value="track">트랙 어드민</TabsContent>
            </Tabs>
        </>
    )
};
