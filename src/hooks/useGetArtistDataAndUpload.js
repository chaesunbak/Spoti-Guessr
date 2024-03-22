import { useState } from "react";
import useShowToast from "./useShowToast";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';


export default function useGetArtistDataAndUpload(dataIds, token) {
    const [loading, setLoading ] = useState(false);
    const {showToast} = useShowToast();

    async function getArtistDataAndUpload(ids, token) {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.spotify.com/v1/artists?ids=${dataIds}`,
                {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await response.json();
            showToast('아티스트 데이터를 받아오는데 성공했습니다!');

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
            }
            showToast('모든 데이터가 성공적으로 업로드되었습니다.');
        } catch (error) {
            showToast(error, error.message)
        } finally {
            setLoading(false);
        }
    }
    return {getArtistDataAndUpload, loading}
}