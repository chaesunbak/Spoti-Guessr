import useAuthStore from "../../store/authStore";
import {useNavigate} from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function Admin() {
    const user = useAuthStore((state) => state.user);
    const [token, setToken] = useState('');

    const clientID = '5bf5107c9e164f5db3c819720a4a68a0';
    const clientSecret = 'b7040453246844b9b7c35ca3690dc417';

    async function getAcessToken() {
      const response = await fetch(
          "https://accounts.spotify.com/api/token",
        {
        method: "POST",
        body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const data = await response.json();
        console.log(data);
        setToken(data.access_token);
      }

    async function getArtistData() {
      let id = prompt("아티스트 id를 입력해주세요");

      const response = await fetch(
        `https://api.spotify.com/v1/artists/${id}`,
        { method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });
        const date = await response.json();
        console.log(date);
    }

    return (

        <>
        {user.permission !== useNavigate(-1)}
        <p>스포티파이</p>
        <Button onClick={getAcessToken}>API 액세스 토큰 받기</Button>
        토큰 : {token}


        <Button onClick={getArtistData}>아티스트 정보 추가하기</Button>
        </>
    )
};