import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import getRandomNumber from "./getRandomNumber";
import setDelay from "./setDelay";

const processAlbumData = async (ids, token) => {
    for (const id of ids) {
        try {
            await setDelay(2000);

            const albumResponse = await fetch(
                `https://api.spotify.com/v1/albums/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const album = await albumResponse.json();

            await setDelay(2000);

            const artistid = data1.artists[0].id;

            const artistResponse = await fetch(
                `https://api.spotify.com/v1/artists/${artistid}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            const artist = await artistResponse.json();

            const docData = {
                name: album.name,
                image: album.images[0]?.url,
                artist_name1: album.artist[0]?.name,
                artist_name2: album.artist[1]?.name,
                artist_name3: album.artist[2]?.name, /* 앨범의 아티스트 이름은 세번째 아티스트까지만 가져옴 */
                release_date: album.release_date,
                genres: artist.genres, /* 앨범의 장르는 null인 경우가 많음, 앨범의 첫번째 아티스트의 장르를 가져옴*/
                popularity: album.popularity,
                updatedAt: Date.now(),
                randomNum1: getRandomNumber(0,9999),
                randomNum2: getRandomNumber(0,9999),
                randomNum3: getRandomNumber(0,9999),
                preview_url: album.tracks.items[1]?.preview_url, /* 앨범의 두번째 트랙의 프리뷰를 가져옴. 앨범의 타이틀곡을 가져오고 싶은데 불가능한 것 같다...*/
            };

            await setDoc(doc(db, "albums", album.id), docData);
            console.log(`${data1.name} 업로드 성공`);

        } catch (error) {
            console.error(error);
        }
    }
};

export default processAlbumData;
