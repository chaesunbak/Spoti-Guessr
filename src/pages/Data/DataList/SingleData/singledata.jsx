import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import PlayCard from "../../../GameMenu/GamePlay/playcard";

export default function SingleData() {
    const [data, setData] = useState();
    const params = useParams();

    const gamemode = params.gamemode;
    const id = params.id;

    useEffect(() => {

        async function fetchData() {
            const docRef = doc(db, gamemode, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setData(docSnap.data());
            } else {
                console.log("No such document!");

                if (window.confirm("문서가 존재하지 않습니다. 이전 페이지로 돌아가시겠습니까?")) {
                    navigate(-1);
                }
            }
        }

        fetchData();
    }, [id]);

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
        <section className="@container p-2 md:p-3 lg:p-4">
            <h2 className='font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2'>
                {getGameModeTitle(gamemode)} 정보
            </h2>
            <div className="grid grid-cols-3">
                {/* <div className='w-full max-h-96 aspect-square relative flex items-center justify-center'>
                    <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full rounded-md shadow-md md:shadow-lg" src={data.image} alt={data.name} />
                </div>
                <div>
                    {data.name}
                </div> */}
                <PlayCard gameData={data}/>
            </div>
        </section>
    )
}