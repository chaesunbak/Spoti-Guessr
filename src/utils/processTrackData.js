import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import getRandomNumber from "./getRandomNumber";

const processTrackData = async (ids, token) => {
    for (const id of ids) {
        try {
            const response1 = await fetch(
                `https://api.spotify.com/v1/tracks/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const track = await response1.json();

            const artistid = track.artists[0].id;

            const response2 = await fetch(
                `https://api.spotify.com/v1/artists/${artistid}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const artist = await response2.json();

            const docData = {
                name: track.name,
                image: track.album.images[0]?.url,
                genres: artist.genres,
                album_name: track.album.name,
                release_date: track.album.release_date,
                popularity: track.popularity,
                updatedAt: Date.now(),
                randomNum: getRandomNumber(0,9999),
                preview_url: track.preview_url,
            };

            await setDoc(doc(db, "tracks", track.id), docData);
            console.log(`${track.name} 업로드 성공`);

        } catch (error) {
            console.error(error);
        }
    }

};

export default processTrackData;
