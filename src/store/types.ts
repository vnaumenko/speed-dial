import type { IBookmark } from "@/@types/bookmarks";
import type { IWidget } from "@/@types/widgets";
import type { Dispatch } from "react";

interface AddBookmarkAction {
  type: "@BOOKMARK/add";
  payload: {
    url: string;
    title?: string;
  };
}

interface RemoveBookmarkAction {
  type: "@BOOKMARK/remove";
  payload: string;
}

interface ToggleLockAction {
  type: "@LOCK/toggle";
  payload?: boolean;
}

interface AddOrEditBookmarkAction {
  type: "@BOOKMARK/addOrEdit";
  payload: {
    mode: "add" | "edit";
    id?: string;
  } | null;
}

type Actions =
  | AddBookmarkAction
  | RemoveBookmarkAction
  | ToggleLockAction
  | AddOrEditBookmarkAction;

interface IState {
  bookmarks: IBookmark[];
  widgets: IWidget[];
  locked: boolean;
  modalAddOrEditBookmark: {
    mode: "add" | "edit";
    id?: string;
  } | null;
}

interface AppContextType {
  state: IState;
  dispatch: Dispatch<Actions>;
}

export type {
  AppContextType,
  IState,
  Actions,
  AddBookmarkAction,
  RemoveBookmarkAction,
  ToggleLockAction,
};
