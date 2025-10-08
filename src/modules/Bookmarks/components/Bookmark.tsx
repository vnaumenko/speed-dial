import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  type ButtonProps,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/ui/tooltip";
import { cleanUrl } from "@/helpers/prepareUrl";
import { ButtonContent } from "@/modules/Bookmarks/components/ButtonContent";
import { useStore } from "@/store";
import type { Bookmark as BookmarkType } from "@/store/types";
import { EditButton } from "./EditButton";
import styles from "./style.module.css";

type Props = {
  bookmark: BookmarkType;
};

const Bookmark = memo<Props>((props) => {
  const {
    bookmark: { url, title, image, countClick, id, folders },
  } = props;

  const {
    flags: { isEdit },
    removeBookmark,
    goToBookmark,
  } = useStore();

  const { t } = useTranslation();

  const buttonAttributes: ButtonProps = {
    width: 32,
    gap: 2,
    paddingTop: 4,
    paddingBottom: 3,
    variant: "ghost",
    flexDirection: "column",
    height: "auto",
    textAlign: "center",
  };

  if (isEdit) {
    return (
      <Box position="relative" className={styles.wrapper}>
        <Button {...buttonAttributes}>
          <ButtonContent title={title} src={image} />
        </Button>
        <Stack
          flexDirection="row"
          zIndex={1}
          justifyContent="center"
          left="50%"
          top={0}
          position="absolute"
          opacity={0}
          transition="all"
          transitionDuration=".3s"
          className={styles.tools}
        >
          <EditButton id={id} url={url} title={title} folders={folders} />
          <Tooltip
            content={t("remove")}
            positioning={{ placement: "bottom" }}
            openDelay={0}
            closeDelay={0}
          >
            <IconButton
              rounded="full"
              size="xs"
              colorScheme="teal"
              aria-label={t("remove")}
              onClick={() => {
                removeBookmark(id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    );
  }

  return (
    <Tooltip
      disabled={isEdit}
      content={
        <Text textAlign="center">
          {title}
          <br />
          {cleanUrl(url)}
          {countClick ? (
            <>
              <br />
              {countClick} {t("visit", { count: countClick })}
            </>
          ) : null}
        </Text>
      }
      closeDelay={0}
    >
      <Button {...buttonAttributes} asChild>
        <a
          href={url}
          rel="noopener noreferrer"
          onClick={() => {
            goToBookmark(id);
          }}
          onAuxClick={(e) => {
            const isMiddleClick = e.button === 1 || e.ctrlKey || e.metaKey;

            if (isMiddleClick) {
              goToBookmark(id);
            }
          }}
        >
          <ButtonContent title={title} src={image} />
        </a>
      </Button>
    </Tooltip>
  );
});

Bookmark.displayName = "Bookmark";

export { Bookmark };
