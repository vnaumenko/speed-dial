import React from "react";
import style from "./style.module.css";
import type { IBookmark } from "@/@types/bookmarks";

type Props = {
  bookmark: IBookmark;
};

const BookmarkItem = (props: Props) => {
  const { bookmark } = props;

  return (
    <a
      href={bookmark.url}
      onClick={(e) => {
        e.preventDefault();
      }}
      key={bookmark.id}
      className={style.bookmark}
    >
      <img src={bookmark.image} alt={bookmark.title} />
      <span>{bookmark.title}</span>
    </a>
  );
};

export { BookmarkItem };
