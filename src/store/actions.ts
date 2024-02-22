import {
  BOOKMARK_ADD,
  BOOKMARK_ADD_OR_EDIT,
  BOOKMARK_REMOVE,
  LOCK_TOGGLE,
} from "@/store/constants";
import {
  type AddBookmarkActionPayload,
  type OpenBookmarkModalActionPayload,
  type RemoveBookmarkActionPayload,
  type ToggleLockActionPayload,
} from "@/store/types";

const addBookmarkAction = (payload: AddBookmarkActionPayload) => ({
  type: BOOKMARK_ADD,
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

export { addBookmarkAction, removeBookmarkAction, toggleLockAction, openBookmarkModalAction };
