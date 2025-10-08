import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { useStore } from "@/store";

const LockButton = memo(() => {
  const {
    flags: { isEdit },
    toggleEditMode,
  } = useStore();

  const { t } = useTranslation();

  const label = t(isEdit ? "block" : "unblock");

  return (
    <Tooltip content={label}>
      <IconButton
        rounded="full"
        colorScheme="gray"
        size="sm"
        variant="outline"
        onClick={() => {
          toggleEditMode();
        }}
      >
        {isEdit ? <UnlockIcon /> : <LockIcon />}
      </IconButton>
    </Tooltip>
  );
});

LockButton.displayName = "LockButton";

export { LockButton };
