import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Select,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getDate, getWeekDay, getHumanTimeZone, getTime, getTimeZones } from "@/helpers/dates";

type Props = {
  timeZone: string;
  isEdit: boolean;
  editClock: (newTimeZone: string) => void;
  removeClock: () => void;
  locale: string;
  texts: {
    removeClock: string;
  };
};

const Clock = (props: Props) => {
  const { timeZone, isEdit, editClock, removeClock, texts, locale } = props;

  const weekDayElementRef = useRef<HTMLParagraphElement>(null);
  const dateElementRef = useRef<HTMLParagraphElement>(null);
  const timeElementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (weekDayElementRef.current !== null) {
        weekDayElementRef.current.innerText = getWeekDay(timeZone, locale);
      }
      if (dateElementRef.current !== null) {
        dateElementRef.current.innerText = getDate(timeZone, locale);
      }
      if (timeElementRef.current !== null) {
        timeElementRef.current.innerText = getTime(timeZone, locale);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeZone, locale]);

  const timeZones = useMemo(() => getTimeZones(), []);

  const renderDataList = () => {
    const options = [];

    for (const timeZone of timeZones.entries()) {
      options.push(
        <option key={timeZone[0]} value={timeZone[0]}>
          {timeZone[1]}
        </option>,
      );
    }

    return options;
  };

  return (
    <Stack flexDirection="column" rowGap={0} textAlign="center">
      <Text ref={dateElementRef} fontSize="sm">
        {getDate(timeZone, locale)}
      </Text>
      <Text ref={weekDayElementRef} fontSize="sm">
        {getWeekDay(timeZone, locale)}
      </Text>
      <Heading ref={timeElementRef} marginBlock={2}>
        {getTime(timeZone, locale)}
      </Heading>
      {isEdit ? (
        <InputGroup size="md">
          <Input
            list="timeZones"
            onChange={(event) => {
              editClock(event.target.value);
            }}
            paddingRight={0}
            value={timeZones.get(timeZone)}
          />
          <datalist id="timeZones">{renderDataList()}</datalist>
          <InputRightElement marginRight={1}>
            <Tooltip label={texts.removeClock}>
              <Button aria-label={texts.removeClock} onClick={removeClock} size="sm">
                <DeleteIcon />
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Text fontSize="sm">{getHumanTimeZone(timeZone)}</Text>
      )}
    </Stack>
  );
};

export { Clock };
