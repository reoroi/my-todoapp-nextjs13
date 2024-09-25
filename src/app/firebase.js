import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: 'AIzaSyC1oP5ofKj-wOHN0JRiQcMn7BGLflmBYzI', //ここも環境変数ではgetAuth(app)がエラーになる
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: 'my-todoapp-nextjs13', // ここが環境変数にできない
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MESASUREMENTID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth =getAuth(app)



