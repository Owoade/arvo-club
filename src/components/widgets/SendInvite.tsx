import { Box, Button, Input, Text } from "@chakra-ui/react";
import WidgetBackground from "./widgetBackground";
import {useState} from "react"
import { createInvite, createNotification } from "../../utils/dbControllers";
const SendInvite = ({setWidget,clubInfo,setClubInfo}:{setWidget:Function,clubInfo:{ownedBy:string,clubName:string},setClubInfo:Function}) => {
  const [loading,setLoading]=useState(false)
  const [email,setEmail]=useState("");
  const sendInvite=( e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
       if(email==clubInfo.ownedBy){
         alert("You cant't send an invite to the owner of the group")
         return
       }
      
       setLoading(true)
       const inviteData={
         from:clubInfo.clubName,
         to:email,
         status:"pending",
         ownedBy:clubInfo.ownedBy,
         time:Date.now()
       } 
       
       createInvite(inviteData,function(inviteId:string){
        const notificationData={
          to:email,
          title:"Club Invite",
          body:`Hello, you have been invited to join the club: ${clubInfo.clubName}, attached to thus notification is the invite link ti join or decliine the invite.`,
          type:"invite-link",
          read:false,
          time:Date.now(),
          payload:{
            inviteId
          }
 
        }
         
         createNotification(notificationData,function(){
          setWidget(null)
          setClubInfo(null)
         })
       })

  }
  return (
    <WidgetBackground>
         <Box padding="1em" width="300px"  backgroundColor="white" borderRadius="20px" boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"}>
           <form onSubmit={(e)=> sendInvite(e)}>
           <Text textAlign="center" fontSize="28px" my={3} color="brand.typoContrast">Send Invite</Text>   
         <Input isRequired width="100%" value={email} onChange={(e)=>setEmail(e.target.value)}  type='email' placeholder='Enter an email' />    
        {!loading && <Button  type="submit" backgroundColor={"brand.accent"} variant="solid" color="white" width="100%" my={3}>Send Invite</Button>}
        {loading && <Button isLoading  backgroundColor={"brand.accent"} variant="solid" color="white" width="100%" my={3}>Send Invite</Button>}
           </form>
         
         <Text onClick={()=> setWidget(null)} color={"brand.typoContrast"} textAlign="center" fontWeight="bolder">Cancel</Text>
         </Box>
    </WidgetBackground> 
  );
};

export default SendInvite;
