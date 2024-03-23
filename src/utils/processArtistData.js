import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import getRandomNumber from "./getRandomNumber";
import setDelay from "./setDelay";

const processArtistData = async (ids, token) => {
    for (const id of ids) {
        try {
            await setDelay(2000);

            const response1 = await fetch(
                `https://api.spotify.com/v1/artists/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const data1 = await response1.json();

            await setDelay(2000);

            const response2 = await fetch(
                `https://api.spotify.com/v1/artists/${id}/top-tracks`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const data2 = await response2.json();

            const docData = {
                name: data1.name,
                followers: data1.followers.total,
                image: data1.images[0]?.url,
                genres: data1.genres,
                popularity: data1.popularity,
                updatedAt: Date.now(),
                randomNum1: getRandomNumber(0,9999),
                randomNum2: getRandomNumber(0,9999),
                randomNum3: getRandomNumber(0,9999),
                preview_url: data2.tracks[0]?.preview_url,
            };

            await setDoc(doc(db, "artists", data1.id), docData);
            console.log(`${data1.name} 업로드 성공`);

        } catch (error) {
            console.error(error);
        }
    }
};

export default processArtistData;
