"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import CustomFormField from "./customFormField"
import { useRouter } from "next/navigation"


type Props = {
    type: FormType
}

const authFromSchema = (type: FormType) => {
    const isSignIn = type === 'sign-in';

    return z.object({
        name: isSignIn ? z.string().optional() : z.string().min(3),
        email: z.string().email(),
        password: z.string().min(3)
    })
}

export default function AuthForm({ type } : Props){

    const formSchema = authFromSchema(type);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })
 
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            console.log('name', values.name);
            console.log('email',  values.email);
            console.log('password', values.password);
            
            if(isSignIn){
                toast.success('Sign in successfully')
                router.push('/')
            }
            else {
                toast.success('Account created succssfully. Please sign in')
                router.push('/sign-in')
            }
        }
        
        catch(e){
            console.error(e);
            toast.error(`There was an error: ${e}`)
        }
    }

    const isSignIn = type === 'sign-in';

    return <div>
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100">AI Recuriter</h2>
                </div>
                <h3 className="text-primary-100">Practice Job Interview with AI</h3>
                <Form {...form}>
                    <form className="form space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                        {!isSignIn && (
                            <CustomFormField 
                                control={form.control} 
                                name={'name'} 
                                label="Name" 
                                placeholder="Ex. Peter Griffin" 
                            />
                        )}
                        <CustomFormField 
                            control={form.control} 
                            name={'email'} 
                            label="Email" 
                            placeholder="Enter your email" 
                            type="email"
                        />
                        <CustomFormField 
                            control={form.control} 
                            name={'password'} 
                            label="Password" 
                            placeholder="Enter your password" 
                            type="password"
                        />
                        <Button className="btn" type="submit">{isSignIn? "Sign in": "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? 'No account yet?' : 'Have an account already?'}
                    <Link href={isSignIn? "sign-up": "sign-in"} className="font-bold text-user-primary ms-1">
                        {isSignIn? "Sign up": "Sign in"}
                    </Link>    
                </p>
            </div>
        </div>
    </div>
}