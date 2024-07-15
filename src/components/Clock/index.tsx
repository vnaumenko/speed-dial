import { useEffect, useRef } from "react";
import { ButtonGroup, Heading, IconButton, Select, Stack, Text, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getDate, getHumanTimeZone, getTime } from "@/helpers/dates";

interface Props {
  timeZone: string;
  isEdit: boolean;
  editClock: (newTimeZone: string) => void;
  removeClock: () => void;
}

const Clock = (props: Props) => {
  const { timeZone, isEdit, editClock, removeClock } = props;

  const timeElementRef = useRef<HTMLHeadingElement>(null);
  const dateElementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dateElementRef.current !== null) {
        dateElementRef.current.innerText = getDate(timeZone);
      }
      if (timeElementRef.current !== null) {
        timeElementRef.current.innerText = getTime(timeZone);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <Stack flexDirection="column" columnGap={1} textAlign="center">
      <Text ref={dateElementRef}>{getDate(timeZone)}</Text>
      <Heading ref={timeElementRef}>{getTime(timeZone)}</Heading>
      {isEdit ? (
        <ButtonGroup>
          <Select
            onChange={(event) => {
              editClock(event.target.value);
            }}
            value={timeZone}
          >
            {Intl.supportedValuesOf("timeZone")
              .map((timeZone) => {
                return [timeZone, getHumanTimeZone(timeZone)];
              })
              .toSorted((timeZoneA, timeZoneB) => timeZoneA[1].localeCompare(timeZoneB[1]))
              .map((timeZone) => (
                <option key={timeZone[0]} value={timeZone[0]}>
                  {timeZone[1]}
                </option>
              ))}
          </Select>
          <Tooltip label="Удалить часы">
            <IconButton aria-label="Удалить часы" icon={<DeleteIcon />} onClick={removeClock}>
              Удалить
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      ) : (
        <Text>{getHumanTimeZone(timeZone)}</Text>
      )}
    </Stack>
  );
};

export { Clock };
