import {Text} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const Logo = ({alignCenter,dashboard}:{alignCenter?:boolean,dashboard?:true})=>{
  const navigate=useNavigate();
  if(dashboard)  return <Text onClick={()=> navigate("/dashboard") } cursor="pointer" textAlign={alignCenter ? "center" : "left"} transform={{xs:"translateY(0)",base:"translateY(.6em)"}} fontFamily="Pacifico, cursive" color="brand.accent" fontSize={{sm:"30px",base:"20px"}}>ArvoClub<span style={{color:"#FFD809"}}>.</span> </Text> 
  return <Text textAlign={alignCenter ? "center" : "left"} fontFamily="Pacifico, cursive" color="brand.accent" fontSize={{sm:"30px",base:"20px"}}>ArvoClub<span style={{color:"#FFD809"}}>.</span> </Text>
}
export default Logo
