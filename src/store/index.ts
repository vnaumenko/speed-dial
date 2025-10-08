import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getFaviconURL } from "@/helpers/getFavicon";
import { getHostByUrl } from "@/helpers/getHostByUrl";
import { FOLDER_ALL } from "./contants";
import type { Actions, BookmarkRecords, State } from "./types";

// Поднимать версию, только после написания миграции
export const CURRENT_VERSION = 4;

const getTitle = (url: string, title?: string) => {
  if (title) return title;

  return getHostByUrl(url);
};

const initialState: State = {
  flags: {
    isEdit: true,
  },
  settings: {
    size: "md",
  },
  folders: {},
  selectedFolders: FOLDER_ALL,
  bookmarks: {},
  clocks: {},
};

export const useStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set, _get, store) => ({
        ...initialState,
        addFolder: (payload: string, callback: () => void) => {
          set((state) => {
            state.folders[crypto.randomUUID()] = payload;
            callback();
          });
        },
        editFolder: (payload: { id: string; newLabel: string }) => {
          set((state) => {
            state.folders[payload.id] = payload.newLabel;
          });
        },
        removeFolder: (payload) => {
          set((state) => {
            delete state.folders[payload];
            state.selectedFolders = FOLDER_ALL;
            for (const bookmark of Object.values(state.bookmarks)) {
              if (bookmark.folders?.includes(payload)) {
                bookmark.folders = bookmark.folders.filter(
                  (folder) => folder !== payload,
                );
              }
            }
          });
        },
        setSelectedFolders: (payload) => {
          set((state) => {
            state.selectedFolders = payload;
          });
        },
        setSize: (payload) => {
          set((state) => {
            state.settings.size = payload;
          });
        },
        toggleEditMode: (payload) => {
          set((state) => {
            state.flags.isEdit =
              payload === undefined ? !state.flags.isEdit : payload;
            state.selectedFolders = FOLDER_ALL;
          });
        },
        createBookmark: ({ url, title, folders }) => {
          set((state) => {
            const newId = crypto.randomUUID();

            state.bookmarks[newId] = {
              id: newId,
              url,
              title: getTitle(url, title),
              image: getFaviconURL(url),
              countClick: 0,
              folders,
            };
          });
        },
        removeBookmark: (id) => {
          set((state) => {
            delete state.bookmarks[id];
          });
        },
        saveBookmark: ({ id, url, title, folders }) => {
          set((state) => {
            state.bookmarks[id].url = url;
            state.bookmarks[id].title = getTitle(url, title);
            state.bookmarks[id].image = getFaviconURL(url);
            state.bookmarks[id].folders = folders;
          });
        },
        goToBookmark: (id) => {
          set((state) => {
            const bookmark = state.bookmarks[id];

            if (bookmark) {
              bookmark.countClick += 1;
            }
          });
        },
        addClock: () => {
          set((state) => {
            const newId = crypto.randomUUID();

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
        onImport: (file: File) => {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = (e) => {
            const data = JSON.parse(e.target?.result as string) as State &
              Actions;

            set({
              ...store.getInitialState(),
              ...data,
            });
          };
        },
        onExport: () => {
          set((state) => {
            const file = new Blob([JSON.stringify(state)], {
              type: "application/json",
            });

            const url = URL.createObjectURL(file);

            const a = document.createElement("a");
            a.href = url;
            a.download = `bookmarks_${new Date().toISOString()}.json`;
            a.click();

            URL.revokeObjectURL(url);
          });
        },
        onClearSettings: () => {
          set(store.getInitialState());
        },
      })),
      {
        name: "state",
        version: CURRENT_VERSION,
        // biome-ignore lint/suspicious/noExplicitAny: migration
        migrate: (persistedState: any, version: number) => {
          if (version === 1) {
            persistedState.settings = {
              size: "md",
            };
          }

          if (version === 2) {
            persistedState.bookmarks = Object.entries(
              persistedState.bookmarks as BookmarkRecords,
            ).reduce<BookmarkRecords>(
              (acc, [id, { image, ...otherBookmark }]) => {
                acc[id] = {
                  ...otherBookmark,
                  image: image?.endsWith("&size=32")
                    ? `${image?.slice(0, -8)}&size=64`
                    : image,
                };

                return acc;
              },
              {},
            );
          }

          if (version === 3) {
            delete persistedState.flags.bookmarkModal;
            persistedState.selectedFolders = FOLDER_ALL;
            persistedState.folders = {};
          }

          console.log(persistedState);

          return persistedState;
        },
      },
    ),
  ),
);
