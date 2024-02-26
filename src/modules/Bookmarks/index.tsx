import React from "react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import style from "./style.module.css";
import { AddOrEditBookmark } from "@/components/AddOrEditBookmark";
import { useAppState } from "@/store";
import { BookmarkItem } from "@/components/BookmarkItem";
import { openBookmarkModalAction } from "@/store/actions";

const Bookmarks = () => {
  const {
    state: { locked, bookmarks },
    dispatch,
  } = useAppState();

  return (
    <div className={style.wrapper}>
      {bookmarks
        .toSorted(
          ({ countClick: aCountClick = 0 }, { countClick: bCountClick = 0 }) =>
            bCountClick - aCountClick,
        )
        .map((bookmark) => (
          <BookmarkItem bookmark={bookmark} key={bookmark.id} />
        ))}
      {!locked && (
        <div className={style.addButtonWrapper}>
          <Button
            leftIcon={<AddIcon />}
            onClick={() => {
              dispatch(openBookmarkModalAction("new"));
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
