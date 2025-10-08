import { RadioCard } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import { FOLDER_ALL } from "@/store/contants";

const All = memo(() => {
  const { t } = useTranslation();

  const {
    flags: { isEdit },
  } = useStore();

  if (isEdit) return null;

  return (
    <RadioCard.Item key={FOLDER_ALL} value={FOLDER_ALL} flex="0">
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl>
        <RadioCard.ItemText>{t("all")}</RadioCard.ItemText>
      </RadioCard.ItemControl>
    </RadioCard.Item>
  );
});

All.displayName = "All";

export { All };
