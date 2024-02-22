import { v4 } from "uuid";
import style from "./style.module.css";
import { type IBookmark } from "@/@types/bookmarks";
import { useAppState } from "@/store";
import React, { useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BookmarkItem } from "@/components/BookmarkItem";
import { AddOrEditBookmark } from "@/modules/AddOrEditBookmark";

const getMock = () => {
  return {
    order: Math.random(),
    id: v4(),
    url: "https://google.com",
    title: "Facebook",
    image: "https://placekitten.com/32/32",
  };
};

const MOCK: IBookmark[] = Array.from({ length: 10 }, getMock);

const Bookmarks = () => {
  const {
    state: { locked },
    dispatch,
  } = useAppState();

  return (
    <div className={style.wrapper}>
      {MOCK.map((bookmark) => (
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
