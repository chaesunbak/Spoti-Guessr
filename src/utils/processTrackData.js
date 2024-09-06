import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getRandomNum } from '../lib/utils';
import setDelay from './setDelay';

const processTrackData = async (ids, token, toast) => {
  // ID 배열을 20개 단위로 분할
  const chunkedIds = [];
  for (let i = 0; i < ids.length; i += 20) {
    chunkedIds.push(ids.slice(i, i + 20));
  }

  for (const chunk of chunkedIds) {
    try {
      await setDelay(2000);
      const tracksResponse = await fetch(`https://api.spotify.com/v1/tracks/?ids=${chunk.join(',')}` /* 최대 20개 */, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tracksData = await tracksResponse.json();
      console.log(tracksData);

      // 모든 첫 번째 아티스트의 ID를 모음
      const artistIds = tracksData.tracks.map(track => track.artists[0].id).join(',');
      console.log(artistIds);

      const artistsResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const artistsData = await artistsResponse.json();

      // 아티스트 ID를 키로 하여 아티스트 정보를 매핑
      const artistMap = artistsData.artists.reduce((map, artist) => {
        map[artist.id] = artist;
        return map;
      }, {});

      for (const track of tracksData.tracks) {
        const artist = artistMap[track.artists[0].id];

        const docData = {
          id: track.id,
          type: track.type,
          name: track.name,
          explicit: track.explicit,
          spotifylink: track.external_urls.spotify,
          image: track.album.images[0]?.url,
          genres: artist.genres /* 트랙의 장르는 null인 경우가 많아 첫번째 아티스트의 장르를 가져옴 */,
          artist1_name: track.artists[0]?.name || null,
          artist1_id: track.artists[0]?.id || null,
          artist2_name: track.artists[1]?.name || null,
          artist2_id: track.artists[1]?.id || null,
          artist3_name: track.artists[2]?.name || null,
          artist3_id: track.artists[2]?.id || null,
          album_name: track.album.name,
          release_date: track.album.release_date,
          popularity: track.popularity,
          updatedAt: Date.now(),
          randomNum1: getRandomNum(0, 9999),
          randomNum2: getRandomNum(0, 9999),
          randomNum3: getRandomNum(0, 9999),
          preview_url: track.preview_url,
        };

        await setDoc(doc(db, 'tracks', track.id), docData);
        toast({
          title: '✅ 데이터 업로드 성공',
          description: `트랙 : ${track.name}`,
        });
      }
    } catch (error) {
      console.log('error', error.message);
      toast({
        title: '❗음..뭔가 잘못됬습니다.',
        description: error.message,
      });
    }
  }
};

export default processTrackData;
