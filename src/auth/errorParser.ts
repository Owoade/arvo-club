export const errorParser=(error:Error,type:string)=>{
    console.log(error)
    let message=""
   if(type == "firebase-error"){
       if(error.message.includes("Password should be at least 6 characters")){
         message="Password should be at least 6 characters"
       }else if(error.message.includes("(auth/user-not-found)")){
        message="The email provided doesn't exist for any registered user, try signing up 😉"
       }else if(error.message.includes("(auth/wrong-password).")){
        message="The password provided is incorrect 😔"
       }else if(error.message.includes("(auth/email-already-in-use)")){
          message="The provided email is associated with a registered user,try logging in.";
       }
   }

   return { message} 
}