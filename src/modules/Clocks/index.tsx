import React from "react";
import { Button, Card, CardBody, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import { Clock } from "@/components/Clock";

export const Clocks = () => {
  const {
    clocks,
    flags: { isEdit },
    editClock,
    removeClock,
    addClock,
  } = useStore();

  const { t, i18n } = useTranslation();

  return (
    <Stack flexDirection="row" gap="4" justifyContent="center" flexWrap="wrap">
      {Object.values(clocks).map(({ id, timeZone }) => (
        <Card key={id} width={64}>
          <CardBody padding={4}>
            <Clock
              timeZone={timeZone}
              isEdit={isEdit}
              editClock={(newTimeZone) => {
                editClock({ id, timeZone: newTimeZone });
              }}
              removeClock={() => {
                removeClock(id);
              }}
              locale={i18n.language}
              texts={{
                removeClock: t("removeClock"),
              }}
            />
          </CardBody>
        </Card>
      ))}
      {isEdit ? (
        <Card width={48} textAlign="center">
          <CardBody padding={4} alignItems="end" display="flex">
            <Button onClick={addClock} width="full">
              {t("addClock")}
            </Button>
          </CardBody>
        </Card>
      ) : null}
    </Stack>
  );
};
