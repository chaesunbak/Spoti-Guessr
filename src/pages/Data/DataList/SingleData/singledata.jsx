import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase/firebase';
import PlayCard from '../../../GameMenu/GamePlay/playcard';
import DetailDataCard from '../../../../components/detaildatacard';
import PlayCardSkeletion from '../../../../components/playcardskeletion';
import { translateToKorean } from '../../../../lib/utils';
import CommentSection from '../../../../components/comments/commentsection';

export default function SingleData() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const params = useParams();
  const { gamemode, id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (gamemode, id, setData, setLoading, navigate) => {
      setLoading(true);
      const docRef = doc(db, gamemode, id);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setData(docSnap.data());
        } else {
          console.log('No such document!');

          if (window.confirm('문서가 존재하지 않습니다. 이전 페이지로 돌아가시겠습니까?')) {
            navigate(-1);
          }
        }
      } catch (e) {
        console.error('Error getting document:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData(gamemode, id, setData, setLoading, navigate);
  }, [gamemode, id, navigate]);

  if (loading) {
    return (
      <section className="@container p-2 md:p-3 lg:p-4 ">
        <h2 className="font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2">
          {translateToKorean(gamemode)} 정보
        </h2>
        <PlayCardSkeletion />

        {/* 디테일데이터 카드 스켈레톤 추가 */}

        {/* 코멘트 섹션 스켈레톤 추가 */}
      </section>
    );
  }

  return (
    <section className="@container p-2 md:p-3 lg:p-4 min-h-screen overflow-scroll">
      <h2 className="font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2">
        {translateToKorean(gamemode)} 정보
      </h2>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 lg:gap-4">
        <PlayCard gameData={data} />

        <DetailDataCard gameData={data} />

        <CommentSection />
      </div>
    </section>
  );
}
