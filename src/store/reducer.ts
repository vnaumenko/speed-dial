import { v4 } from "uuid";
import { saveToLocalStorage } from "@/store/helpers";
import { type Actions, type IState } from "@/store/types";
import {
  BOOKMARK_ADD,
  BOOKMARK_ADD_OR_EDIT,
  BOOKMARK_REMOVE,
  LOCK_TOGGLE,
} from "@/store/constants";

const appReducer = (state: IState, { type, payload }: Actions): IState => {
  let newState = { ...state };

  if (type === BOOKMARK_ADD) {
    console.log({ payload });
    const { url, title = url } = payload;
    const newId = v4();
    const nextOrder = state.bookmarks.length;

    newState = {
      ...newState,
      bookmarks: [
        ...newState.bookmarks,
        {
          id: newId,
          order: nextOrder,
          url,
          title,
          image: `https://www.google.com/s2/favicons?domain=${url}&sz=32`,
        },
      ],
    };
  }

  if (type === BOOKMARK_REMOVE) {
    newState.bookmarks = newState.bookmarks.filter((bookmark) => bookmark.id !== payload);
  }

  if (type === LOCK_TOGGLE) {
    newState.locked = payload ?? !state.locked;
  }

  if (type === BOOKMARK_ADD_OR_EDIT) {
    newState.modalAddOrEditBookmark = payload;
  }

  return saveToLocalStorage(newState, ["modalAddOrEditBookmark"]);
};

export { appReducer };
