import { useEffect, useRef } from "react";
import { ButtonGroup, Heading, IconButton, Select, Stack, Text, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getDate, getHumanTimeZone, getTime, getTimeZones } from "@/helpers/dates";

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

  const timeElementRef = useRef<HTMLHeadingElement>(null);
  const dateElementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
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

  return (
    <Stack flexDirection="column" columnGap={1} textAlign="center">
      <Text ref={dateElementRef}>{getDate(timeZone, locale)}</Text>
      <Heading ref={timeElementRef}>{getTime(timeZone, locale)}</Heading>
      {isEdit ? (
        <ButtonGroup>
          <Select
            onChange={(event) => {
              editClock(event.target.value);
            }}
            value={timeZone}
          >
            {getTimeZones().map((timeZone) => (
              <option key={timeZone[0]} value={timeZone[0]}>
                {timeZone[1]}
              </option>
            ))}
          </Select>
          <Tooltip label={texts.removeClock}>
            <IconButton
              aria-label={texts.removeClock}
              icon={<DeleteIcon />}
              onClick={removeClock}
            />
          </Tooltip>
        </ButtonGroup>
      ) : (
        <Text>{getHumanTimeZone(timeZone)}</Text>
      )}
    </Stack>
  );
};

export { Clock };
