import type { Dispatch } from "react";
import type { IBookmark } from "@/@types/bookmarks";
import { type Actions } from "@/store/actions";

interface IClockState {
  hide: boolean;
  timeZone?: string;
}

type AddOrEditBookmarkModalState = "new" | string | null;

interface IState {
  bookmarks: IBookmark[];
  locked: boolean;
  /**
   * new - add mode
   * string - edit mode
   * null - closed
   */
  addOrEditBookmarkModal: AddOrEditBookmarkModalState;
  clock1: IClockState;
  clock2: IClockState;
  clock3: IClockState;
}

interface AppContextType {
  state: IState;
  dispatch: Dispatch<Actions>;
}

interface AddBookmarkActionPayload {
  url: string;
  title?: string;
}

interface GoToBookmarkActionPayload {
  id: string;
  isMiddleClick?: boolean;
}

interface EditBookmarkActionPayload extends AddBookmarkActionPayload {
  id: string;
}

type RemoveBookmarkActionPayload = string;

type ToggleLockActionPayload = boolean | void;

type OpenBookmarkModalActionPayload = AddOrEditBookmarkModalState;

interface ChangeClockStateActionPayload {
  clock: "clock1" | "clock2" | "clock3";
  clockState: Partial<IClockState>;
}

export type {
  AppContextType,
  IState,
  AddBookmarkActionPayload,
  GoToBookmarkActionPayload,
  EditBookmarkActionPayload,
  RemoveBookmarkActionPayload,
  ToggleLockActionPayload,
  ChangeClockStateActionPayload,
  OpenBookmarkModalActionPayload,
};
