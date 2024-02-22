import React, { type CSSProperties, useEffect } from "react";
import { IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import style from "./style.module.css";
import type { IBookmark } from "@/@types/bookmarks";
import { useAppState } from "@/store";
import { removeBookmarkAction } from "@/store/actions";

interface Props {
  bookmark: IBookmark;
}

const BookmarkItem = (props: Props) => {
  const { bookmark } = props;

  const {
    state: { locked },
    dispatch,
  } = useAppState();

  useEffect(() => {}, []);

  const value = useColorModeValue("var(--colors-gray-100)", "var(--colors-gray-900)");

  return (
    <div className={style.wrapper} style={{ "--hover-bg-color": value } as CSSProperties}>
      <a
        href={bookmark.url}
        onClick={(e) => {
          if (!locked) {
            e.preventDefault();
          }
        }}
        key={bookmark.id}
        className={style.bookmark}
      >
        <img src={bookmark.image} alt={bookmark.title} />
        <span>{bookmark.title}</span>
      </a>
      {!locked && (
        <div className={style.tools}>
          <Tooltip label="Изменить">
            <IconButton
              isRound={true}
              size={"xs"}
              colorScheme="teal"
              aria-label="Изменить"
              fontSize="12px"
              icon={<EditIcon />}
            />
          </Tooltip>
          <Tooltip label="Удалить">
            <IconButton
              isRound={true}
              size={"xs"}
              colorScheme="teal"
              aria-label="Удалить"
              icon={<DeleteIcon />}
              onClick={() => {
                dispatch(removeBookmarkAction(bookmark.id));
              }}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export { BookmarkItem };
