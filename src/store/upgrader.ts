import { type BookmarkRecords, type State, type StateV1, type StateV2 } from "./types";
import { CURRENT_VERSION } from "./index";

type Migrate = {
  (oldState: StateV1, version: 1): State;
  (oldState: StateV2, version: 2): State;
};

export const migrate: Migrate = (oldState, version) => {
  let currentVersion = version;
  const newState = { ...oldState } as State;

  while (currentVersion < CURRENT_VERSION) {
    if (currentVersion === 1) {
      newState.settings = {
        size: "md",
      };
    }

    if (currentVersion === 2) {
      newState.bookmarks = Object.entries(oldState.bookmarks).reduce<BookmarkRecords>(
        (acc, [id, { image, ...otherBookmark }]) => ({
          ...acc,
          [id]: {
            ...otherBookmark,
            image: image?.endsWith("&size=32") ? `${image?.slice(0, -8)}&size=64` : image,
          },
        }),
        {},
      );
    }

    currentVersion += 1;
  }

  return newState;
};
