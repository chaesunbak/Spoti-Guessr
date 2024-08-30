export default function PlayCardSkeletion() {
    return (
        <div className="flex flex-col md:grid md:grid-cols-3">
        <div className='w-full max-h-96 aspect-square relative flex items-center justify-center'>
            <div className="animate-pulse w-full h-full bg-neutral-200 rounded-md"></div>
        </div>
        <div className='animate-pulse w-full h-8 bg-neutral-200 rounded-md'></div>
        <div className='animate-pulse w-full h-8 bg-neutral-200 rounded-md'></div>
    </div>
    )
}