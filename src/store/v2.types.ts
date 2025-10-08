import type { BookmarkRecords, ClockRecords, Settings } from "./types";

export type FlagsV2 = {
  isEdit: boolean;
  bookmarkModal: "new" | string | null;
};

export type StateV2 = {
  flags: FlagsV2;
  settings: Settings;
  bookmarks: BookmarkRecords;
  clocks: ClockRecords;
};
