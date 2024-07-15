import React from "react";
import { IconButton, Stack, Tooltip, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { GitHubIcon } from "@/icons/GitHubIcon";
import { useStore } from "@/store";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const label = `Включить ${colorMode === "light" ? "темную" : "светлую"} тему`;

  return (
    <Tooltip label={label} placement="left">
      <IconButton
        aria-label={label}
        isRound
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        colorScheme="gray"
        size="sm"
        variant="outline"
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

const LockButton = () => {
  const {
    flags: { isEdit },
    toggleEditMode,
  } = useStore();

  const label = isEdit ? "Заблокировать" : "Разблокировать";

  return (
    <Tooltip label={label} placement="left">
      <IconButton
        aria-label={label}
        isRound
        icon={isEdit ? <UnlockIcon /> : <LockIcon />}
        colorScheme="gray"
        size="sm"
        variant="outline"
        onClick={toggleEditMode}
      />
    </Tooltip>
  );
};

const GitHubButton = () => {
  const label = "Внеси свой вклад в развитие проекта!";

  return (
    <Tooltip label={label} placement="right">
      <IconButton
        aria-label={label}
        as="a"
        isRound
        href="https://github.com/vnaumenko/speed-dial"
        target="_blank"
        colorScheme="gray"
        size="sm"
        variant="outline"
        icon={<GitHubIcon />}
      />
    </Tooltip>
  );
};

export const Tools = () => {
  return (
    <Stack direction="row" spacing={8} justifyContent="space-between">
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <GitHubButton />
      </Stack>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <ThemeButton />
        <LockButton />
      </Stack>
    </Stack>
  );
};
