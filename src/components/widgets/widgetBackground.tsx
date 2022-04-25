import { Flex } from "@chakra-ui/react";

const WidgetBackground = ({children}:{children:React.ReactNode}) => {
  return(
      <Flex position="fixed" zIndex={5} width="100%" height="100vh" left="0" top="0" justifyContent={"center"} alignItems="center" backdropFilter={"blur(20px)"}  background="rgba(22, 22, 22, 0.205)">
          {children}
      </Flex>
  )
};

export default WidgetBackground;
