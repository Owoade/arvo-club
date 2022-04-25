import {Box ,Flex,Button, Heading,Text} from "@chakra-ui/react";
import Wrapper from "./Wrapper";
import Logo from "./Logo";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import {getNotifications} from "../utils/dbControllers"

const Header =({refreshFunction,refresh}:{refreshFunction:Function,refresh:boolean})=>{
    const userEmail=localStorage.getItem("user-email") || "null"
    const [notifications,setNotifications]=useState<{read:boolean}[]>([])
    const [isFetched,setIsFetched]=useState(refresh)
    useEffect(()=>{
            getNotifications(userEmail,function(clubs:[]){
             setNotifications(clubs)
            })
     },[isFetched])
    const navigate=useNavigate()
    const sign_out=()=>{
        signOut(getAuth()); 
        // localStorage.clear() 
        navigate('/')
    }
   
  return(
      <Box>
          <Wrapper>
             <Flex width="100%" justifyContent={"space-between"} padding=".8em 0 ">
                <Logo dashboard={true} />
                <Flex width="180px" justifyContent="space-between" position="relative">
                    {notifications?.filter(each => !each.read ).length > 0  && !isFetched && <span style={{width:"15px",position:"absolute",transform:"translateY(1em)",zIndex:3,height:"15px",borderRadius:"50%",backgroundColor:"red",color:"white",fontSize:"12px",display:"flex",justifyContent:"center",alignItems:"center"}}>{notifications?.filter(each => !each.read ).length}</span>}
                <i onClick={()=> navigate('/dashboard/notifications')} className="ri-notification-2-fill" style={{fontSize:"25px",color:"#017295",transform:"translateY(.5em)"}}></i>
                <Button onClick={()=>{sign_out()}} background="brand.accentContrast" width="120px" margin=".5em auto" color="brand.accent" leftIcon={<i className="ri-logout-circle-r-line"></i>}  variant='solid'>
                   Sign out
                </Button>
                </Flex>
             </Flex> 
             
          </Wrapper>
      </Box>
  )
}

export default Header