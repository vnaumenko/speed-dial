import React, { type FC, type MouseEventHandler } from "react";
import { Button, IconButton, Tooltip, Stack, type ButtonProps, Box } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import styles from "./style.module.css";
import { ButtonContent } from "@/components/Bookmark/ButtonContent";

type Props = {
  isEdit: boolean;
  image?: string;
  title: string;
  countClick: number;
  url: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  removeBookmark: () => void;
  editBookmark: () => void;
  texts: {
    edit: string;
    remove: string;
    visit: (count: number) => string;
  };
};

export const Bookmark: FC<Props> = (props) => {
  const { isEdit, url, title, image, editBookmark, removeBookmark, countClick, onClick, texts } =
    props;

  const buttonAttributes: ButtonProps = {
    width: 32,
    gap: 2,
    paddingTop: 4,
    paddingBottom: 3,
    variant: "ghost",
    flexDirection: "column",
    height: "auto",
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
          <Tooltip label={texts.edit}>
            <IconButton
              isRound
              size="xs"
              colorScheme="teal"
              aria-label={texts.edit}
              fontSize="12px"
              icon={<EditIcon />}
              onClick={editBookmark}
            />
          </Tooltip>
          <Tooltip label={texts.remove}>
            <IconButton
              isRound
              size="xs"
              colorScheme="teal"
              aria-label={texts.remove}
              icon={<DeleteIcon />}
              onClick={removeBookmark}
            />
          </Tooltip>
        </Stack>
      </Box>
    );
  }

  return (
    <Tooltip
      isDisabled={isEdit}
      label={
        <>
          {title}
          <br />
          {url}
          <br />
          {countClick ? `${countClick} ${texts.visit(countClick)}` : null}
        </>
      }
      textAlign="center"
    >
      <Button {...buttonAttributes} onClick={onClick} onAuxClick={onClick}>
        <ButtonContent title={title} src={image} />
      </Button>
    </Tooltip>
  );
};
