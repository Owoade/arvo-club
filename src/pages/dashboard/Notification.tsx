import { Box, Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import {useState,useEffect} from "react"
import { getNotifications, updateNotification } from "../../utils/dbControllers";
import { Link, useNavigate,useParams } from "react-router-dom";


const Notifications = () => {
    const userEmail=localStorage.getItem("user-email") || "null"
    const [notification,setNotification]=useState<null | {_id:string,title:string,body:string,time:number,read:boolean,payload?:{inviteId?:string}}>(null)
    const {id}=useParams()
    const [refresh,setRefresh]=useState(false)

    useEffect(()=>{
        if(notification==null){
            getNotifications(userEmail,function(clubs:{_id:string,title:string,body:string,time:number,read:boolean,payload?:{inviteId?:string}}[]){
             setNotification(clubs.filter(club=>club._id==id)[0])
             updateNotification({
                 filter:{_id:id},
                 update:{read:true}
             })
            })
        }
     },[notification])
     const navigate=useNavigate();
  return(
      <Box cursor="pointer">
            <Box width="100%" backgroundColor="white">
                <Header refreshFunction={setRefresh} refresh={refresh} />
            </Box>
            <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} padding="1em 0">
               
                    
                      
                      <Box width={{md:"600px",base:"100%"}} padding="2em" height="fit-content" margin="0 auto" backgroundColor={"white"}>
                         {/* Notification */}
                         {
                             notification != null ? <Box   pb={3}>
                             <Text fontSize="21px">{notification.title}</Text>
                            
                                <Text color="brand.typoContrast" my={3}>{`${notification.body}`}</Text>
                                {notification?.payload && <Link to={`/dashboard/invite/${notification?.payload?.inviteId}`} style={{display:"block",color:"#017295",textDecoration:"underline",margin:".5em 0"}}>Invite link</Link>}
                                <Text color="grey" fontSize="10px">{new Date(notification.time).toDateString()}</Text>
                             
                            </Box> 
                           : <Spinner
                            margin={"1em auto"}
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='brand.accentContrast'
                                size='xl'
                            />
                         }
                        

                      </Box>

                    
                
            </Box>
      </Box>
  )
  
};

export default Notifications;
