import {Box} from "@chakra-ui/react";
const Wrapper =({children}:{children:React.ReactNode})=>{
   return (
       <Box margin="0 auto" width={{lg:"900px",base:"90%"}}>{children}</Box>
   )
}
export default Wrapper