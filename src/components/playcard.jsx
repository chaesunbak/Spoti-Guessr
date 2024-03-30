import { useColor } from 'color-thief-react';
import { Progress } from "@/components/ui/progress"
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export default function PlayCard({ gameData, onClick }) {

    /* 샤드 시엔 스켈레톤으로 추가할것 */
    if (!gameData) return ( "불러오는중" )

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

    const release_date = gameData.release_date;
    const relaseYear = release_date.substring(0,4);


    return (
        <div className="rounded-xl p-3 md:p-4 lg:p-5 xl:p-6 drop-shadow-md hover:backdrop-opacity-90 cursor-pointer" style={bgStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
            <img className="aspect-square rounded-md m-auto" src={gameData.image} alt={gameData.name} />
            <div className="text-white font-bold text-md @md:text-lg @lg:text-2xl @xl:text-5xl mt-4 bg-black bg-opacity-20 size-fit">{gameData.name}</div>
            {artistNames && gameData.release_date && (
                <div className='text-slate-200 font-light text-base bg-black bg-opacity-20 size-fit'>
                    {artistNames} · {relaseYear}
                </div>
            )}
            <audio ref={audioRef} className='hidden'controls src={gameData.preview_url} onTimeUpdate={updateProgress}/>
            <div className='grid grid-cols-5 text-white text-2xl my-1'>
                <FontAwesomeIcon className='col-start-3 aspect-square rounded hover:bg-black/20 p-2 m-auto' icon={isPlaying ? faPause : faPlay} onClick={(e) => {e.stopPropagation(); togglePlay();}}/>
                <FontAwesomeIcon className="col-start-5 aspect-square rounded hover:bg-black/20 p-2 m-auto" icon={isMuted ? faVolumeXmark : faVolumeXmark} onClick={(e) => {e.stopPropagation(); toggleMute();}}/>
            </div>
            <Progress value={progress} className="mx-auto my-4" />
        </div>
    )
}
