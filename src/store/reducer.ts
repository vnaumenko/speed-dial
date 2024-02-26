import { v4 } from "uuid";
import { type IState } from "@/store/types";
import {
  BOOKMARK_ADD,
  BOOKMARK_ADD_OR_EDIT,
  BOOKMARK_EDIT,
  BOOKMARK_GO,
  BOOKMARK_REMOVE,
  CHANGE_CLOCK_STATE,
  LOCK_TOGGLE,
} from "@/store/constants";
import { type IBookmark } from "@/@types/bookmarks";
import { type Actions } from "@/store/actions";
import { saveToLocalStorage } from "@/helpers/storage";
import { getFaviconURL } from "@/helpers/getFavicon";
import { getHostByUrl } from "@/helpers/getHostByUrl";

const appReducer = (state: IState, { type, payload }: Actions): IState => {
  let newState = { ...state };

  const getTitle = (url: string, title?: string) =>
    title === undefined || title.length === 0 ? getHostByUrl(url) : title;

  if (type === BOOKMARK_ADD) {
    const { url, title } = payload;
    const newId = v4();

    newState = {
      ...newState,
      bookmarks: [
        ...newState.bookmarks,
        {
          id: newId,
          url,
          title: getTitle(url, title),
          image: getFaviconURL(url),
        },
      ],
    };
  }

  if (type === BOOKMARK_GO) {
    const { id, isMiddleClick } = payload;

    let url: string | null = null;

    newState = {
      ...newState,
      bookmarks: newState.bookmarks.map<IBookmark>((bookmark) => {
        if (bookmark.id === id) {
          url = bookmark.url;

          return {
            ...bookmark,
            countClick: (bookmark.countClick ?? 0) + 1,
          };
        }

        return bookmark;
      }),
    };

    if (url) {
      if (isMiddleClick) {
        window.open(url, "_blank");
      } else {
        window.location.href = url;
      }
    }
  }

  if (type === BOOKMARK_EDIT) {
    const { url, title, id } = payload;

    newState = {
      ...newState,
      bookmarks: newState.bookmarks.map<IBookmark>((bookmark) => {
        if (bookmark.id === id) {
          console.log(getTitle(url, title), url, title);

          return {
            ...bookmark,
            url,
            title: getTitle(url, title),
            image: getFaviconURL(url),
          };
        }

        return bookmark;
      }),
    };
  }

  if (type === BOOKMARK_REMOVE) {
    newState = {
      ...newState,
      bookmarks: newState.bookmarks.filter((bookmark) => bookmark.id !== payload),
    };
  }

  if (type === LOCK_TOGGLE) {
    newState = {
      ...newState,
      locked: payload ?? !newState.locked,
    };
  }

  if (type === BOOKMARK_ADD_OR_EDIT) {
    newState = {
      ...newState,
      addOrEditBookmarkModal: payload,
    };
  }

  if (type === CHANGE_CLOCK_STATE) {
    const { clockState, clock } = payload;

    newState = {
      ...newState,
      [clock]: clockState,
    };
  }

  return saveToLocalStorage(newState, ["addOrEditBookmarkModal"]);
};

export { appReducer };
