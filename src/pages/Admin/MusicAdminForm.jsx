import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/toaster";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import getRandomNumber from "../../utils/getRandomNumber";
import useShowToast from "../../hooks/useShowToast";


export default function MusicAdminFrom() {
  const [token, setToken] = useState('');
  const [ids, setIds] = useState(['']);
  const [mode, setMode] = useState('artists'); /* 'artists', 'albums', 'track' 중 1 */
  const [isGettingToken, setIsGettingToken] = useState(false);
  const showToast = useShowToast();
  const [isUploadingData, setIsUploadingData] = useState(false);

  const modeWithoutS = mode.slice(0, -1);

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
      showToast('토큰이 발급되었습니다.', token);
    } catch (error) {
      showToast(error, error.message);
    } finally {
      setIsGettingToken(false);
    }
  };

  const getIdFromSpotifyLink = (url) => {
    const id = url.replace(`https://open.spotify.com/${modeWithoutS}/`, "").split("?")[0];
    return id;
  };

  const inputItems = ids.map((id, index) => (
    <Input
      key={index}
      placeholder={`${mode} ID ${index + 1}`}
      value={id}
      onChange={(e) => {
        const newIds = [...ids];
        newIds[index] = getIdFromSpotifyLink(e.target.value);
        setIds(newIds);
      }}
    />
  ));

  async function getDataAndUpload() {
    const dataIds = ids.join(',');

    try {
      setIsUploadingData(true);
      const response = await fetch(
        `https://api.spotify.com/v1/${mode}?ids=${dataIds}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      showToast('데이터를 받아오는데 성공했습니다!');

      if (mode == 'artists') {
        for (const artist of data.artists) {
          const docData = {
            name: artist.name,
            followers: artist.followers.total,
            image: artist.images[0]?.url,
            genres: artist.genres,
            popularity: artist.popularity,
            updatedAt: Date.now(),
            randomNum1: getRandomNumber(0,9999),
            randomNum2: getRandomNumber(0,9999),
            randomNum3: getRandomNumber(0,9999),
          };
          try {
            setDoc(doc(db, "artists", artist.id), docData);
          } catch (error) {
            showToast(error, error.message);
          }
        };
      } else if ( mode == 'albums') {
        for (const album of data.albums) {
          const docData = {
            name: album.name,
            image: album.images[0]?.url,
            artist: album.artist[0].name,
            genres: album.genres,
            popularity: album.popularity,
            updatedAt: Date.now(),
            randomNum1: getRandomNumber(0,9999),
            randomNum2: getRandomNumber(0,9999),
            randomNum3: getRandomNumber(0,9999),
          };
          try {
            setDoc(doc(db, "albums", album.id), docData);
          } catch (error) {
            showToast(error, error.message);
          }
        };
      } else if ( mode == 'tracks') {
        for (const track of data.tracks) {
          const docData = {
            name: track.name,
            image: track.album.images[0]?.url,
            artist: track.album.artist[0].name,
            popularity: track.popularity,
            updatedAt: Date.now(),
            randomNum1: getRandomNumber(0,9999),
            randomNum2: getRandomNumber(0,9999),
            randomNum3: getRandomNumber(0,9999),
          };
          try {
            setDoc(doc(db, "tracks", track.id), docData);
          } catch (error) {
            showToast(error, error.message);
          }
        };
      };
      showToast('모든 데이터가 성공적으로 업로드되었습니다.')
    } catch (error) {
      showToast(error, error.message);
    } finally {
      setIsUploadingData(false);
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
            <CardTitle>3. 데이터 받아와서 업로드하기</CardTitle>
            <CardDescription>{mode} ID를 입력해주세요(공유-{mode} 링크복사)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
            {inputItems}
            <div className="mx-auto">
            <Button onClick={() => setIds(ids.slice(0, -1))}>-</Button>
            <Button onClick={() => setIds([...ids, ''])}>+</Button>
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={getDataAndUpload} disabled={isUploadingData} className='w-full'>데이터 업로드하기</Button>
            <Button onClick={()=>setIds([''])}>아이디 초기화하기</Button>
        </CardFooter>
        </Card>
        <Toaster />
    </>
  )
};