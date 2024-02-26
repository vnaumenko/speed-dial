import {
  BOOKMARK_ADD,
  BOOKMARK_ADD_OR_EDIT,
  BOOKMARK_EDIT,
  BOOKMARK_GO,
  BOOKMARK_REMOVE,
  CHANGE_CLOCK_STATE,
  LOCK_TOGGLE,
} from "@/store/constants";
import {
  type AddBookmarkActionPayload,
  type ChangeClockStateActionPayload,
  type EditBookmarkActionPayload,
  type GoToBookmarkActionPayload,
  type OpenBookmarkModalActionPayload,
  type RemoveBookmarkActionPayload,
  type ToggleLockActionPayload,
} from "@/store/types";

const addBookmarkAction = (payload: AddBookmarkActionPayload) => ({
  type: BOOKMARK_ADD,
  payload,
});

const goToBookmarkAction = (payload: GoToBookmarkActionPayload) => ({
  type: BOOKMARK_GO,
  payload,
});

const editBookmarkAction = (payload: EditBookmarkActionPayload) => ({
  type: BOOKMARK_EDIT,
  payload,
});

const removeBookmarkAction = (payload: RemoveBookmarkActionPayload) => ({
  type: BOOKMARK_REMOVE,
  payload,
});

const toggleLockAction = (payload: ToggleLockActionPayload) => ({
  type: LOCK_TOGGLE,
  payload,
});

const openBookmarkModalAction = (payload: OpenBookmarkModalActionPayload) => ({
  type: BOOKMARK_ADD_OR_EDIT,
  payload,
});

const changeClockStateAction = (payload: ChangeClockStateActionPayload) => ({
  type: CHANGE_CLOCK_STATE,
  payload,
});

type Actions =
  | ReturnType<typeof addBookmarkAction>
  | ReturnType<typeof goToBookmarkAction>
  | ReturnType<typeof editBookmarkAction>
  | ReturnType<typeof removeBookmarkAction>
  | ReturnType<typeof toggleLockAction>
  | ReturnType<typeof openBookmarkModalAction>
  | ReturnType<typeof changeClockStateAction>;

export {
  addBookmarkAction,
  goToBookmarkAction,
  editBookmarkAction,
  removeBookmarkAction,
  toggleLockAction,
  openBookmarkModalAction,
  changeClockStateAction,
};
export type { Actions };
