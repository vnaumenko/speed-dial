export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  countClick: number;
  image?: string;
};

export type BookmarkRecords = Record<string, Bookmark>;

export type Clock = {
  id: string;
  timeZone: string;
};

export type ClockRecords = Record<string, Clock>;

export type Flags = {
  isEdit: boolean;
  bookmarkModal: "new" | string | null;
};

export type Settings = {
  size: Sizes;
};

export type StateV1 = {
  flags: Flags;
  settings: undefined;
  bookmarks: BookmarkRecords;
  clocks: ClockRecords;
};

export type StateV2 = {
  flags: Flags;
  settings: Settings;
  bookmarks: BookmarkRecords;
  clocks: ClockRecords;
};

export type State = {
  flags: Flags;
  settings: Settings;
  bookmarks: BookmarkRecords;
  clocks: ClockRecords;
};

export type Actions = {
  changeSize: (payload: Sizes) => void;
  toggleEditMode: () => void;
  addBookmark: () => void;
  createBookmark: (payload: { url: string; title?: string }) => void;
  editBookmark: (payload: string) => void;
  closeBookmarkModal: () => void;
  removeBookmark: (payload: string) => void;
  saveBookmark: (payload: { id: string; url: string; title?: string }) => void;
  goToBookmark: (payload: { id: string; isMiddleClick?: boolean }) => void;
  addClock: () => void;
  removeClock: (payload: string) => void;
  editClock: (payload: { id: string; timeZone: string }) => void;
};
