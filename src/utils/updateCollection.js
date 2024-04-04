import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import processArtistData from "./processArtistData";
import processAlbumData from "./processAlbumData";
import processTrackData from "./processTrackData";


async function getIdsFromCollection(mode, toast) {
  try {
    const querySnapshot = await getDocs(collection(db, mode));
    const ids = querySnapshot.docs.map(doc => doc.id); // 모든 ID를 배열로 수집
    toast({
      title: `✅ ${mode}컬렉션의 모든 ID를 가져왔습니다.`,
      description: `${querySnapshot.docs.length}건`,
    });
    return ids
  } catch (error) {
    toast({
      title: '❗음..뭔가 잘못됬습니다.',
      description: error.message,
    });
  }
}

export default async function updateCollection(mode, token, toast) {
  const ids = await getIdsFromCollection(mode, toast);
  
  switch (mode) {
    case "artists":
      await processArtistData(ids, token, toast);
      break;
    case "albums":
      await processAlbumData(ids, token, toast);
      break;
    case "tracks":
      await processTrackData(ids, token, toast);
      break;
    default:
      toast({
        title: '❗오류',
        description: `${mode}는 유효하지 않은 모드입니다.`,
      });
    return;
  }
  toast({
    title: `✅ ${mode}컬렉션의 모든 문서를 업데이트했습니다.`,
    description: '좀 오래걸렸죠?',
  });
}

