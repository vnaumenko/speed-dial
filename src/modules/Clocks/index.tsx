import { Box, Button, Card, Stack } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import { Clock } from "./components/Clock";

const Clocks = memo(() => {
  const {
    clocks,
    flags: { isEdit },
    addClock,
  } = useStore();

  const { t } = useTranslation();

  return (
    <Stack
      flexDirection="row"
      gap={{ base: 2, lg: 4 }}
      flexWrap="wrap"
      justifyContent="center"
    >
      {Object.values(clocks).map(({ id, timeZone }) => (
        <Card.Root key={id}>
          <Card.Body
            padding={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Clock timeZone={timeZone} id={id} />
          </Card.Body>
        </Card.Root>
      ))}
      {isEdit && (
        <Box display="flex" width="100%" justifyContent="center">
          <Card.Root>
            <Card.Body
              padding={4}
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Button onClick={addClock} width="full">
                {t("addClock")}
              </Button>
            </Card.Body>
          </Card.Root>
        </Box>
      )}
    </Stack>
  );
});

Clocks.displayName = "Clocks";

export { Clocks };
