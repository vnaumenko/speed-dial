import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./app";
import { i18n } from "@/langs";
import { theme } from "@/style/theme";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </I18nextProvider>
  </StrictMode>,
);
