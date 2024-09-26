import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { v4 } from "uuid";
import { immer } from "zustand/middleware/immer";
import { type State, type Actions, type StateV1, StateV2 } from "./types";
import { migrate } from "./upgrader";
import { getHostByUrl } from "@/helpers/getHostByUrl";
import { getFaviconURL } from "@/helpers/getFavicon";

export const CURRENT_VERSION = 3;

const getTitle = (url: string, title?: string) => {
  if (title) return title;

  return getHostByUrl(url);
};

const initialState: State = {
  flags: {
    isEdit: true,
    bookmarkModal: null,
  },
  settings: {
    size: "md",
  },
  bookmarks: {},
  clocks: {},
};

export const useStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        changeSize: (size) => {
          set((state) => {
            state.settings.size = size;
          });
        },
        toggleEditMode: () => {
          set((state) => {
            state.flags.isEdit = !state.flags.isEdit;
          });
        },
        addBookmark: () => {
          set((state) => {
            state.flags.bookmarkModal = "new";
          });
        },
        createBookmark: ({ url, title }) => {
          set((state) => {
            const newId = v4();

            state.bookmarks[newId] = {
              id: newId,
              url,
              title: getTitle(url, title),
              image: getFaviconURL(url),
              countClick: 0,
            };

            state.flags.bookmarkModal = null;
          });
        },
        editBookmark: (id) => {
          set((state) => {
            state.flags.bookmarkModal = id;
          });
        },
        closeBookmarkModal: () => {
          set((state) => {
            state.flags.bookmarkModal = null;
          });
        },
        removeBookmark: (id) => {
          set((state) => {
            delete state.bookmarks[id];
          });
        },
        saveBookmark: ({ id, url, title }) => {
          set((state) => {
            state.bookmarks[id] = {
              id,
              url,
              title: getTitle(url, title),
              image: getFaviconURL(url),
              countClick: state.bookmarks[id].countClick,
            };

            state.flags.bookmarkModal = null;
          });
        },
        goToBookmark: ({ id, isMiddleClick }) => {
          set((state) => {
            const bookmark = state.bookmarks[id];

            if (bookmark) {
              bookmark.countClick += 1;

              if (isMiddleClick) {
                window.open(bookmark.url, "_blank");
              } else {
                window.location.href = bookmark.url;
              }
            }
          });
        },
        addClock: () => {
          set((state) => {
            const newId = v4();

            state.clocks[newId] = {
              id: newId,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
          });
        },
        removeClock: (id) => {
          set((state) => {
            delete state.clocks[id];
          });
        },
        editClock: ({ id, timeZone }) => {
          set((state) => {
            state.clocks[id].timeZone = timeZone;
          });
        },
      })),
      {
        name: "state",
        version: CURRENT_VERSION,
        // @ts-expect-error
        migrate: (oldState, version) => migrate(oldState, version),
      },
    ),
  ),
);
