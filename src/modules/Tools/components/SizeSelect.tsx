import { Box, createListCollection, Select } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { useStore } from "@/store";
import { SIZES } from "@/store/contants";
import type { Settings } from "@/store/types";

const SizeSelect = memo(() => {
  const { t } = useTranslation();

  const {
    settings: { size },
    setSize,
  } = useStore();

  const SIZES_LIST = createListCollection({
    items: SIZES.map((size) => ({
      label: t(`size_${size}`),
      value: size,
    })),
  });

  return (
    <Box width="32">
      <Select.Root
        collection={SIZES_LIST}
        variant="outline"
        size="sm"
        value={[size]}
        onValueChange={(value) => {
          setSize(value.value[0] as Settings["size"]);
        }}
      >
        <Select.HiddenSelect />
        <Tooltip content={t("changeSize")} openDelay={0} closeDelay={0}>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText
                placeholder={t("selectSize")}
                fontWeight="medium"
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
        </Tooltip>
        <Select.Positioner>
          <Select.Content>
            {SIZES_LIST.items.map((size) => (
              <Select.Item item={size} key={size.value}>
                {size.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  );
});

SizeSelect.displayName = "SizeSelect";

export { SizeSelect };
