import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useParams } from 'react-router-dom';

export default function MusicPlayBar({progress, preview_url}) {

    const params = useParams();
    const gamemode = params.gamemode;

    const tooltipMessage = () => {
        switch (gamemode) {
            case 'artists':
                return <p>카드 호버시 아티스트 대표곡의 미리듣기가 재생됩니다.</p>;
            case 'albums':
                return <p>카드 호버시 앨범 두번째 트랙의 미리듣기가 재생됩니다.</p>;
            case 'tracks':
                return <p>카드 호버시 해당 트랙의 미리듣기가 재생됩니다.</p>;
            default:
                return;
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Progress value={progress} className="mx-auto mt-2 md:mt-3 lg:mt-5" />
                </TooltipTrigger>
                <TooltipContent>
                    {tooltipMessage()}
                    {preview_url == null ? <p>음악 미리듣기가 지원되지 않습니다.</p> : null}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

