import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import getRandomNumber from "./getRandomNumber";
import setDelay from "./setDelay";

const processArtistData = async (ids, token, toast) => {

  // ID 배열을 20개 단위로 분할
  const chunkedIds = [];
  for (let i = 0; i < ids.length; i += 20) {
    chunkedIds.push(ids.slice(i, i + 20));
  }

  for (const chunk of chunkedIds) {
    try {
      const artistsResponse = await fetch(
        `https://api.spotify.com/v1/artists?ids=${chunk.join(",")}`,
        {
          method: "GET",
          headers: {
          "Authorization": `Bearer ${token}`
          },
          }
      );

      const artistsData = await artistsResponse.json();

      for (const artist of artistsData.artists) {
        await setDelay(2000);

        const top_tracksResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            },
          }
        );

        const top_tracks = await top_tracksResponse.json();

        const docData = {
          id: artist.id,
          type: artist.type,
          name: artist.name,
          spotifylink: artist.external_urls.spotify,
          followers: artist.followers.total,
          image: artist.images[0]?.url,
          genres: artist.genres,
          popularity: artist.popularity,
          updatedAt: Date.now(),
          randomNum1: getRandomNumber(0,9999),
          randomNum2: getRandomNumber(0,9999),
          randomNum3: getRandomNumber(0,9999),
          preview_url: top_tracks.tracks[0]?.preview_url,
        };

      await setDoc(doc(db, "artists", artist.id), docData);
      toast({
          title: '✅ 데이터 업로드 성공',
          description: `아티스트 : ${artist.name}`,
      });
      }
    } catch (error) {
      toast({
        title: '❗ 음..뭔가 잘못됬습니다.',
        description: error.message,
      });
    }
  }
};

export default processArtistData;
