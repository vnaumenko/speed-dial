import React from "react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import style from "./style.module.css";
import { useAppState } from "@/store";
import { BookmarkItem } from "@/components/BookmarkItem";
import { AddOrEditBookmark } from "@/modules/AddOrEditBookmark";

const Bookmarks = () => {
  const {
    state: { locked, bookmarks },
    dispatch,
  } = useAppState();

  return (
    <div className={style.wrapper}>
      {bookmarks.map((bookmark) => (
        <BookmarkItem bookmark={bookmark} key={bookmark.id} />
      ))}
      {!locked && (
        <div className={style.addButtonWrapper}>
          <Button
            leftIcon={<AddIcon />}
            onClick={() => {
              dispatch({ type: "@BOOKMARK/addOrEdit", payload: { mode: "add" } });
            }}
          >
            Добавить
          </Button>
        </div>
      )}
      <AddOrEditBookmark />
    </div>
  );
};

export { Bookmarks };
