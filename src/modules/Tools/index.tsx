import { Stack } from "@chakra-ui/react";
import { memo } from "react";
import { GitHubButton } from "./components/GitHubButton";
import { ImportExportButton } from "./components/ImportExportButton";
import { LangSelect } from "./components/LangSelect";
import { LockButton } from "./components/LockButton";
import { SizeSelect } from "./components/SizeSelect";
import { ThemeButton } from "./components/ThemeButton";

const Tools = memo(() => {
  return (
    <Stack direction="row" gap="2" flexWrap="wrap" justifyContent="center">
      <GitHubButton />
      <ThemeButton />
      <LockButton />
      <ImportExportButton />
      <LangSelect />
      <SizeSelect />
    </Stack>
  );
});

Tools.displayName = "Tools";

export { Tools };
