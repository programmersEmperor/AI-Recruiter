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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"



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
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
             
            if(isSignIn){
                const { email, password } = values;
                const userCridentionals = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCridentionals.user.getIdToken();
                
                if(!idToken) {
                    toast.error('Sign in failed');
                    return;
                }

                const result = await signIn({
                    idToken: idToken,
                    email
                });

                if(result.success){
                    toast.success(result.message)
                    router.push('/')
                }
                else {
                    toast.error(result.message)
                }
                
            }
            else {
                const { name, email, password } = values;
                const userCridentionals = await createUserWithEmailAndPassword(auth, email, password);
                const result = await signUp({
                    uid: userCridentionals.user.uid,
                    email: email,
                    name: name!,
                    password: password
                }) 

                if(result.success){
                    toast.success(`${result.message}. Please sign in`)
                    router.push('/sign-in')
                }
                else {
                    toast.error(result.message);
                }

                
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