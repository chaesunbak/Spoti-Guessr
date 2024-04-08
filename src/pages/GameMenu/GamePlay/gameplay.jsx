import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PlayCard from "./playcard";
import { db } from '../../../firebase/firebase';
import getRandomNumber from "../../../utils/getRandomNumber";
import { useState, useEffect } from "react";
import setDelay from '../../../utils/setDelay';
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"

export default function GamePlay() {
    const [gameData, setGameData] = useState([{},{}]); /* gameData1과 gameData2를 배열에 저장 */
    const [round, setRound] = useState(1); /* 게임 라운드, 시작시 1 게임진행시마다 1증가 */
    const [gameLog, setGameLog] = useState([]);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { toast } = useToast()
    const params = useParams();

    const gamemode = params.gamemode;
    const genre = params.genre; /* all, pop, k-pop 등등 */

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

    async function getRandomDataFromAll(toast) {
        const gamemode = params.gamemode;
        const randomNum = getRandomNumber(0, 9999);

        const randomNum2 = Math.floor(Math.random() * 3);
        const values = ["randomNum1", "randomNum3", "randomNum2"];
        let randomNumIndex = values[randomNum2];


        let querySnapshot;
        try {
            const q1 = query(collection(db, gamemode), where(randomNumIndex, ">=", randomNum), orderBy(randomNumIndex, 'asc'), limit(1));
            querySnapshot = await getDocs(q1)

            if(querySnapshot.empty) {
                const q2 = query(collection(db, gamemode), where(randomNumIndex, "<=", randomNum), orderBy(randomNumIndex, 'desc'), limit(1));
                querySnapshot = await getDocs(q2);
            }

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return doc.data();
            }
            } catch (error) {
                toast({
                    title: '❗ 음..뭔가 잘못되었습니다.',
                    description: error.message,
                });
            }
        }

    async function getRandomDataFromGenre(toast) {
        const gamemode = params.gamemode;
        const genre = params.genre;
        const randomNum = getRandomNumber(0, 9999);

        const randomNum2 = Math.floor(Math.random() * 3);
        const values = ["randomNum1", "randomNum3", "randomNum2"];
        let randomNumIndex = values[randomNum2];

        let querySnapshot;

        try {
            const q1 = query(collection(db, gamemode), where("genres", "array-contains", genre), where(randomNumIndex, ">=", randomNum), orderBy(randomNumIndex, 'asc'), limit(1));
            querySnapshot = await getDocs(q1);

            if(querySnapshot.empty) {
                const q2 = query(collection(db, gamemode), where("genres", "array-contains", genre), where(randomNumIndex, "<=", randomNum), orderBy(randomNumIndex, 'desc'), limit(1));
                querySnapshot = await getDocs(q2);
            }

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return doc.data();
            }
            } catch (error) {
                toast({
                    title: '❗ 음..뭔가 잘못되었습니다.',
                    description: error.message,
                });
            }
        }

    async function getTwoRandomData(toast) {
        let dataObj1, dataObj2;
    
        if (genre == "all") {
            dataObj1 = await getRandomDataFromAll(toast);
            do {
                dataObj2 = await getRandomDataFromAll(toast);
            } while (dataObj1.id === dataObj2.id);
        } else {
            dataObj1 = await getRandomDataFromGenre(toast);
            do {
                dataObj2 = await getRandomDataFromGenre(toast);
            } while (dataObj1.id === dataObj2.id);
        }
    
        setGameData([dataObj1, dataObj2]);
    }

    useEffect(() => {
        getTwoRandomData(toast);
    },[round])

    async function checkAnswer(selectedIndex) {
        setIsCheckingAnswer(true);
        await setDelay(3500);
        const otherIndex = selectedIndex === 0 ? 1 : 0; // 다른 카드의 인덱스
        let newGameLog = [...gameLog];
        if (gameData[selectedIndex].popularity >= gameData[otherIndex].popularity) {
            console.log("성공! 선택한 카드가 더 인기 있습니다.");
            newGameLog.push('O');
        } else {
            console.log("실패! 다른 카드가 더 인기 있습니다.");
            newGameLog.push('X');
        }
        setGameLog(newGameLog);
        setIsCheckingAnswer(false);
        setRound(round + 1); /* 라운드가 바뀌면 useEffect 의존성에 의해 새 데이터가 불러와짐 */
    }

    let strike = 0;
    for (let i = gameLog.length - 1; i >= 0; i--) {
      if (gameLog[i] === "O") {
        strike++;
      } else {
        break;
      }
    }   

    return (
        <section id={params.gamemode} className="h-screen flex flex-col p-2 md:p-3 lg:p-4">
            <div className="flex h-[1/10] flex-col md:grid md:grid-cols-2 my-1 gap-2 md:gap-4 lg:gap-6 xl:gap-8 ">
                <h2 className='text-neutral-700 font-bold text-base md:text-xl lg:text-3xl'>
                    스포티파이에서<br />어느 {getGameModeTitle(gamemode)} 더 인기있을까요? ({genre})
                </h2>
                <div className="w-full grid grid-cols-5 grid-rows-2 size-fit text-neutral-700 text-sm md:text-base lg:text-lg p-1 md:p-2 lg:p-3">
                    <div>라운드</div>
                    <div className="col-span-3">최근</div>
                    <div>연속</div>
                    <div className="font-light">{round}</div>
                    <div className="col-span-3 font-light">{gameLog.slice(Math.max(gameLog.length - 10, 0)).join(' ')}</div>{/* 최근 10개만 보여줌 */}
                    <div className="font-light">{strike}</div>
                </div>
            </div>
            <div className="flex h-full gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            {gameData.map((data, index) => {

                const isWinner = gameData[0].popularity === gameData[1].popularity ? true : gameData[0].popularity > gameData[1].popularity ? (index === 0) : (index === 1);

                return (
                    <PlayCard
                        key={index}
                        gameData={data}
                        winner={isWinner} // 여기에서 계산된 winner 값을 전달
                        onClick={() => {
                            if (!isCheckingAnswer) {
                                checkAnswer(index);
                            }
                        }}
                        isCheckingAnswer={isCheckingAnswer}
                    />
                );
            })}
            </div>
        </section>
    );
}
