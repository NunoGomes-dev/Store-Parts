import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </>
);
