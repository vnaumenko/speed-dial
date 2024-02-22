import React, {
  type ChangeEventHandler,
  type MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Button,
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
import { addBookmarkAction, openBookmarkModalAction } from "@/store/actions";
import type { AddBookmarkActionPayload } from "@/store/types";

const INITIAL_FORM_VALUES: AddBookmarkActionPayload = {
  url: "",
};

const AddOrEditBookmark = () => {
  const {
    state: { modalAddOrEditBookmark },
    dispatch,
  } = useAppState();

  const [formValues, setFormValues] = useState<AddBookmarkActionPayload>(INITIAL_FORM_VALUES);

  const isOpen = useMemo(() => modalAddOrEditBookmark !== null, [modalAddOrEditBookmark]);
  const mode = useMemo(() => modalAddOrEditBookmark?.mode, [modalAddOrEditBookmark]);

  const onClose = useCallback(() => {
    dispatch(openBookmarkModalAction(null));
  }, []);

  const { title, buttonTitle } = useMemo(() => {
    if (mode === "add")
      return {
        title: "Добавить закладку",
        buttonTitle: "Добавить",
      };

    if (mode === "edit")
      return {
        title: "Редактировать закладку",
        buttonTitle: "Сохранить",
      };

    return {};
  }, [mode]);

  const onSubmit = useCallback(() => {
    dispatch(addBookmarkAction(formValues));
    onClose();
    setFormValues(INITIAL_FORM_VALUES);
  }, [formValues]);

  const handlerInput = useCallback(
    (key: keyof AddBookmarkActionPayload): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        setFormValues((prev) => ({ ...prev, [key]: e.target.value }));
      },
    [],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Input placeholder="Введите URL" size="lg" onChange={handlerInput("url")} />
            <Input placeholder="Введите название" size="lg" onChange={handlerInput("title")} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onSubmit}>
            {buttonTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddOrEditBookmark };
