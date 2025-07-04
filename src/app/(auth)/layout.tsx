import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}

export default async function AuthLayout({children}: Props){
    const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated){
        redirect('/');
    }
    
    return <div className="auth-layout">{children}</div>
}