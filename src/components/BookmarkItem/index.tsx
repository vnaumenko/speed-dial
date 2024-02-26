import React, { type CSSProperties, type MouseEventHandler, useCallback, useEffect } from "react";
import { IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import classNames from "classnames";
import { logger } from "@rsbuild/core";
import style from "./style.module.css";
import type { IBookmark } from "@/@types/bookmarks";
import { useAppState } from "@/store";
import { goToBookmarkAction, openBookmarkModalAction, removeBookmarkAction } from "@/store/actions";
import { noun } from "@/helpers/noun";

interface Props {
  bookmark: IBookmark;
}

const BookmarkItem = (props: Props) => {
  const {
    bookmark: { url, title, id, image, countClick },
  } = props;

  const {
    state: { locked },
    dispatch,
  } = useAppState();

  useEffect(() => {}, []);

  const value = useColorModeValue("var(--colors-gray-100)", "var(--colors-gray-900)");

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      const isMiddleClick = e.button === 1;
      const isLeftClick = e.button === 0;

      if (isLeftClick || isMiddleClick) {
        if (!locked) {
          e.preventDefault();
        } else {
          dispatch(goToBookmarkAction({ id, isMiddleClick }));
        }
      }
    },
    [locked, id],
  );

  return (
    <div className={style.wrapper} style={{ "--hover-bg-color": value } as CSSProperties}>
      <Tooltip
        isDisabled={!locked}
        label={
          <>
            {title}
            <br />
            {url}
            <br />
            {countClick && countClick > 0
              ? `${countClick} ${noun(countClick, ["переход", "перехода", "переходов"])}`
              : null}
          </>
        }
        textAlign="center"
        openDelay={500}
      >
        <button
          onClick={onClick}
          onAuxClick={onClick}
          className={classNames(style.bookmark, { [style.bookmarkUnLocked]: !locked })}
        >
          <div className={style.bookmarkImage}>
            <img src={image} alt={title} />
          </div>
          <span>{title}</span>
        </button>
      </Tooltip>
      {!locked && (
        <div className={style.tools}>
          <Tooltip label="Изменить">
            <IconButton
              isRound
              size="xs"
              colorScheme="teal"
              aria-label="Изменить"
              fontSize="12px"
              icon={<EditIcon />}
              onClick={() => {
                dispatch(openBookmarkModalAction(id));
              }}
            />
          </Tooltip>
          <Tooltip label="Удалить">
            <IconButton
              isRound
              size="xs"
              colorScheme="teal"
              aria-label="Удалить"
              icon={<DeleteIcon />}
              onClick={() => {
                dispatch(removeBookmarkAction(id));
              }}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export { BookmarkItem };
