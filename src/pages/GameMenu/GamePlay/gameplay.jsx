import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useParams } from "react-router-dom";
import PlayCard from "../../../components/playcard";
import { db } from '../../../firebase/firebase';
import getRandomNumber from "../../../utils/getRandomNumber";
import { useState, useEffect } from "react";
import useShowToast from '../../../hooks/useShowToast';
import setDelay from '../../../utils/setDelay';
import SpotifyLogo from '../../../assets/Spotify_Logo_RGB_Green.png';
import SpotifyIcon from '../../../assets/Spotify_Icon_RGB_Green.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1 } from "@fortawesome/free-solid-svg-icons";

export default function GamePlay() {
    const [gameData, setGameData] = useState([{},{}]); /* gameData1과 gameData2를 배열에 저장 */
    const [round, setRound] = useState(1); /* 게임 라운드, 시작시 1 게임진행시마다 1증가 */
    const [gameLog, setGameLog] = useState([]);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
    const showToast = useShowToast();
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
                showToast(error, error.message);
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
                showToast(error, error.message);
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
                {gameData.map((data, index) => (
                    <PlayCard
                        key={index}
                        gameData={data}
                        onClick={() => {
                            if (!isCheckingAnswer) {
                                checkAnswer(index);
                            }
                        }}
                        isCheckingAnswer={isCheckingAnswer}
                    />
                ))}
            </div>
        </section>
    );
}
