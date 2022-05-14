import React from "react";
import Routes from "./Routes";
import { Box, useColorModeValue as mode } from "@chakra-ui/react";

function App() {
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Box h="full" w="full" bg={mode("white", "gray.800")} overflowY="auto">
        <Routes />
      </Box>
    </Box>
  );
}

export default App;
