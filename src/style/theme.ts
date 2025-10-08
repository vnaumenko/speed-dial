import { createSystem, defaultConfig } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      gradients: {
        bodyBg: {
          value: "",
        },
      },
    },
  },
  utilities: {
    extend: {
      // @ts-expect-error
      fieldSizing: {
        values: ["content", "fixed"],
        transform: (value: string) => ({
          fieldSizing: value,
        }),
      },
    },
  },
});

export { theme };
