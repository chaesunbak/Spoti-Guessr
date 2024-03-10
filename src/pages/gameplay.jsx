import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlayCard from "../components/playcard";
import { Button } from "../components/ui/button";
import artistDB from "../DB/artist";


export default function GamePlay() {
    const [singers, setSingers] = useState([]);
    const [count, setCouunt] = useState();
    const [accessToken, setAcessToken] = useState();

    const params = useParams();

    function startGame() {
        getAccessToken();
        console.log(accessToken);
    }

    async function getAccessToken() {
        const clientId = "5bf5107c9e164f5db3c819720a4a68a0";
        const clientSecret = "b7040453246844b9b7c35ca3690dc417";

        const requestBody = new URLSearchParams();
        requestBody.append("grant_type", "client_credentials");
        requestBody.append("client_id", clientId);
        requestBody.append("client_secret", clientSecret);

        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestBody
          });

          if (!response.ok) {
            throw new Error("Failed to get access token");
          }

          const responseData = await response.json();
          setAcessToken(responseData.access_token);
        } catch (error) {
          console.error("Error fetching access token:", error);
          return null;
        }
      }

    return (
        <section id={params.gamemode} className="h-screen">
            <h2 className="text-xl">{params.gamemode} : {params.genre}</h2>
            <Button onClick={startGame}>시작하기</Button>
            <div className="grid grid-cols-2">
                <PlayCard />
                <PlayCard />
            </div>
        </section>
    );
}
