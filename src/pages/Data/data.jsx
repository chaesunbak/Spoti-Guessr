import PlayCard from "../../components/playcard"
import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";

export default function Data() {
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
            }
        }

        fetchData();
    }, [gamemode, id]);

    return (
        <>
            <h2 className='font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2'>
                정보
            </h2>
            <div>
                <PlayCard gameData={data}/>
            </div>
        </>
    )
}