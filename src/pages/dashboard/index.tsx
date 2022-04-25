import { Box, Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import Header from "../../components/Header"
import Wrapper from "../../components/Wrapper"
import AddClub from "../../components/widgets/AddClub";
import {useState,useEffect} from "react";
import { getJoinedClubs, getOwnedClubs, removeMember } from "../../utils/dbControllers";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate=useNavigate()
    const userEmail=localStorage.getItem("user-email") || "null"
    const [ownedClubs,setOwnedClubs]=useState<null | []>(null)
    const [joinedClubs,setJoinedClubs]=useState<null | {clubName:string,joinedAt:string}[]>(null)
    const [widget,setWidget]=useState<null | boolean>(null)
    const [refresh,setRefresh]=useState(false)
    useEffect(()=>{
       if(ownedClubs==null){
           getOwnedClubs(userEmail,function(clubs:[]){
            setOwnedClubs(clubs)
           })
       }
    },[ownedClubs])
    useEffect(()=>{
       if(joinedClubs==null){
           getJoinedClubs(userEmail,function(clubs:[]){
            setJoinedClubs(clubs)
           })
       }
    },[joinedClubs])
    const removeUser=(email:string,clubName:string)=>{
        removeMember({clubName,email},function(){
           setJoinedClubs(null)
        })

    }
    return (
        <Box>
            {widget && <AddClub setWidget={setWidget} refreshFunction={()=>{setOwnedClubs(null);setRefresh(true)}} />}
            <Box width="100%" backgroundColor="white">
              <Header refreshFunction={setRefresh} refresh={refresh} />
            </Box>
            
            <Box backgroundColor="whitesmoke" width="100%" minHeight={"100vh"} padding="1em 0">
                <Wrapper>
                    <Box>
                        <Flex width="100%" justifyContent={"space-between"} >
                            <Text transform="translateY(.5em)" fontSize={{xs:"28px",base:"20px"}} color="brand.typoContrast">Owned clubs</Text>
                            <Button onClick={()=>setWidget(true)} rightIcon={<i className="ri-add-fill"></i>} backgroundColor={"brand.accent"} variant="solid" color="white" width="150px" my={3}>Add new club</Button>
                        </Flex>
                        <Flex gap={6} my={8} width="fit-content" justifyContent={"space-between"} flexWrap="wrap">
                           { ownedClubs != null ? ownedClubs.length > 0 ? ownedClubs.map((club:{clubName:string,createdAt:number,_id:string})=> <Box  border="1px solid #FFD809" _hover={{ boxShadow: " 20px 20px 60px #bebebe, -20px -20px 60px #ffffff" }} transition=".5s ease" width={{xs:"200px",base:"100%"}} borderRadius="20px" padding="1em 0" backgroundColor="white" textAlign="center">
                                <Text fontSize="20px" color="brand.accent">{club.clubName}</Text>
                                <Button onClick={(()=> navigate(`club-details/${club._id}`) )} backgroundColor={"brand.accent"} variant="solid" color="white" width="100px" fontSize="14px" my={3}>view details</Button>
                                <Text fontSize="14px" color={"brand.typoContrast"}>{`Created ${new Date(club.createdAt).toDateString()}`}</Text>
                            </Box>  ) : <span> You do not own any club yet</span>: 
                            <Box width="100%" display="flex" justifyContent={"center"}>
                               <Spinner
                            margin={"1em auto"}
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='brand.accentContrast'
                                size='xl'
                            />  
                            </Box>
                           }
                        </Flex>
                    </Box>
                    <Box>
                        <Text fontSize={{xs:"28px",base:"20px"}} color="brand.typoContrast">Joined clubs</Text>
                        <Box padding="1em" my={4} borderRadius="20px" width="100%"  backgroundColor={"white"}>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Club name</Th>
                                            <Th>Date joined</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                    {
                                           joinedClubs != null ? joinedClubs?.length > 0 ? joinedClubs.map(club=>(<Tr fontWeight="bolder">
                                           <Td>{club?.clubName}</Td>
                                           <Td>{new Date(parseInt(club?.joinedAt)).toDateString()} </Td>
                                           <Td><Button onClick={()=>removeUser(userEmail,club?.clubName)} background="brand.accentContrast" width="160px" fontSize="13px" color="brand.accent" variant='solid'>
                                               Leave group
                                           </Button></Td>
                                       </Tr>) ): <span>No clubs joined yet</span>: <Spinner
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
}
export default Dashboard
