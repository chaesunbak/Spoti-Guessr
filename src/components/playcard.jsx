import { useColor } from 'color-thief-react';
import { Progress } from "@/components/ui/progress"
import { useState, useRef } from 'react';

export default function PlayCard({ gameData }) {
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

    return (
        <div className="rounded-xl p-6 max-h-screen" style={bgStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img className="aspect-square rounded-md" src={gameData.image} alt={gameData.name} />
            <div className="text-white font-bold text-4xl mt-4 bg-black bg-opacity-20 size-fit">{gameData.name}</div>
            <div className='text-slate-200 font-light text-base bg-black bg-opacity-20 size-fit'>{gameData.artist_name1} · {gameData.release_date}</div>
            <audio ref={audioRef} className='hidden'controls src={gameData.preview_url} onTimeUpdate={updateProgress}/>
            <Progress value={progress} className="mx-auto my-4" />
        </div>
    )
}
