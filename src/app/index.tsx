import React from "react";
import "./style.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ModuleOne } from "@/modules/ModuleOne";

const App = () => {
  return (
    <ChakraProvider>
      <ModuleOne />
    </ChakraProvider>
  );
};

export default App;
