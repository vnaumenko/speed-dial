import { Box, createListCollection, Select } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";

const LangSelect = memo(() => {
  const { t, i18n } = useTranslation();

  const LANGUAGES = createListCollection({
    items: [
      { label: t("lang", { lng: "en" }), value: "en" },
      { label: t("lang", { lng: "ru" }), value: "ru" },
      { label: t("lang", { lng: "zh-cn" }), value: "zh-cn" },
      { label: t("lang", { lng: "es" }), value: "es" },
      { label: t("lang", { lng: "hi" }), value: "hi" },
      { label: t("lang", { lng: "ar" }), value: "ar" },
      { label: t("lang", { lng: "pt" }), value: "pt" },
      { label: t("lang", { lng: "bn" }), value: "bn" },
      { label: t("lang", { lng: "fr" }), value: "fr" },
      { label: t("lang", { lng: "ja" }), value: "ja" },
      { label: t("lang", { lng: "de" }), value: "de" },
    ],
  });

  return (
    <Box width="32">
      <Select.Root
        collection={LANGUAGES}
        variant="outline"
        size="sm"
        value={[i18n.language]}
        onValueChange={(value) => {
          i18n.changeLanguage(value.value[0]);
        }}
      >
        <Select.HiddenSelect />
        <Tooltip content={t("changeLang")} openDelay={0} closeDelay={0}>
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
            {LANGUAGES.items.map((language) => (
              <Select.Item item={language} key={language.value}>
                {language.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Box>
  );
});

LangSelect.displayName = "LangSelect";

export { LangSelect };
