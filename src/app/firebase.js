import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1oP5ofKj-wOHN0JRiQcMn7BGLflmBYzI",
  authDomain: "my-todoapp-nextjs13.firebaseapp.com",
  projectId: "my-todoapp-nextjs13",
  storageBucket: "my-todoapp-nextjs13.appspot.com",
  messagingSenderId: "1075944323462",
  appId: "1:1075944323462:web:77a5dc43e67dace99b9407",
  measurementId: "G-V9SD741GM1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

export default db