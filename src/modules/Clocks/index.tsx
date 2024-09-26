import React from "react";
import { Box, Button, Card, CardBody, Stack } from "@chakra-ui/react";
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
        <Card key={id} width={60}>
          <CardBody padding={4} display="flex" flexDirection="column" justifyContent="center">
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
        <Box display="flex" width="100%" justifyContent="center">
          <Card width={60}>
            <CardBody
              padding={4}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Button onClick={addClock} width="full">
                {t("addClock")}
              </Button>
            </CardBody>
          </Card>
        </Box>
      ) : null}
    </Stack>
  );
};
