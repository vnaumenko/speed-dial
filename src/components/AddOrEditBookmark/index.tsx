import React, { type ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useAppState } from "@/store";
import { addBookmarkAction, editBookmarkAction, openBookmarkModalAction } from "@/store/actions";
import type { AddBookmarkActionPayload } from "@/store/types";
import { isValidUrl } from "@/helpers/isValidUrl";

const INITIAL_FORM_VALUES: AddBookmarkActionPayload = {
  url: "",
};

const AddOrEditBookmark = () => {
  const {
    state: { addOrEditBookmarkModal, bookmarks },
    dispatch,
  } = useAppState();

  const [formValues, setFormValues] = useState<AddBookmarkActionPayload>(INITIAL_FORM_VALUES);

  const mode = useMemo(() => {
    if (addOrEditBookmarkModal === "new") return "new";
    if (addOrEditBookmarkModal !== null) return "edit";

    return null;
  }, [addOrEditBookmarkModal]);

  const isOpen = useMemo(() => mode !== null, [mode]);

  const { title, buttonTitle } = useMemo(() => {
    if (mode === "new") {
      return {
        title: "Добавить закладку",
        buttonTitle: "Добавить",
      };
    }

    if (mode === "edit") {
      return {
        title: "Редактировать закладку",
        buttonTitle: "Сохранить",
      };
    }

    return {};
  }, [mode]);

  const urlHasError = useMemo(() => {
    return !isValidUrl(formValues.url);
  }, [formValues.url]);

  const urlEmpty = useMemo(() => {
    return formValues.url.length === 0;
  }, [formValues.url]);

  const onClose = useCallback(() => {
    dispatch(openBookmarkModalAction(null));
    setFormValues(INITIAL_FORM_VALUES);
  }, []);

  const onSubmit = useCallback(() => {
    if (mode === "new") {
      dispatch(addBookmarkAction(formValues));
    }

    if (mode === "edit" && addOrEditBookmarkModal !== null && addOrEditBookmarkModal !== "new") {
      dispatch(
        editBookmarkAction({
          ...formValues,
          id: addOrEditBookmarkModal,
        }),
      );
    }
    onClose();
  }, [formValues, mode, addOrEditBookmarkModal]);

  const handlerInput = useCallback(
    (key: keyof AddBookmarkActionPayload): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        setFormValues((prev) => ({
          ...prev,
          [key]: e.target.value,
        }));
      },
    [],
  );

  useEffect(() => {
    if (mode === "edit") {
      const foundBookmark = bookmarks.find((bookmark) => bookmark.id === addOrEditBookmarkModal);

      if (foundBookmark) {
        setFormValues({
          title: foundBookmark.title,
          url: foundBookmark.url,
        });
      }
    }
  }, [mode, bookmarks]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onSubmit]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl isInvalid={urlHasError} isRequired>
              <FormLabel>Введите URL</FormLabel>
              <Input
                type="url"
                size="lg"
                value={formValues.url}
                onChange={handlerInput("url")}
                autoFocus
                placeholder="Например: https://google.com"
              />
              {urlHasError && !urlEmpty && (
                <FormErrorMessage>Введите корректный URL</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Введите название</FormLabel>
              <Input
                size="lg"
                value={formValues.title ?? ""}
                onChange={handlerInput("title")}
                placeholder="Например: Google"
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onSubmit} isDisabled={urlHasError}>
            {buttonTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddOrEditBookmark };
