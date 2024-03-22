import { collection, query, where, getDocs, orderBy, limit, QuerySnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PlayCard from "../components/playcard";
import { Button } from "../components/ui/button";
import { db } from '../firebase/firebase';
import getRandomNumber from "../utils/getRandomNumber";
import { useState } from "react";



export default function GamePlay() {
    const [gameData1, setGameData1] = useState('');
    const [gameData2, setGameData2] = useState('');
    const params = useParams();

     
    const genre = params.genre;

    // const q = query(citiesRef, where("genre", "array-contains", genre));

    async function getRandomDataFromAll() {
        const collectionRef = params.gamemode; /* artsits, albums, tracks 중 1 */
        const randomNum = getRandomNumber(0, 9999);
        let found = false;
        let attempt = 0;

        while (!found) {
            try {
                let querySnapshot;
                if (attempt % 2 === 0) {
                    const q1 = query(collection(db, collectionRef), where("randomNum1", "<=", randomNum), orderBy("randomNum1", 'desc'), limit(1));
                    querySnapshot = await getDocs(q1);
                } else {
                    const q2 = query(collection(db, collectionRef), where("randomNum1", ">=", randomNum), orderBy("randomNum1", 'asc'), limit(1));
                    querySnapshot = await getDocs(q2);
                }
    
                if (!querySnapshot.empty) {
                    found = true;
                    let dataObj;
                    querySnapshot.forEach((doc) => {
                        dataObj = doc.data();
                        console.log(dataObj);
                    });
                    return dataObj;
                }
                attempt++;
            } catch (error) {
                console.error("쿼리 중 오류 발생:", error);
                break;
            }
        }
    }

    async function getTwoRandomData() {
        const dataObj1 = await getRandomDataFromAll();
        setGameData1(dataObj1);

        const dataObj2 = await getRandomDataFromAll();
        setGameData2(dataObj2);
    }


    return (
        <section id={params.gamemode} className="h-screen">
            <h2 className="text-xl">{params.gamemode} : {params.genre}</h2>
            <Button onClick={getTwoRandomData}>시작하기</Button>
            <div className="grid grid-cols-2 gap-4 mx-auto">
                <PlayCard gameData={gameData1} />
                <PlayCard gameData={gameData2} />
            </div>
        </section>
    );
}
