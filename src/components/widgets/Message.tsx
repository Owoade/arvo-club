import { Box, Button, Flex, Text } from "@chakra-ui/react";
import WidgetBackground from "./widgetBackground"
export interface IError {
    message:string,
    setMessage:Function
}
const Message = ({message,setMessage}:IError) => {
  return(
      <WidgetBackground>
          <Box width="300px" padding={"1em"} bgColor="white" borderRadius="20px" textAlign="center">
              <Text margin="1em 0">{message}</Text>
              <Button width="100%" borderRadius="20px" bgColor="brand.accent" color="white" onClick={() => setMessage("")}>Ok</Button>
          </Box>
      </WidgetBackground>
          
  )
};

export default Message;