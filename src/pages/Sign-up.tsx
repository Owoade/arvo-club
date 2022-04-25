import { Box, Button, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import Logo from "../components/Logo"
import { Link } from "react-router-dom"
import Message from "../components/widgets/Message"
import Loader from "../components/widgets/Loader"
import { useState } from "react"
import {User} from "firebase/auth"
import {useNavigate} from "react-router-dom";
import { emailPasswordSignUp } from "../auth/controllers/emailPassword"
import { createUser, getUser } from "../utils/dbControllers"
import { googleMailAuth } from "../auth/controllers/googleMail"

const SignUp = ()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [fullName,setFullName]=useState("")
    const [message,setMessage]=useState<string| null>(null);
    const [loadingMessage,setLoadingMessage]=useState<string| null>(null);
    const navigate=useNavigate();
    const signUp=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoadingMessage("Please wait create an account for you... ")
        emailPasswordSignUp(email,password,
            function(user:User){
                
                const userData={
                    fullName,
                    email,
                    joinedAt:Date.now()
                }
                createUser(userData,function(){
                setLoadingMessage(null)
                setMessage(`An email has been sent to ${user.email}, kindly check your inbox and sign in`)
                })
            },function(err:Error | string){
                setLoadingMessage(null)
               setMessage(typeof err == "object" ? err.message : err)
            })


    }
    const loginWithGmail=()=>{
        googleMailAuth(
        function(user:User){
            setLoadingMessage("Please wait")
           getUser(user.email || "null",function(userExists:boolean){
               if(!userExists){
                   const userData={
                       email:user.email,
                       fullName:user.displayName,
                       joinedAt:Date.now()
                   }
                   createUser(userData,function(){
                    localStorage.setItem("user-email",user.email || "null");
                    navigate("/dashboard")
                   setLoadingMessage(null)
                   })
                   setLoadingMessage(null)
                   localStorage.setItem("user-email",user.email || "null");
                    navigate("/dashboard")

               }
               localStorage.setItem("user-email",user.email || "null");
                navigate("/dashboard")
           })
        },function(err:Error){
            setMessage(err.message)
        })
    }
    return(
        <Box width="100vw" height="100vh" bgColor="whitesmoke">
            {message && <Message message={message} setMessage={setMessage} />}
            {loadingMessage && <Loader message={loadingMessage} />}
          <Box width={{sm:"500px",base:"100%"}} margin="0 auto"  padding="2em 0">
              <Logo alignCenter={true} />
              <Text textAlign="center">A club management system for arvo finance</Text>
              <Text color="brand.typoAccent"my={3} textAlign="center" fontWeight={"bolder"}>Create an account</Text>
              <Box padding="1em" width={{sm:"300px",base:"90%"}} margin="0 auto" backgroundColor="white" borderRadius="20px" boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"}>
                  <form onSubmit={(e)=> signUp(e)}>
                  <InputGroup my={2}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<i className="ri-user-fill" style={{color:"grey"}}></i>}
                        />
                        <Input isRequired type='text' value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder='Enter your fullname' />
                    </InputGroup>
                  <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<i className="ri-mail-fill" style={{color:"grey"}}></i>}
                        />
                        <Input isRequired type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' />
                    </InputGroup>
                    <InputGroup my={2}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<i className="ri-lock-2-fill" style={{color:"grey"}}></i>}
                        />
                        <Input isRequired type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' />
                    </InputGroup>
                    <Button type="submit" backgroundColor={"brand.accent"} variant="solid" color="white" width="100%" my={3}>Sign up</Button>
                  </form>
                    
                <Button onClick={loginWithGmail} background="brand.accentContrast" width="100%" margin=".5em auto" color="brand.accent" leftIcon={<i className="ri-google-fill"></i>}  variant='solid'>
                   Continue with Google
                </Button>
              </Box>
              <Link to="/" style={{fontWeight:"bolder",textAlign:"center",margin:"2em 0",display:"block",textDecoration:"underline",color:"#515354"}}>already a user? sign in</Link>
              
          </Box>

        </Box>
    )
}
export default SignUp