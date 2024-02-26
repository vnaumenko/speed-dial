import { useEffect, useMemo, useRef } from "react";
import { Button, Select, Stack } from "@chakra-ui/react";
import style from "./style.module.css";
import { useAppState } from "@/store";
import { changeClockStateAction } from "@/store/actions";

interface Props {
  type: "clock1" | "clock2" | "clock3";
}

const getDate = (timeZone: string) => {
  return new Date().toLocaleDateString("ru-RU", {
    timeZone,
    dateStyle: "full",
  });
};

const getTime = (timeZone: string) => {
  return new Date().toLocaleTimeString("ru-RU", { timeZone });
};

const Clock = (props: Props) => {
  const { type } = props;

  const {
    state: {
      [type]: { timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone, hide },
      locked,
    },
    dispatch,
  } = useAppState();

  const timeElementRef = useRef<HTMLParagraphElement>(null);
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

  const renderedViewButton = useMemo(() => {
    if (locked) return null;

    return (
      <Button
        onClick={() => {
          dispatch(
            changeClockStateAction({
              clock: type,
              clockState: {
                hide: !hide,
              },
            }),
          );
        }}
      >
        {hide ? "Показать" : "Скрыть"}
      </Button>
    );
  }, [hide, locked]);

  if (hide) return <div className={style.wrapper}>{renderedViewButton}</div>;

  return (
    <div className={style.wrapper}>
      <p className={style.date} ref={dateElementRef}>
        {getDate(timeZone)}
      </p>
      <p className={style.time} ref={timeElementRef}>
        {getTime(timeZone)}
      </p>
      <div className={style.timezone}>
        {locked ? (
          timeZone
        ) : (
          <Stack spacing={3} alignItems="center">
            <Select
              placeholder="Выберите таймзону"
              onChange={(event) => {
                dispatch(
                  changeClockStateAction({
                    clock: type,
                    clockState: {
                      timeZone: event.target.value,
                    },
                  }),
                );
              }}
              value={timeZone}
            >
              {Intl.supportedValuesOf("timeZone").map((timeZone) => (
                <option key={timeZone} value={timeZone}>
                  {timeZone}
                </option>
              ))}
            </Select>
            {renderedViewButton}
          </Stack>
        )}
      </div>
    </div>
  );
};

export { Clock };
