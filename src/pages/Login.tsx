import { Box, Button, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import Logo from "../components/Logo"
import { Link } from "react-router-dom"
import { useState } from "react"
import {User} from "firebase/auth"
import {emailPasswordSignIn} from "../auth/controllers/emailPassword"
import {useNavigate} from "react-router-dom"
import { createUser, getUser } from "../utils/dbControllers";
import Message from "../components/widgets/Message"
import Loader from "../components/widgets/Loader"
import { googleMailAuth } from "../auth/controllers/googleMail"

const Login = ()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState<string| null>(null);
    const [loadingMessage,setLoadingMessage]=useState<string| null>(null);
    const navigate=useNavigate();

    const signIn=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoadingMessage("Logging in.... ")
        emailPasswordSignIn(email,password,
         function(user:User){
             localStorage.setItem("user-email",user.email || "null")
             setLoadingMessage(null)
             navigate("/dashboard")
        },function(error:Error){
            console.log(error)
            setLoadingMessage(null)
            setMessage(error.message)
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
              <Text textAlign="center">A club management system for everyone 😃</Text>
              <Text color="brand.typoAccent"my={3} textAlign="center" fontWeight={"bolder"}>Sign in to your dashboard</Text>
              <Box padding="1em" width={{sm:"300px",base:"90%"}} margin="0 auto" backgroundColor="white" borderRadius="20px" boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"}>
                  <form onSubmit={(e)=>{signIn(e)}}>
                           <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<i className="ri-mail-fill" style={{color:"grey"}}></i>}
                        />
                        <Input isRequired value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter your email' />
                    </InputGroup>
                    <InputGroup my={2}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<i className="ri-lock-2-fill" style={{color:"grey"}}></i>}
                        />
                        <Input isRequired value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter your password' />
                    </InputGroup>
                    <Button type="submit" backgroundColor={"brand.accent"} variant="solid" color="white" width="100%" my={3}>Login</Button>
                  </form>
               
                <Button onClick={loginWithGmail} background="brand.accentContrast" width="100%" margin=".5em auto" color="brand.accent" leftIcon={<i className="ri-google-fill"></i>}  variant='solid'>
                   Continue with Google
                </Button>
              </Box>
              <Link to="/sign-up" style={{fontWeight:"bolder",textAlign:"center",margin:"2em 0",display:"block",textDecoration:"underline",color:"#515354"}}>not a user? sign up</Link>
              
          </Box>

        </Box>
    )
}
export default Login