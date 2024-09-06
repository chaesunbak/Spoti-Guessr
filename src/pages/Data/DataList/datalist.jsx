import { useParams } from 'react-router-dom';
import { translateToKorean } from '../../../lib/utils';

export default function DataList() {
  const params = useParams();
  const { gamemode } = params;

  return (
    <section className="@container p-2 md:p-3 lg:p-4">
      <h2 className="font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2">
        {translateToKorean(gamemode)} 데이터 목록
      </h2>
    </section>
  );
}
