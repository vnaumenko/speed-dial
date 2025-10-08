import { CloseButton, Input, InputGroup, RadioCard } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { useStore } from "@/store";

type Props = {
  id: string;
  label: string;
};

const Folder = memo<Props>((props) => {
  const { id, label } = props;

  const { t } = useTranslation();

  const {
    flags: { isEdit },
    removeFolder,
    editFolder,
  } = useStore();

  const onChange = (newValue: string) => {
    editFolder({ id, newLabel: newValue });
  };

  return isEdit ? (
    <InputGroup
      width="auto"
      minWidth="32"
      endElement={
        <Tooltip content={t("removeFolder")} openDelay={0} closeDelay={0}>
          <CloseButton
            size="xs"
            onClick={() => {
              removeFolder(id);
            }}
            me="-2"
          />
        </Tooltip>
      }
    >
      <Input
        defaultValue={label}
        size="lg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(e.currentTarget.value);
          }
        }}
        onBlur={(e) => {
          onChange(e.currentTarget.value);
        }}
        fieldSizing="content"
      />
    </InputGroup>
  ) : (
    <RadioCard.Item value={id} flex="0">
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl>
        <RadioCard.ItemText textWrapMode="nowrap">{label}</RadioCard.ItemText>
      </RadioCard.ItemControl>
    </RadioCard.Item>
  );
});

Folder.displayName = "Folder";

export { Folder };
