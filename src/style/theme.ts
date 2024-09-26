import { extendTheme } from "@chakra-ui/react";
import { type ChakraTheme } from "@chakra-ui/theme";

const theme = extendTheme({
  sizes: {
    container: {
      xxl: "1440px",
    },
  },
  styles: {
    global: {
      body: {
        background:
          "radial-gradient(var(--colors-chakra-subtle-bg), var(--colors-chakra-body-bg));",
      },
    },
  },
  config: {
    cssVarPrefix: "",
    initialColorMode: "system",
  },
} as unknown as ChakraTheme);

export { theme };
