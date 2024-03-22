import { useState } from "react";
import useShowToast from "./useShowToast";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

export default function useGetTrackDataAndUpload(ids, token) {
    const [isGettingTrackDataAndUploading, setIsGettingTrackDataAndUploading] = useState(false);
    const {showToast} = useShowToast();
    const dataIds = ids.join(',');

    async function getTrackDataAndUpload(ids, token) {
        try {
            setIsTrackGettingDataAndUploading(true);
            const response = await fetch(
                `https://api.spotify.com/v1/tracks?ids=${dataIds}`,
                {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await response.json();
            showToast('트랙 데이터를 받아오는데 성공했습니다!');

            for (const track of data.tracks) {
                const docData = {
                    name: track.name,
                    image: track.album.images[0]?.url,
                    artist: track.album.artists[0].name,
                    popularity: track.popularity,
                    updatedAt: Date.now(),
                    randomNum1: getRandomNumber(0,9999),
                    randomNum2: getRandomNumber(0,9999),
                    randomNum3: getRandomNumber(0,9999),
                    preview_url: track.preview_url,
                };
                try {
                    setDoc(doc(db, "tracks", track.id), docData);
                } catch (error) {
                    showToast(error, error.message);
                }
            };
            showToast('모든 데이터가 성공적으로 업로드되었습니다.');
        } catch (error) {
            showToast(error, error.message)
        } finally {
            setIsGettingTrackDataAndUploading(false);
        }
    }
    return {isGettingTrackDataAndUploading, getTrackDataAndUpload,}
}