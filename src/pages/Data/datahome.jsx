import { Link } from "react-router-dom"

export default function DataHome() {
    return (
        <section className='@container p-2 md:p-3 lg:p-4'>
            <h2 className='font-bold text-neutral-700 text-3xl @md:text-5xl @lg:text-6xl mb-2'>
                데이터 살펴보기
            </h2>
            <Link to='artists'>아티스트 목록</Link>
            <Link to='albums'>앨범 목록</Link>
            <Link to='tracks'>트랙 목록</Link>
        </section>
    )
}