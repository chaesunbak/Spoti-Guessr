import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section id="home" className="h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:p-3 lg:p-4">
      <Card className="max-w-[30rem] h-fit">
        <CardHeader>
          <CardTitle>바로 게임 시작하기</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link to="game/artists/all">
            <Card className={`w-full h-20 drop-shadow-md hover:drop-shadow-lg bg-indigo-500`}>
              <CardHeader>
                <CardTitle className="text-white">아티스트 : 모두</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </Link>
          <Link to="game/albums/all">
            <Card className={`w-full h-20 drop-shadow-md hover:drop-shadow-lg bg-pink-500`}>
              <CardHeader>
                <CardTitle className="text-white">앨범 : 모두</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </Link>
          <Link to="game/tracks/all">
            <Card className={`w-full h-20 drop-shadow-md hover:drop-shadow-lg bg-fuchsia-500`}>
              <CardHeader>
                <CardTitle className="text-white">트랙 : 모두</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </Link>
        </CardContent>
      </Card>
      <Card className="max-w-[30rem] h-fit">
        <CardHeader>
          <CardTitle>스포티 게서로 음악을 새롭게 즐겨보세요.</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            지금{' '}
            <span className="tooltip" title="스토티파이">
              Spotify
            </span>
            에서 어떤 곡이 더 인기있을까요?
          </p>
          <p>
            모든 음악 정보는{' '}
            <a className="text-green-700 underline" href="https://developer.spotify.com/">
              Spotify
            </a>
            를 통해 제공됩니다.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
