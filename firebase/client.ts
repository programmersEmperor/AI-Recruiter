import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoJ21bfuxlzeCxj-Jf5Ly5R_Dq9ojUB6g",
  authDomain: "notification-4d647.firebaseapp.com",
  projectId: "notification-4d647",
  storageBucket: "notification-4d647.firebasestorage.app",
  messagingSenderId: "254904878310",
  appId: "1:254904878310:web:7991a0d43b856dae232727",
  measurementId: "G-1LF681WMFD"
};


// CHECK TO ENSURE ONLY 1 APP IS INITIALIZED
const app = !getApps.length 
        ? initializeApp(firebaseConfig) 
        : getApp()
        
export const auth = getAuth(app);
export const firestore = getFirestore(app);