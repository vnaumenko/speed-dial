import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useColorMode } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";

const ThemeButton = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { t } = useTranslation();

  const label = t(colorMode === "light" ? "turnDarkTheme" : "turnLightTheme");

  return (
    <Tooltip content={label}>
      <IconButton
        aria-label={label}
        rounded="full"
        colorScheme="gray"
        size="sm"
        variant="outline"
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Tooltip>
  );
});

ThemeButton.displayName = "ThemeButton";

export { ThemeButton };
