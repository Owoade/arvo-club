import {auth} from "../../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import { errorParser } from "../errorParser";

export const emailPasswordSignIn=(email:string,password:string,successCallback:Function,errorCallback:Function)=>{
   signInWithEmailAndPassword(auth,email,password)
   .then((userCredentials)=>{ 
    if(!userCredentials.user.emailVerified){
        sendEmailVerification(userCredentials.user)
          errorCallback({message:`This email is not verified, an email has been sent to ${userCredentials.user.email}, kindly check your inbox to verify your email then you can sign in`})
          return
      }
       successCallback(userCredentials.user)
    })
   .catch(err=>errorCallback(errorParser(err,"firebase-error")) )
}

export const  emailPasswordSignUp = (email:string, password:string,successCallback:Function, errorCallback:Function)=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
        sendEmailVerification(userCredentials.user)
        successCallback(userCredentials.user)
    }).catch(err=> errorCallback(errorParser(err,"firebase-error")))
 }
 