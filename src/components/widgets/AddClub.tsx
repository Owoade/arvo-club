import { Box, Button, Input, Text } from "@chakra-ui/react";
import WidgetBackground from "./widgetBackground";
import { useState } from "react";
import {createClub,createNotification} from "../../utils/dbControllers"
import Message from "./Message"
import Loader from "./Loader"
const AddClub = ({setWidget,refreshFunction}:{setWidget:Function,refreshFunction:Function}) => {
  const [clubName,setClubName]=useState("")
  const [message,setMessage]=useState<string| null>(null);
    const [loadingMessage,setLoadingMessage]=useState<string| null>(null);
  const userEmail=localStorage.getItem("user-email")
  const addClub=(e: React.FormEvent<HTMLFormElement>)=>{
    setLoadingMessage("Creating club...")
    e.preventDefault();
    const clubData={
      ownedBy:userEmail,
      clubName,
      createdAt:Date.now()

    }
    createClub(clubData,function(successMessage:string){
      const notificationData={
        to:userEmail,
        body:`You have created a new club with the name ${clubName}, ensure to invite others to the new club.`,
        title:"New club created by you",
        type:"new club created",
        read:false,
        time:Date.now()
      }
      createNotification(notificationData,function(successMessage:string){
          setWidget(null)
          refreshFunction()
      })
    })
    
  }
  return (
    <WidgetBackground>
            {message && <Message message={message} setMessage={setMessage} />}
            {loadingMessage && <Loader message={loadingMessage} />}
         <Box padding="1em" width="300px"  backgroundColor="white" borderRadius="20px" boxShadow={" 20px 20px 60px #bebebe, -20px -20px 60px #ffffff"}>
           <form onSubmit={(e)=>addClub(e)}>
           <Text textAlign="center" fontSize="28px" my={3} color="brand.typoContrast">Create a new club</Text>   
         <Input value={clubName} onChange={(e)=> setClubName(e.target.value)} width="100%" isRequired type='text' placeholder='Enter a name' />    
         <Button type="submit" backgroundColor={"brand.accent"} variant="solid" color="white" width="100%" my={3}>Add new club</Button>
         <Text onClick={()=> setWidget(null)} color={"brand.typoContrast"} textAlign="center" fontWeight="bolder">Cancel</Text>
           </form>
         
         </Box>
    </WidgetBackground> 
  );
};

export default AddClub;
