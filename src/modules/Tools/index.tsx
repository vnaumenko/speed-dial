import React from "react";
import { IconButton, Select, Stack, Tooltip, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { GitHubIcon } from "@/icons/GitHubIcon";
import { useStore } from "@/store";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { t } = useTranslation();

  const label = t(colorMode === "light" ? "turnDarkTheme" : "turnLightTheme");

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

  const { t } = useTranslation();

  const label = t(isEdit ? "block" : "unblock");

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
  const { t } = useTranslation();

  const label = t("gitHubLabel");

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

const LangSelect = () => {
  const { t, i18n } = useTranslation();

  const {
    flags: { isEdit },
  } = useStore();

  const label = t("selectLang");

  if (!isEdit) return null;

  return (
    <Tooltip label={label} placement="left">
      <Select
        variant="filled"
        size="sm"
        value={i18n.language}
        onChange={(event) => {
          i18n.changeLanguage(event.target.value);
        }}
      >
        <option value="en">{t("lang", { lng: "en" })}</option>
        <option value="ru">{t("lang", { lng: "ru" })}</option>
      </Select>
    </Tooltip>
  );
};

export const Tools = () => {
  return (
    <Stack direction="row" spacing={8} justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <GitHubButton />
      </Stack>
      <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center">
        <LangSelect />
        <ThemeButton />
        <LockButton />
      </Stack>
    </Stack>
  );
};
