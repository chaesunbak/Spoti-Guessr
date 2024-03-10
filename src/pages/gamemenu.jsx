import { useParams } from 'react-router-dom';
import Box from '../components/box';

export default function GameMenu() {

    const params = useParams();

    return (
        <section id={params.gamemode} className='@container'>
            <h2>{params.gamemode}</h2>
            <div className='size-full grid gap-4 grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @3xl:grid-cols-5 @5xl:grid-cols-6'>
                < Box title="모두"/>
                < Box title="록"/>
                < Box title="모던록"/>
                < Box title="메탈&하드코어"/>
                < Box title="랩&힙합"/>
                < Box title="알앤비&소울"/>
                < Box title="팝"/>
                < Box title="케이팝"/>
                < Box title="일렉트로닉"/>
                < Box title="포크"/>
                < Box title="재즈"/>
                < Box />
                < Box />
                < Box />
                < Box />
                < Box />
                < Box />
                < Box />
                < Box />
                < Box />
            </div>
        </section>
    )
}