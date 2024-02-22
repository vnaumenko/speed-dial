import type { Dispatch } from "react";
import type { IBookmark } from "@/@types/bookmarks";
import type { IWidget } from "@/@types/widgets";
import {
  type addBookmarkAction,
  type openBookmarkModalAction,
  type removeBookmarkAction,
  type toggleLockAction,
} from "@/store/actions";

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

interface AddBookmarkActionPayload {
  url: string;
  title?: string;
}
type RemoveBookmarkActionPayload = string;
type ToggleLockActionPayload = boolean | never;
type OpenBookmarkModalActionPayload = {
  mode: "add" | "edit";
  id?: string;
} | null;

type Actions =
  | ReturnType<typeof addBookmarkAction>
  | ReturnType<typeof removeBookmarkAction>
  | ReturnType<typeof toggleLockAction>
  | ReturnType<typeof openBookmarkModalAction>;

export type {
  AppContextType,
  IState,
  Actions,
  AddBookmarkActionPayload,
  RemoveBookmarkActionPayload,
  ToggleLockActionPayload,
  OpenBookmarkModalActionPayload,
};
