import { getTechLogos } from "@/lib/utils";
import Image from "next/image";

const DisplayTechStack = async ({techStack}: TechIconProps)=>{
    const techIcons = await getTechLogos(techStack);
    return <div className="flex">
        {
            techIcons.slice(0, 3).map(({tech, url}, index)=>{
                return <div key={tech} className="group bg-dark-300 rounded-full p-2 flex-center">
                    <span className="tech-tooltip">{tech}</span>
                    <Image src={url} className="size-5" alt={tech} width={100} height={100} />
                </div>
            })
        }
    </div>
}

export default DisplayTechStack;