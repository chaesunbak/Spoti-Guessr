import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import getRandomNumber from "./getRandomNumber";
import setDelay from "./setDelay";

const processAlbumData = async (ids, token) => {
    for (const id of ids) {
        try {
            await setDelay(2000);

            const response1 = await fetch(
                `https://api.spotify.com/v1/albums/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const data1 = await response1.json();

            await setDelay(2000);

            const artistid = data1.artists[0].id;

            const response2 = await fetch(
                `https://api.spotify.com/v1/artists/${artistid}`,
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
                image: data1.images[0]?.url,
                release_date: data1.release_date,
                genres: data2.genres,
                popularity: data1.popularity,
                updatedAt: Date.now(),
                randomNum1: getRandomNumber(0,9999),
                randomNum2: getRandomNumber(0,9999),
                randomNum3: getRandomNumber(0,9999),
                preview_url: data1.tracks.items[1]?.preview_url, /* 앨범의 두번째 트랙의 프리뷰를 가져옵니다. */
            };

            await setDoc(doc(db, "albums", data1.id), docData);
            console.log(`${data1.name} 업로드 성공`);

        } catch (error) {
            console.error(error);
        }
    }
};

export default processAlbumData;
