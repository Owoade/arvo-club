import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import {useState,useEffect} from "react"
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { createMember, createNotification, getInvite, updateInvite } from "../../utils/dbControllers";
const Invite = () => {
    const {id}=useParams()
    const [refresh,setRefresh]=useState(false)

    const [invite,setInvite]=useState<null | {status:string,from:string,_id:string,ownedBy:string}>(null)
    useEffect(function(){
         if(invite == null){
             getInvite(id || "null",function(invites:[{status:string,from:string,_id:string,ownedBy:string}]){
                 setInvite(invites[0])
             })
         }
    },[invite])
    if(invite == null ) {
        return (
            <Box width="100%">
                <Spinner
       margin={"1em auto"}
           thickness='4px'
           speed='0.65s'
           emptyColor='gray.200'
           color='brand.accentContrast'
           size='xl'
       /> 
            </Box>
       )
    }
    function decide(type:string){
        const userEmail=localStorage.getItem("user-email") || "null"
        if(type=="accepted"){
            const memberData={
                email:userEmail,
                clubName:invite?.from,
                joinedAt:Date.now()
            }
            createMember(memberData)
            const notificationData={
                to:invite?.ownedBy,
                title:`Invite accepted`,
                body:`Congratulations, ${userEmail} has accepted your invite to join ${invite?.from}`,
                type:"accetance message",
                read:false,
                time: Date.now()
            }
            createNotification(notificationData,function(){
                console.log(null)
            })
        }
        updateInvite({
            filter:{
                _id:id
            },
            update:{
                status:type
            }
        },function(){
          setInvite(null)
        })

    }
    if(invite.status=="accepted"){
        return(

            <Box>
              <Box width="100%" backgroundColor="white">
                      <Header refreshFunction={setRefresh} refresh={refresh} />
              </Box>
              <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} textAlign="center" padding="1em 0">
                  <Box width={{sm:"400px",base:"90%"}} boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"} borderRadius={"20px"} padding="2em" backgroundColor={"white"} margin="1em auto">
                  <Text fontSize="21px">You have accepted this invite </Text>
        
                  </Box>
              </Box>    
            </Box>
        )
    }
    if(invite.status=="declined"){
        return(

            <Box>
              <Box width="100%" backgroundColor="white">
                      <Header refreshFunction={setRefresh} refresh={refresh} />
              </Box>
              <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} textAlign="center" padding="1em 0">
                  <Box width={{sm:"400px",base:"90%"}} boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"} borderRadius={"20px"} padding="2em" backgroundColor={"white"} margin="1em auto">
                  <Text fontSize="21px">You have declined this invite </Text>
        
                  </Box>
              </Box>    
            </Box>
        )
    }
    if(invite.status=="revoked"){
        return(

            <Box>
              <Box width="100%" backgroundColor="white">
                      <Header refreshFunction={setRefresh} refresh={refresh} />
              </Box>
              <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} textAlign="center" padding="1em 0">
                  <Box width={{sm:"400px",base:"90%"}} boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"} borderRadius={"20px"} padding="2em" backgroundColor={"white"} margin="1em auto">
                  <Text fontSize="21px">This invite has been revoked by th owner</Text>
        
                  </Box>
              </Box>    
            </Box>
        )
    }
  return(

      <Box>
        <Box width="100%" backgroundColor="white">
                <Header refreshFunction={setRefresh} refresh={refresh} />
        </Box>
        <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} textAlign="center" padding="1em 0">
            <Box width={{sm:"400px",base:"90%"}} boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"} borderRadius={"20px"} padding="2em" backgroundColor={"white"} margin="1em auto">
            <Text fontSize="21px">{`An Invite from ${invite.from}`} </Text>
            <Text my={4} color="brand.typoContrast">You have been invited to join the above club, Accept or Decline</Text>
            <Flex my={3} mx="auto" width="160px" justifyContent={"space-between"}>
                <Button onClick={()=>decide("accepted")} width="70px" fontSize={"12px"} color={"brand.accentContrast"} backgroundColor={"brand.accent"}>Accept</Button>
                <Button onClick={()=>decide("declined")} width="70px" fontSize={"12px"} color={"brand.accent"} backgroundColor={"brand.accentContrast"}>Decline</Button>
            </Flex>
            </Box>
        </Box>    
      </Box>
  )
};

export default Invite;
