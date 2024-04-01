import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import Box from '../../components/box';

export default function GameMenu() {

    const params = useParams();
    const gamemode = params.gamemode;

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

    const title = getGameModeTitle(gamemode);

    if (!title) {
        return <Navigate to="/" replace />;
    }

    return (
        <section id={params.gamemode} className='@container p-2 md:p-3 lg:p-4'>
            <h2 className='font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2'>
                게임모드 : {title}
            </h2>
            <div className='size-full grid gap-4 grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @3xl:grid-cols-5 @5xl:grid-cols-6'>
                < Box title="모두" link="all" bgColor="bg-indigo-500"/>
                < Box title="팝" link="pop" bgColor="bg-pink-500"/>
                < Box title='케이팝' link="k-pop" bgColor="bg-fuchsia-500" />
                < Box title="케이팝 걸 그룹" link='k-pop girl group' bgColor="bg-purple-500"/>
                < Box title="케이팝 보이 그룹" link="k-pop boy group" bgColor="bg-blue-500"/>
                < Box title="클래식 한국 팝" link="classic k-pop" bgColor="bg-sky-500"/>
                < Box title="힙합" link="hip-hop" bgColor="bg-rose-500"/>
                < Box title="한국 힙합" link="k-rap" bgColor="bg-emerald-500"/>
                < Box title="록" link="rock" bgColor="bg-green-500"/>
                < Box title="클래식 록" link="classic rock" bgColor="bg-lime-500"/>
                < Box title="한국 인디" link="k-indie" bgColor="bg-cyan-500"/>
                < Box title="트로트" link="trot" bgColor="bg-teal-500"/>
            </div>
        </section>
    )
}