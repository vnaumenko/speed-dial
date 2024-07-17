import React from "react";
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

  const addBookmarkLabel = t("addBookmark");

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
              texts={{
                edit: t("edit"),
                remove: t("remove"),
                visit: (count) => t("visit", { count }),
              }}
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
          <Tooltip label={addBookmarkLabel}>
            <IconButton
              aria-label={addBookmarkLabel}
              width={32}
              height="auto"
              size="lg"
              minHeight={12}
              variant="outline"
              icon={<AddIcon />}
              onClick={addBookmark}
            >
              {t("add")}
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
      {bookmarkModal !== null ? <Modal id={bookmarkModal} /> : null}
    </>
  );
};

export { Bookmarks };
