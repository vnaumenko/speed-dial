import React from "react";
import "@/style/style.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import style from "./style.module.css";
import { theme } from "@/style/theme";
import { Bookmarks } from "@/modules/Bookmarks";
import { Tools } from "@/modules/Tools";
import { Clocks } from "@/modules/Clocks";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="container.xl" minWidth="2xl" height="100dvh" padding={8}>
        <div className={style.grid}>
          <div className={style.tools}>
            <Tools />
          </div>
          <div className={style.main}>
            <Bookmarks />
          </div>
          <div className={style.clocks}>
            <Clocks />
          </div>
        </div>
      </Container>
    </ChakraProvider>
  );
};

export default App;
