import {Text} from "@chakra-ui/react"
const Logo = ({alignCenter}:{alignCenter?:boolean})=>{
  return <Text textAlign={alignCenter ? "center" : "left"} fontFamily="Pacifico, cursive" color="brand.accent" fontSize={{sm:"30px",base:"20px"}}>ArvoClub<span style={{color:"#FFD809"}}>.</span> </Text>
}
export default Logo