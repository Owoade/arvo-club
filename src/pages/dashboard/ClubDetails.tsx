import { Box, Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import { useState,useEffect } from "react";
import SendInvite from "../../components/widgets/SendInvite"
import { useParams } from "react-router-dom";
import { getOwnedClubs,getClub, getPendingInvites, updateInvite, getClubMembers, removeMember } from "../../utils/dbControllers";

const ClubDetails = () => {
    const userEmail=localStorage.getItem("user-email") || "null"
    const [widget,setWidget]=useState<null | boolean>(null)
    const [refresh,setRefresh]=useState(false);
    const [pendinginvites,setPendingInvites]=useState<null |{to:string,time:string,_id:string}[]>(null)
    const [ownedClub,setOwnedClub]=useState<null | {clubName:string,ownedBy:string}>(null)
    const [members,setMembers]=useState<null | {clubName:string,email:string,joinedAt:string,_id:string}[]>(null)
    const {id}=useParams();
    useEffect(()=>{
        if(ownedClub==null){
          getClub(id || "null",function(club:[{clubName:string,ownedBy:string}]){
             setOwnedClub(club[0])
             getPendingInvites(club[0].clubName,function(invites:{to:string,time:string,_id:string}[]){
                 setPendingInvites(invites)
                    
             })
             getClubMembers(club[0].clubName,function(members:{clubName:string,email:string,joinedAt:string,_id:string}[]){
                 setMembers(members)

             })
          })
        }
     },[ownedClub])
  const revokeInvite=(id:string)=>{
      const data={
          filter:{
              _id:id
          },
          update:{
              status:"revoked"
          }
      }
      updateInvite(data)
      setOwnedClub(null)
  }
     if(ownedClub == null ) {
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

     const removeUser=(email:string,clubName:string)=>{
         removeMember({clubName,email},function(){
            setOwnedClub(null)
         })

     }
       
  return(
      <Box>
          {widget && <SendInvite setWidget={setWidget} clubInfo={ownedClub} setClubInfo={setOwnedClub} />}
            <Box width="100%" backgroundColor="white">
                <Header refreshFunction={setRefresh} refresh={refresh} />
            </Box>
            <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} padding="1em 0">
                <Wrapper>
                    <Box my={4}>
                      
                        <Flex width="100%" justifyContent={"space-between"} >
                            <Text transform="translateY(1em)" fontSize="28px" color="brand.typoContrast">Members</Text>
                            <Button onClick={()=>setWidget(true)} rightIcon={<i className="ri-add-fill"></i>} backgroundColor={"brand.accent"} variant="solid" color="white" width="150px" my={3}>Add member</Button>
                        </Flex>
                        <Box padding="1em" my={4} borderRadius="20px" width="100%"  backgroundColor={"white"}>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Email</Th>
                                            <Th>Date joined</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                    {
                                           members != null ? members?.length > 0 ? members.map(member=>(<Tr fontWeight="bolder">
                                           <Td>{member?.email}</Td>
                                           <Td>{new Date(parseInt(member?.joinedAt)).toDateString()} </Td>
                                           <Td><Button onClick={()=>removeUser(member?.email,member?.clubName)} background="brand.accentContrast" width="160px" fontSize="13px" color="brand.accent" variant='solid'>
                                               Remove Member
                                           </Button></Td>
                                       </Tr>) ): <span>No members  yet</span>: <Spinner
                                        margin={"1em auto"}
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='brand.accentContrast'
                                            size='xl'
                                        />
                                       }
                                      
                                    </Tbody>
                                   
                                </Table>
                            </TableContainer>
                        </Box>

                    </Box>
                    <Box my={4}>
                        <Text fontSize="28px" color="brand.typoContrast">Pending Invites</Text>
                        <Box padding="1em" my={4} borderRadius="20px" width="100%"  backgroundColor={"white"}>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Email</Th>
                                            <Th>Date sent</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                       {
                                           pendinginvites != null ? pendinginvites?.length > 0 ? pendinginvites.map(invite=>(<Tr fontWeight="bolder">
                                           <Td>{invite.to}</Td>
                                           <Td>{new Date(parseInt(invite.time)).toDateString()} </Td>
                                           <Td><Button onClick={()=>revokeInvite(invite._id)} background="brand.accentContrast" width="160px" fontSize="13px" color="brand.accent" variant='solid'>
                                               Revoke Invite
                                           </Button></Td>
                                       </Tr>) ): <span>No pending invite yet</span>: <Spinner
                                        margin={"1em auto"}
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='brand.accentContrast'
                                            size='xl'
                                        />
                                       }
                                        

                                        
                                      
                                    </Tbody>
                                   
                                </Table>
                            </TableContainer>
                        </Box>

                    </Box>
                </Wrapper>
            </Box>
      </Box>
  )
  
};

export default ClubDetails;
