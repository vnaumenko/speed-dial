import { IBookmark } from "@/@types/bookmarks";
import { useAppState } from "@/store";
import React, { useCallback, useMemo } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const AddOrEditBookmark = (props: Props) => {
  const {
    state: { modalAddOrEditBookmark },
    dispatch,
  } = useAppState();

  const isOpen = useMemo(() => modalAddOrEditBookmark !== null, [modalAddOrEditBookmark]);
  const mode = useMemo(() => modalAddOrEditBookmark?.mode, [modalAddOrEditBookmark]);

  const onClose = useCallback(() => {
    dispatch({ type: "@BOOKMARK/addOrEdit", payload: null });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>123</ModalBody>

        <ModalFooter>
          <Button variant="primary" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue">{mode === "add" ? "Добавить" : "Удалить"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddOrEditBookmark };
