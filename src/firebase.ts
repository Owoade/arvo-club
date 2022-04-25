import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyARyCm6HRzlCmasl_lsknrt5sHYl-TYNLA",
    authDomain: "arvo-club.firebaseapp.com",
    projectId: "arvo-club",
    storageBucket: "arvo-club.appspot.com",
    messagingSenderId: "938727130264",
    appId: "1:938727130264:web:205728a55c4cb3896ebced"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {auth}