import {auth} from "../../firebase";
import {signInWithPopup,GoogleAuthProvider} from "firebase/auth"

export function googleMailAuth(successCallback:Function,errorCallback:Function){
    const provider = new GoogleAuthProvider() 
    signInWithPopup(auth,provider)
    .then((userCredentail)=>{
        const user= userCredentail.user
        successCallback(user)
    })
    .catch((error:Error)=>{
        errorCallback(error.message)
    })
    
}