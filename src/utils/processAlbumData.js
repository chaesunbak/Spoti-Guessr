import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getRandomNum } from '../lib/utils';
import setDelay from './setDelay';

const processAlbumData = async (ids, token, toast) => {
  // ID 배열을 20개 단위로 분할
  const chunkedIds = [];
  for (let i = 0; i < ids.length; i += 20) {
    chunkedIds.push(ids.slice(i, i + 20));
  }

  for (const chunk of chunkedIds) {
    try {
      await setDelay(2000);

      const albumsResponse = await fetch(`https://api.spotify.com/v1/albums?ids=${chunk.join(',')}` /* 최대 20개 */, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const albumsData = await albumsResponse.json();

      // 모든 첫 번째 아티스트의 ID를 모음
      const artistIds = albumsData.albums.map(album => album.artists[0].id).join(',');

      // 한 번에 모든 아티스트 정보를 가져옴
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

      for (const album of albumsData.albums) {
        const artist = artistMap[album.artists[0].id];

        const docData = {
          id: album.id,
          type: album.type,
          spotifylink: album.external_urls.spotify,
          album_type: album.album_type,
          name: album.name,
          image: album.images[0]?.url,
          artist1_name: album.artists[0]?.name || null,
          artist1_id: album.artists[0]?.id || null,
          artist2_name: album.artists[1]?.name || null,
          artist2_id: album.artists[1]?.id || null,
          artist3_name: album.artists[2]?.name || null,
          artist3_id: album.artists[2]?.id || null /* 앨범의 아티스트 이름은 세번째 아티스트까지만 가져옴 */,
          release_date: album.release_date,
          genres: artist.genres /* 앨범의 장르는 null인 경우가 많음, 앨범의 첫번째 아티스트의 장르를 가져옴*/,
          popularity: album.popularity,
          updatedAt: Date.now(),
          randomNum1: getRandomNum(0, 9999),
          randomNum2: getRandomNum(0, 9999),
          randomNum3: getRandomNum(0, 9999),
          preview_url:
            album.tracks.items[1]
              ?.preview_url /* 앨범의 두번째 트랙의 프리뷰를 가져옴. 앨범의 타이틀곡을 가져오고 싶은데 불가능한 것 같다...*/,
        };

        await setDoc(doc(db, 'albums', album.id), docData);
        toast({
          title: '✅ 데이터 업로드 성공',
          description: `앨범 : ${album.name}`,
        });
      }
    } catch (error) {
      toast({
        title: '❗음..뭔가 잘못됬습니다.',
        description: error.message,
      });
    }
  }
};

export default processAlbumData;
