import React from "react";
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Modal } from "./Modal";
import { useStore } from "@/store";
import { Bookmark } from "@/components/Bookmark";

const Bookmarks = () => {
  const {
    bookmarks,
    flags: { isEdit, bookmarkModal },
    goToBookmark,
    removeBookmark,
    editBookmark,
    addBookmark,
  } = useStore();

  return (
    <>
      <Stack flexDirection="row" flexWrap="wrap" justifyContent="center">
        {Object.values(bookmarks)
          .toSorted(
            ({ countClick: countClickA }, { countClick: countClickB }) => countClickB - countClickA,
          )
          .map(({ id, url, image, countClick, title }) => (
            <Bookmark
              isEdit={isEdit}
              title={title}
              url={url}
              key={id}
              countClick={countClick}
              image={image}
              removeBookmark={() => {
                removeBookmark(id);
              }}
              editBookmark={() => {
                editBookmark(id);
              }}
              onClick={(event) => {
                const isMiddleClick = event.button === 1;
                const isLeftClick = event.button === 0;

                if (isLeftClick || isMiddleClick) {
                  if (isEdit) {
                    event.preventDefault();
                  } else {
                    goToBookmark({ id, isMiddleClick });
                  }
                }
              }}
            />
          ))}
        {isEdit ? (
          <Tooltip label="Добавить закладку">
            <IconButton
              aria-label="Добавить закладку"
              width={32}
              height="auto"
              size="lg"
              minHeight={12}
              variant="outline"
              icon={<AddIcon />}
              onClick={addBookmark}
            >
              Добавить
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
      {bookmarkModal !== null ? <Modal id={bookmarkModal} /> : null}
    </>
  );
};

export { Bookmarks };
