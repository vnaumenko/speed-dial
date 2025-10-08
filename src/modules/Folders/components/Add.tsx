import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";

const Add = memo(() => {
  const { t } = useTranslation();

  const {
    flags: { isEdit },
    addFolder,
  } = useStore();

  if (!isEdit) return null;

  return (
    <InputGroup endElement={<Kbd>↵</Kbd>} width="auto" minWidth="32">
      <Input
        placeholder={`${t("newFolder")}...`}
        size="lg"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            addFolder(e.currentTarget.value, () => {
              e.currentTarget.value = "";
            });
          }
        }}
        fieldSizing="content"
      />
    </InputGroup>
  );
});

Add.displayName = "Add";

export { Add };
