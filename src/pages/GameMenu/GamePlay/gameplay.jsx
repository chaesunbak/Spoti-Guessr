import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PlayCard from "../../../components/playcard";
import { db } from '../../../firebase/firebase';
import getRandomNumber from "../../../utils/getRandomNumber";
import { useState, useEffect } from "react";


export default function GamePlay() {
    const [gameData, setGameData] = useState([{},{}]); /* gameData1과 gameData2를 배열에 저장 */
    const [round, setRound] = useState(1); /* 게임 라운드, 시작시 1 게임진행시마다 1증가 */
    const [gameLog, setGameLog] = useState([]);
    const params = useParams();

    const genre = params.genre; /* all, pop, k-pop 등등 */

    async function getRandomDataFromAll() {
        const collectionRef = params.gamemode; /* artsits, albums, tracks 중 1 */
        const randomNum = getRandomNumber(0, 9999);

        let found = false;
        let attempt = 0;

        console.log(`${round}번째 라운드 입니다.`)
        console.log(`랜덤한 숫자는 ${randomNum}`);

        while (!found) {
            try {
                console.log(`${attempt}번째 시도 입니다.`)
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
        let randomNum = getRandomNumber(0, 9999);

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
            const dataObj2 = await getRandomDataFromAll();
            setGameData([dataObj1, dataObj2]);
        }
        else  {
            const dataObj1 = await getRandomDataFromGenre();
            const dataObj2 = await getRandomDataFromGenre();
            setGameData([dataObj1, dataObj2]);
        }

    }
    useEffect(() => {
        getTwoRandomData();
    },[round])

    /* 인기도 같은 경우 로직 추가할것 */
    function checkAnswer(selectedIndex) {
        const otherIndex = selectedIndex === 0 ? 1 : 0; // 다른 카드의 인덱스
        let newGameLog = [...gameLog];

        if (gameData[selectedIndex].popularity > gameData[otherIndex].popularity) {
            console.log("성공! 선택한 카드가 더 인기 있습니다.");
            newGameLog.push('O');
        } else {
            console.log("실패! 다른 카드가 더 인기 있습니다.");
            newGameLog.push('X');
        }
        setGameLog(newGameLog);
        setRound(round + 1); /* 라운드가 바뀌면 useEffect 의존성에 의해 새 데이터가 불러와짐 */
    }

    return (
        <section id={params.gamemode} className="h-screen @container">
            <div className="flex">
                <h2 className='font-bold text-neutral-700 text-xl @md:text-2xl @lg:text-5xl mb-2'>
                    스포티파이에서<br />어느 앨범이 더 인기있을까요? ({genre}) 
                </h2>
                <div>
                    라운드 : {round}
                    로그: {gameLog.join(' ')}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mx-auto">
                {gameData.map((data, index) => (
                    <PlayCard key={index} gameData={data} onClick={() => checkAnswer(index)} />
                ))}
            </div>
        </section>
    );
}
