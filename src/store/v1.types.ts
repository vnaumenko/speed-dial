import type { BookmarkRecords, ClockRecords } from "./types";

export type FlagsV1 = {
  isEdit: boolean;
  bookmarkModal: "new" | string | null;
};

export type StateV1 = {
  flags: FlagsV1;
  settings: undefined;
  bookmarks: BookmarkRecords;
  clocks: ClockRecords;
};
