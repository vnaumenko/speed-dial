import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  createListCollection,
  Heading,
  Portal,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { getDateWeekDay, getHumanTimeZone, getTime } from "@/helpers/dates";
import { useStore } from "@/store";

type Props = {
  timeZone: string;
  id: string;
};

const timeZones = createListCollection({
  items: Intl.supportedValuesOf("timeZone").map((timeZone) => ({
    label: getHumanTimeZone(timeZone),
    value: timeZone,
  })),
});

const Clock = memo<Props>((props) => {
  const { timeZone, id } = props;

  const {
    flags: { isEdit },
    editClock,
    removeClock,
  } = useStore();

  const { t, i18n } = useTranslation();

  const dateWeekDayElementRef = useRef<HTMLParagraphElement>(null);
  const timeElementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dateWeekDayElementRef.current !== null) {
        dateWeekDayElementRef.current.innerHTML = getDateWeekDay(
          timeZone,
          i18n.language,
        );
      }
      if (timeElementRef.current !== null) {
        timeElementRef.current.innerText = getTime(timeZone, i18n.language);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeZone, i18n.language]);

  return (
    <Stack flexDirection="column" rowGap={4} textAlign="center">
      <Text ref={dateWeekDayElementRef} fontSize="sm" userSelect="none">
        {getDateWeekDay(timeZone, i18n.language)}
      </Text>
      <Heading
        size="3xl"
        fontWeight="bold"
        ref={timeElementRef}
        fontVariantNumeric="tabular-nums"
        lineHeight="1"
        userSelect="none"
      >
        {getTime(timeZone, i18n.language)}
      </Heading>
      {isEdit ? (
        <Stack direction="row" gap={2}>
          <Select.Root
            collection={timeZones}
            value={[timeZone]}
            onValueChange={(value) => {
              editClock({ id, timeZone: value.value[0] });
            }}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {timeZones.items.map((timeZone) => (
                    <Select.Item item={timeZone} key={timeZone.value}>
                      {timeZone.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <Tooltip content={t("removeClock")} openDelay={0} closeDelay={0}>
            <Button
              aria-label={t("removeClock")}
              onClick={() => {
                removeClock(id);
              }}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Stack>
      ) : (
        <Text userSelect="none">{getHumanTimeZone(timeZone)}</Text>
      )}
    </Stack>
  );
});

Clock.displayName = "Clock";

export { Clock };
