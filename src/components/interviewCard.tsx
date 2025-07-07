import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs'
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechStack from './displayTechStack';

const InterviewCard = ({
    id, 
    userId,
    role,
    techstack,
    type,
    createdAt
}: InterviewCardProps)=>{
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed': type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')

    console.log('userId', userId);

    return <div className='card-border w-[360px] min-h-96 max-sm:w-full '>
        <div className="card-interview">
            <div className="">
                <div className="absolute top-0 end-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className='badge-text'>{normalizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} className='rounded-full object-fit size-[90px]' alt="interview cover" width={90} height={90}  />
                <h3 className='capitalize mt-5'>
                    {role} Interview
                </h3>
                <div className="flex gap-5 mt-3 ">
                    <div className="flex gap-2">
                        <Image src="/calendar.svg" alt="Calendar" width={22} height={22} />
                        <p>{formattedDate}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image src="/star.svg" alt="Star" width={22} height={22} />
                        <p>{feedback?.totalScore || '___'}/100</p>
                    </div>
                </div>
                <p className='line-clamp-2 mt-5'>
                    {feedback?.finalAssessment || 'You havn&apos;t taken the interview yet. Take it now to imporve your skills'}
                </p>
            </div>
            <div className="flex justify-between">
                <DisplayTechStack techStack={techstack}/>
                <Button className='btn-primary'>
                    <Link href={
                        feedback 
                        ? `/interview/${id}/feedback` 
                        : `/interview/${id}`
                    }>
                        {
                            feedback
                            ? `Check Feedback`
                            : `Start Interview`
                        }
                    </Link>
                </Button>
            </div>
        </div>
    </div>
}

export default InterviewCard;