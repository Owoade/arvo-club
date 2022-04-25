import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import WidgetBackground from "./widgetBackground";
export interface IError {
    message: string | null ,
    
}
const Loader = ({ message }: IError) => {
    return (
        <WidgetBackground>
            <Box width="300px" padding={"1em"} bgColor="white" borderRadius="20px" textAlign="center">
                <Spinner
                    thickness='4px'
                    speed='1s'
                    emptyColor='gray.200'
                    color='brand.accentContrast'
                    size='xl'
                    mx={"auto"}
                />
                <Text margin="1em 0">{message}</Text>
            </Box>
        </WidgetBackground>
    )
};
export default Loader;