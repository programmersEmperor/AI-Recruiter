'use server'; 

import { db, auth } from "../../../firebase/admin";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7; 

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
    catch(e){
        console.error('Error Creating User', e);
        return {
            success: false,
            message: (e as Error).message
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: SESSION_DURATION * 1000,
    });


    cookieStore.set('session', sessionCookie, {
        maxAge: SESSION_DURATION,
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
        
    } catch (e) {
        console.error('Error Sign In User', e);
        return {
            success: false,
            message: (e as Error).message
        }
    }
}

export async function getCurrentUser() : Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;
        
        if(!session){
            return null;
        }

        const decodedClaims = await auth.verifySessionCookie(session, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();


        if (!userRecord.exists) {
            return null;
        }
        
        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User
        



    } catch(e) {
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}