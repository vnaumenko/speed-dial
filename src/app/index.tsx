import React from "react";
import "@/style/style.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/style/theme";
import { Main } from "@/components/Main";
import { AppProvider } from "@/store";
import { Bookmarks } from "@/modules/Bookmarks";
import { Tools } from "@/components/Tools";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Main tools={<Tools />}>
          <Bookmarks />
        </Main>
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
