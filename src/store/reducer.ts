import { v4 } from "uuid";
import { saveToLocalStorage } from "@/store/helpers";
import { Actions, IState } from "@/store/types";

const appReducer = (state: IState, { type, payload }: Actions): IState => {
  const newState = { ...state };

  if (type === "@BOOKMARK/add") {
    const { url, title = url } = payload;
    const newId = v4();
    const nextOrder = state.bookmarks.length;

    newState.bookmarks.push({
      id: newId,
      order: nextOrder,
      url,
      title,
    });
  }

  if (type === "@BOOKMARK/remove") {
    newState.bookmarks = newState.bookmarks.filter((bookmark) => bookmark.id !== payload);
  }

  if (type === "@LOCK/toggle") {
    newState.locked = payload ?? !state.locked;
  }

  if (type === "@BOOKMARK/addOrEdit") {
    newState.modalAddOrEditBookmark = payload;
  }

  return saveToLocalStorage(newState, ["modalAddOrEditBookmark"]);
};

export { appReducer };
