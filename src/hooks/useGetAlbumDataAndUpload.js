import { useState } from "react";
import useShowToast from "./useShowToast";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default function useGetAlbumDataAndUpload(ids, token) {
    const [isGettingAlbumDataAndUploading, setIsGettingAlbumDataAndUploading] = useState(false);
    const {showToast} = useShowToast();
    const dataIds = ids.join(',');

    async function getAlbumDataAndUpload(ids, token) {
        try {
            setIsGettingDataAndUploading(true);
            const response = await fetch(
                `https://api.spotify.com/v1/albums?ids=${dataIds}`,
                {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await response.json();
            showToast('앨범 데이터를 받아오는데 성공했습니다!');

            for (const album of data.albums) {
                const docData = {
                  name: album.name,
                  date: album.release_date,
                  image: album.images[0]?.url,
                  artist: album.artists[0]?.name,
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
            showToast('모든 데이터가 성공적으로 업로드되었습니다.');
        } catch (error) {
            showToast(error, error.message)
        } finally {
            setIsGettingAlbumDataAndUploading(false);
            ids=[''];
        }
    }
    return {isGettingAlbumDataAndUploading, getAlbumDataAndUpload, ids}
}