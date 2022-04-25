import {Text} from "@chakra-ui/react"
const Logo = ({alignCenter,dashboard}:{alignCenter?:boolean,dashboard?:true})=>{
  
  if(dashboard)  return <Text textAlign={alignCenter ? "center" : "left"} transform={{xs:"translateY(0)",base:"tranalateY(.6em)"}} fontFamily="Pacifico, cursive" color="brand.accent" fontSize={{sm:"30px",base:"20px"}}>ArvoClub<span style={{color:"#FFD809"}}>.</span> </Text> 
  return <Text textAlign={alignCenter ? "center" : "left"} fontFamily="Pacifico, cursive" color="brand.accent" fontSize={{sm:"30px",base:"20px"}}>ArvoClub<span style={{color:"#FFD809"}}>.</span> </Text>
}
export default Logo