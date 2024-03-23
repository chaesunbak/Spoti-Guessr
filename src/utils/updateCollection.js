import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import processArtistData from "./processArtistData";
import processAlbumData from "./processAlbumData";
import processTrackData from "./processTrackData";

export default async function updateCollection(mode, token) {
  const querySnapshot = await getDocs(collection(db, mode));
  for (const doc of querySnapshot.docs) {
    const id = [`${doc.id}`];

    switch (mode) {
      case "artists":
        await processArtistData(id, token);
        break;
      case "albums":
        await processAlbumData(id, token);
        break;
      case "tracks":
        await processTrackData(id, token);
        break;
    }
  }
  console.log(`${mode} 컬렉션의 모든 문서를 업데이트 했습니다!`);
};


