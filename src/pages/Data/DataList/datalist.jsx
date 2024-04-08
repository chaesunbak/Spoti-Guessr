import { useParams } from "react-router-dom"

export default function DataList() {
    const params = useParams();
    const collection = params.gamemode;

    const getGameModeTitle = (mode) => {
        switch (mode) {
            case 'artists':
                return '아티스트';
            case 'albums':
                return '앨범';
            case 'tracks':
                return '트랙';
            default:
                return null;
        }
    };

    return (
        <section className='@container p-2 md:p-3 lg:p-4'>
            <h2 className='font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2'>
                {getGameModeTitle(collection)} 데이터 목록
            </h2>

        </section>
    )
}