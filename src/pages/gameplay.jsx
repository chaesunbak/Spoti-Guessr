import { collection, query, where, getDocs, orderBy, limit, QuerySnapshot } from "firebase/firestore";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useParams } from "react-router-dom";
import PlayCard from "../components/playcard";
import { Button } from "../components/ui/button";
import { db } from '../firebase/firebase';
import getRandomNumber from "../utils/getRandomNumber";
import { useState } from "react";


export default function GamePlay() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameData1, setGameData1] = useState('');
    const [gameData2, setGameData2] = useState('');
    const params = useParams();

    const genre = params.genre; /* all, pop, k-pop 등등 */

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

    async function getRandomDataFromGenre() {
        const collectionRef = params.gamemode; /* artsits, albums, tracks 중 1 */
        const randomNum = getRandomNumber(0, 9999);
        let found = false;
        let attempt = 0;

        while (!found) {
            try {
                let querySnapshot;
                if (attempt % 2 === 0) {
                    const q1 = query(collection(db, collectionRef), where("genres", "array-contains", genre), where("randomNum1", "<=", randomNum), orderBy("randomNum1", 'desc'), limit(1));
                    querySnapshot = await getDocs(q1);
                } else {
                    const q2 = query(collection(db, collectionRef), where("genres", "array-contains", genre), where("randomNum1", ">=", randomNum), orderBy("randomNum1", 'asc'), limit(1));
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

        if (genre == "all") {
            const dataObj1 = await getRandomDataFromAll();
            setGameData1(dataObj1);

            const dataObj2 = await getRandomDataFromAll();
            setGameData2(dataObj2);
        }
        else  {
            const dataObj1 = await getRandomDataFromGenre();
            setGameData1(dataObj1);

            const dataObj2 = await getRandomDataFromGenre();
            setGameData2(dataObj2);
        }

    }

    const Game = () => {
        return (
            <div className="grid grid-cols-2 gap-8 mx-auto">
                <PlayCard gameData={gameData1} />
                <PlayCard gameData={gameData2} />
            </div>
        )
    }

    const BeforeStart = () => {
        return (
            <Card className="w-[400px] m-auto">
                <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                    <Button className="w-full" onClick={()=>{getTwoRandomData();setIsPlaying(true)}}>시작하기</Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <section id={params.gamemode} className="h-screen">
            <h2 className='font-bold text-5xl lg:text-6xl my-2'>{params.gamemode} : {params.genre}</h2>
            {isPlaying ? <Game/> : <BeforeStart/>}
        </section>
    );
}
