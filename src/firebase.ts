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
  // const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_FB_API_KEY,
  //   authDomain:process.env.REACT_APP_FB_AUTH_DOMAIN ,
  //   projectId: process.env.REACT_APP_FB_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  //   messagingSenderId:process.env.REACT_APP_FB_SENDER_ID,
  //   appId: process.env.REACT_APP_FB_APP_ID
  // };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {auth}