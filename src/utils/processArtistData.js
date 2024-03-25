import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import getRandomNumber from "./getRandomNumber";
import setDelay from "./setDelay";

const processArtistData = async (ids, token) => {
    for (const id of ids) {
        try {
            await setDelay(2000);

            const artistResponse = await fetch(
                `https://api.spotify.com/v1/artists/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const artist = await artistResponse.json();

            await setDelay(2000);

            const top_tracksResponse = await fetch(
                `https://api.spotify.com/v1/artists/${id}/top-tracks`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const top_track = await top_tracksResponse.json();

            const docData = {
                name: artist.name,
                followers: artist.followers.total, /*아직 사용되지 않으나 혹시 몰라서 추가 */
                image: artist.images[0]?.url,
                genres: artist.genres,
                popularity: artist.popularity,
                updatedAt: Date.now(),
                randomNum1: getRandomNumber(0,9999),
                randomNum2: getRandomNumber(0,9999),
                randomNum3: getRandomNumber(0,9999),
                preview_url: top_track.tracks[0]?.preview_url,
            };

            await setDoc(doc(db, "artists", artist.id), docData);
            console.log(`${data1.name} 업로드 성공`);

        } catch (error) {
            console.error(error);
        }
    }
};

export default processArtistData;
