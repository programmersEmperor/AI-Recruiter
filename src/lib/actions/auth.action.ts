'use server'; 

import { FirebaseError } from "firebase/app";
import { db, auth } from "../../../firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; 

export async function signUp ({uid, email, name}: SignUpParams){
    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists. Please sign in instead'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: "Account created succssfully"
        }
    }
    catch(e: any){
        console.error('Error Creating User', e);
        return {
            success: false,
            message: e.message
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK
    });


    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        sameSite: 'lax'
    })
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(! userRecord) {
            return {
                success: false,
                message: "User does not exists"
            }
        }

        await setSessionCookie(idToken);
        return {
            success: true,
            message: "Sign in successfully"
        }
        
    } catch (e: any) {
        console.error('Error Sign In User', e);
        return {
            success: false,
            message: e.message
        }
    }
}