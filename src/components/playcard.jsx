import { useColor } from 'color-thief-react';
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import MusicPlayBar from './musicplaybar';

export default function PlayCard({ gameData, onClick }) {

    /* 게임 데이터 없을시 스켈레톤 */
    if (!gameData) return (
        <div className="flex flex-col rounded-xl p-3 md:p-4 lg:p-5 xl:p-6 drop-shadow-md">
            <div className='w-full aspect-square relative'>
                <Skeleton className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full rounded-md" />
            </div>
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
        </div>
    )

    /* color-thief 라이브러리를 사용하여 이미지의 주요색깔을 가져옴 */
    const { data, loading, error } = useColor(gameData.image, 'rgbString', { crossOrigin: 'Anonymous' });
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const bgStyle = {
        backgroundColor: loading || error ? 'white' : data,
        transition: 'background-color 0.5s ease',
        width: '100%',
        height: '100%',
    };

    const togglePlay = async () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            try {
                await audioRef.current.play();
            } catch (err) {
                console.error("오디오 재생 실패:", err);
            }
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
    };

    const handleMouseEnter = async () => {
        if (!audioRef.current || isPlaying) return;
        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (err) {
            console.error("오디오 자동 재생 실패:", err);
        }
    };

    const handleMouseLeave = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
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
        <div className="flex flex-col justify-between rounded-xl p-3 md:p-4 lg:p-5 drop-shadow-md hover:backdrop-opacity-90 cursor-pointer max-h-80 md:max-h-none" style={bgStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
            <div className='w-full max-h-96 aspect-square relative flex items-center justify-center'>
                <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full rounded-md shadow-md md:shadow-lg" src={gameData.image} alt={gameData.name} />
            </div>
            <div className="text-white font-bold text-md md:text-xl lg:text-3xl my-2 md:my-3 lg:my-4 bg-black bg-opacity-20 size-fit">{gameData.name}</div>
            {artistNames && gameData.release_date && (
                <div className='text-slate-200 font-light text-x md:text-md lg:text-xl bg-black bg-opacity-20 size-fit'>
                    {artistNames} · {gameData.release_date.substring(0,4)}
                </div>
            )}
            {gameData.preview_url && ( <audio ref={audioRef} className='hidden'controls src={gameData.preview_url} onTimeUpdate={updateProgress}/>)}
            <div className='grid grid-cols-5 text-white text-xl my-2 md:my-3 lg:my-4'>
                <FontAwesomeIcon className='col-start-3 aspect-square rounded hover:bg-black/20 p-2 md:p-3 lg:p-4 m-auto' icon={isPlaying ? faPause : faPlay} onClick={(e) => {e.stopPropagation(); togglePlay();}}/>
                <FontAwesomeIcon className="col-start-5 aspect-square rounded hover:bg-black/20 p-2 md:p-3 lg:p-4 m-auto" icon={isMuted ? faVolumeXmark : faVolumeHigh} onClick={(e) => {e.stopPropagation(); toggleMute();}}/>
            </div>
            <MusicPlayBar progress={progress} preview_url={gameData.preview_url}/>
        </div>
    )
}
