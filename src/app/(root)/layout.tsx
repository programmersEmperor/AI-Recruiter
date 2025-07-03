import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const rootLayout = ({children} : Props)=>{
    return <div className="root-layout">
        <nav>
            <Link href="/" className="flex items-center gap-2">
                <Image src={'/logo.svg'} alt="AI-Recruiter Logo" width={38} height={32} />
                <h2 className="text-primary-100">AI Recruiter</h2>
            </Link>
        </nav>
        {children}
    </div>
}

export default rootLayout;