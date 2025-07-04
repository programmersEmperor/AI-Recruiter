'use server'; 

import { FirebaseError } from "firebase/app";
import { db } from "../../../firebase/admin";


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
        const firebaseError = e as FirebaseError;
        console.error('Error Creating User', firebaseError);
        return {
            success: false,
            message: e.message
        }
    }
}