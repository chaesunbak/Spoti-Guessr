import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/toaster";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import updateCollection from "../../utils/updateCollection";
import { useToast } from "@/components/ui/use-toast"

export default function UpdateDataForm() {

  const [token, setToken] = useState('');
  const [ids, setIds] = useState(['']);
  const [mode, setMode] = useState('artists'); /* 'artists', 'albums', 'tracks' 중 1 */
  const [isGettingToken, setIsGettingToken] = useState(false);
  const { toast } = useToast();


  const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  async function getToken() {
    try {
      setIsGettingToken(true);
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

      const data = await response.json();
      setToken(data.access_token);
      toast({
        title: "토큰이 발급되었습니다.",
        description: `${token}`,
      })
    } catch (error) {
      toast({
        title: '❗ 음..뭔가 잘못됬습니다.',
        description: error.message,
      })
    } finally {
      setIsGettingToken(false);
    }
  };

  return (
    <>
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>1. 토큰 받기</CardTitle>
                <CardDescription>토큰 유효기간은 한시간입니다</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={getToken} disabled={isGettingToken}className='w-full'>인증 토큰 받기</Button>
            </CardContent>
            <CardFooter>
                <p>{token}</p>
            </CardFooter>
        </Card>
        <Card className="flex flex-col w-[400px]">
        <CardHeader>
            <CardTitle>2. 데이터 유형 선택</CardTitle>
            <CardDescription>아티스트, 앨범, 트랙 중에서 선택해 주세요</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <RadioGroup defaultValue="artists" onValueChange={(e) => setMode(e)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="artists" id="artists" />
              <Label htmlFor="artists">아티스트</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="albums" id="albums" />
              <Label htmlFor="albums">앨범</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tracks" id="tracks" />
              <Label htmlFor="tracks">트랙</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
        </CardFooter>
        </Card>
        <Card className="flex flex-col w-[400px]">
        <CardHeader>
            <CardTitle>3. 데이터 업데이트 하기하기</CardTitle>
            <CardDescription>{mode}콜렉션의 모든 문서를 업데이트합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
        </CardContent>
        <CardFooter>
            <Button onClick={()=>updateCollection(mode, token, toast)} className='w-full'>데이터 업로드하기</Button>
        </CardFooter>
        </Card>
    </>
  )
};