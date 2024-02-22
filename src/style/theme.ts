import { type ChakraTheme, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    cssVarPrefix: "",
    initialColorMode: "system",
  },
} as ChakraTheme);

export { theme };
