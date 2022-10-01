import { Box, Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import {useState,useEffect} from "react"
import { getNotifications } from "../../utils/dbControllers";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const userEmail=localStorage.getItem("user-email") || "null"
    const [notifications,setNotifications]=useState<null | []>(null)
    const [refresh,setRefresh]=useState(false)

    useEffect(()=>{
        if(notifications==null){
            getNotifications(userEmail,function(clubs:[]){
             setNotifications(clubs)
            })
        }
     },[notifications])
     const navigate=useNavigate();
  return(
      <Box>
            <Box width="100%" backgroundColor="white">
                <Header refreshFunction={setRefresh} refresh={refresh} />
            </Box>
            <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} padding="1em 0">
               
                    
                      
                      <Box width={{md:"600px",base:"100%"}} padding="2em" height="fit-content" margin="0 auto" backgroundColor={"white"}>
                         {/* Notification */}
                         {
                             notifications != null ? notifications.length != 0 ? notifications.map((notification:{title:string,body:string,time:number,read:boolean,_id:string}) =>( <Box cursor="pointer" onClick={()=> navigate(`/dashboard/notification/${notification._id}`)} fontWeight={notification.read ? "": "bolder"} pb={3} borderBottom="1px solid whitesmoke">
                             <Text fontSize="21px">{notification.title}</Text>
                             <Flex width="100%" justifyContent={"space-between"}>
                                <Text color="brand.typoContrast">{`${notification.body.substring(0,50)}...`}</Text>
                                {/* <Flex my={3} width="160px" justifyContent={"space-between"}>
                                    <Button width="70px" fontSize={"12px"} color={"brand.accentContrast"} backgroundColor={"brand.accent"}>Accept</Button>
                                    <Button width="70px" fontSize={"12px"} color={"brand.accent"} backgroundColor={"brand.accentContrast"}>Decline</Button>
                                </Flex> */}
                                <Text color="grey" mr={{xs:0,base:2}} fontSize="10px">{new Date(notification.time).toDateString()}</Text>
                             </Flex>
                             
                         </Box>)) : <span>No notifications yet</span> : <Spinner
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
