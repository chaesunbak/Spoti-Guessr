import { useColor } from 'color-thief-react';
import { Progress } from "@/components/ui/progress"
import { useState, useRef } from 'react';

export default function PlayCard({ gameData, onClick }) {

    if (!gameData) return ( "불러오는중" )

    /* color-thief 라이브러리를 사용하여 이미지의 주요색깔을 가져옴 */
    const { data, loading, error } = useColor(gameData.image, 'rgbString', { crossOrigin: 'Anonymous' });
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);


    const bgStyle = {
        backgroundColor: loading || error ? 'white' : data,
        transition: 'background-color 0.5s ease',
        width: '100%',
        height: '100%',
    };

    const handleMouseEnter = async (e) => {
        const audio = e.currentTarget.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            try {
                await audio.play();
            } catch (err) {
                console.error("오디오 재생 실패:", err);
            }
        }
    };

    const handleMouseLeave = (e) => {
        const audio = e.currentTarget.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const { currentTime, duration } = audioRef.current;
            setProgress((currentTime / duration) * 100);
        }
    };

    /* 앨범 또는 트랙의 아티스트 이름 나열 해줌 예시(아이유, 김동률) */
    const artistNames = [gameData.artist_name1, gameData.artist_name2, gameData.artist_name3]
        .filter(Boolean)
        .join(", ");


    return (
        <div className="rounded-xl p-6 max-h-screen" style={bgStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
            <img className="aspect-square rounded-md m-auto" src={gameData.image} alt={gameData.name} />
            <div className="text-white font-bold text-4xl mt-4 bg-black bg-opacity-20 size-fit">{gameData.name}</div>
            <div className='text-slate-200 font-light text-base bg-black bg-opacity-20 size-fit'>{artistNames} · {gameData.release_date}</div>
            <audio ref={audioRef} className='hidden'controls src={gameData.preview_url} onTimeUpdate={updateProgress}/>
            <Progress value={progress} className="mx-auto my-4" />
        </div>
    )
}
