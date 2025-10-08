import { IconButton, Link } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";

const GitHubButton = memo(() => {
  const { t } = useTranslation();

  const label = t("gitHubLabel");

  return (
    <Tooltip content={label}>
      <Link
        href="https://github.com/vnaumenko/speed-dial"
        target="_blank"
        rel="noopener noreferrer"
        rounded="full"
      >
        <IconButton
          rounded="full"
          colorScheme="gray"
          size="sm"
          variant="outline"
        >
          <FaGithub />
        </IconButton>
      </Link>
    </Tooltip>
  );
});

GitHubButton.displayName = "GitHubButton";

export { GitHubButton };
