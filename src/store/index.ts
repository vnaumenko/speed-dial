import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { v4 } from "uuid";
import { immer } from "zustand/middleware/immer";
import { type State, type Actions } from "@/store/types";
import { getHostByUrl } from "@/helpers/getHostByUrl";
import { getFaviconURL } from "@/helpers/getFavicon";

const getTitle = (url: string, title?: string) => {
  if (title) return title;

  return getHostByUrl(url);
};

const initialState: State = {
  flags: {
    isEdit: true,
    bookmarkModal: null,
  },
  bookmarks: {},
  clocks: {},
};

// @TODO remove next version
const oldState = ((): State => {
  const oldState = window.localStorage.getItem("state");

  if (oldState === null) return initialState;

  const parsedOldState = JSON.parse(oldState) as {
    bookmarks: Array<State["bookmarks"][0]>;
    clock1: { hide: boolean; timeZone?: string };
    clock2: { hide: boolean; timeZone?: string };
    clock3: { hide: boolean; timeZone?: string };
    version?: number;
  };

  const hasOldState = parsedOldState.version === undefined;

  if (hasOldState) {
    const newClocks: State["clocks"] = {};

    if (!parsedOldState.clock1.hide) {
      const newId = v4();

      newClocks[newId] = {
        id: newId,
        timeZone:
          parsedOldState.clock1.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }

    if (!parsedOldState.clock2.hide) {
      const newId = v4();

      newClocks[newId] = {
        id: newId,
        timeZone:
          parsedOldState.clock2.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }

    if (!parsedOldState.clock3.hide) {
      const newId = v4();

      newClocks[newId] = {
        id: newId,
        timeZone:
          parsedOldState.clock3.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }

    const newBookmarks = parsedOldState.bookmarks.reduce(
      (acc, bookmark) => ({
        ...acc,
        [bookmark.id]: bookmark,
      }),
      {},
    );

    return {
      ...initialState,
      bookmarks: newBookmarks,
      clocks: newClocks,
    };
  }

  return initialState;
})();

export const useStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        ...oldState,
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
        version: 1,
      },
    ),
  ),
);
