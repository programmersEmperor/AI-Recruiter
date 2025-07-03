import dayjs from 'dayjs'
import Image from 'next/image';

const InterviewCard = ({
    interviewId, 
    userId,
    role,
    techstack,
    type,
    createdAt
}: InterviewCardProps)=>{
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed': type;
    
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')

    return <div className='card-border w-[360px] min-h-96 max-sm:w-full '>
        <div className="card-interview">
            <div className="">
                <div className="absolute top-0 start-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className='badge-text'>{normalizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} className='rounded-full object-fit size-[90px]' alt="interview cover" width={90} height={90}  />
            </div>
        </div>
    </div>
}

export default InterviewCard;