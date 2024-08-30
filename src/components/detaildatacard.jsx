import {formatDate} from '../utils/utils'

//data 읽기 페이지기 사용

export default function DetailDataCard({gameData}){
    
    return (
        <div className="flex flex-col min-h-[22rem] rounded-xl bg-slate-500 text-white p-4">
            {gameData?.id && <p>스포티파이 ID : {gameData.id}</p>}
            {gameData?.type && <p>유형 : {gameData.type}</p>}
            {gameData?.album_type && <p>앨범 유형 : {gameData.album_type}</p>}
            {gameData?.name && <p>이름 : {gameData.name}</p>}
            {gameData?.artist1_id && <p>아티스트1 ID : {gameData.artist1_id}</p>}
            {gameData?.artist1_name && <p>아티스트1 이름 : {gameData.artist1_name}</p>}
            {gameData?.artist2_id && <p>아티스트2 ID : {gameData.artist2_id}</p>}
            {gameData?.artist2_name && <p>아티스트2 이름 : {gameData.artist2_name}</p>}
            {gameData?.artist3_id && <p>아티스트3 ID : {gameData.artist3_id}</p>}
            {gameData?.artist3_name && <p>아티스트3 이름 : {gameData.artist3_name}</p>}
            {gameData?.release_date && <p>발매일 : {gameData.release_date}</p>}
            {gameData?.followers && <p>팔로워 : {gameData.followers}</p>}
            {gameData?.genres && <p>장르 : {gameData.genres.join(', ')}</p>}
            {gameData?.spotifylink && <a href={gameData.spotifylink}>스포티파이에서 열기</a>}
            {gameData?.updatedAt && <p>업데이트 일자 : {formatDate(gameData.updatedAt)}</p>}
        </div>
    )
}