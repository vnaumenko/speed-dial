import React from "react";
import { Button, Stack, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useAppState } from "@/store";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      colorScheme="gray"
      size={"sm"}
      variant="outline"
      onClick={toggleColorMode}
    >
      Включить {colorMode === "light" ? "темную" : "светлую"} тему
    </Button>
  );
};

const LockButton = () => {
  const {
    state: { locked },
    dispatch,
  } = useAppState();

  return (
    <Button
      leftIcon={locked ? <LockIcon /> : <UnlockIcon />}
      colorScheme="gray"
      size={"sm"}
      variant="outline"
      onClick={() => {
        dispatch({ type: "@LOCK/toggle" });
      }}
    >
      {locked ? "Разблокировать" : "Заблокировать"}
    </Button>
  );
};

const Tools = () => {
  return (
    <Stack direction="row" spacing={4} justifyContent={"end"}>
      <ThemeButton />
      <LockButton />
    </Stack>
  );
};

export { Tools };
