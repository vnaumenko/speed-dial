export type Bookmark = {
  id: string;
  title: string;
  url: string;
  countClick: number;
  image?: string;
  folders: string[];
};

export type BookmarkRecords = Record<string, Bookmark>;

export type Clock = {
  id: string;
  timeZone: string;
};

export type ClockRecords = Record<string, Clock>;

export type Flags = {
  isEdit: boolean;
};

export type Settings = {
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

export type Folders = Record<string, string>;

export type State = {
  flags: Flags;
  settings: Settings;
  folders: Folders;
  selectedFolders: string;
  bookmarks: BookmarkRecords;
  clocks: ClockRecords;
};

export type Actions = {
  addFolder: (payload: string, callback: () => void) => void;
  editFolder: (payload: { id: string; newLabel: string }) => void;
  removeFolder: (payload: string) => void;
  setSelectedFolders: (payload: string) => void;
  setSize: (payload: Settings["size"]) => void;
  toggleEditMode: (payload?: boolean) => void;
  createBookmark: (payload: {
    url: string;
    title: string;
    folders: string[];
  }) => void;
  removeBookmark: (payload: string) => void;
  saveBookmark: (payload: {
    id: string;
    url: string;
    title: string;
    folders: string[];
  }) => void;
  goToBookmark: (payload: string) => void;
  addClock: () => void;
  removeClock: (payload: string) => void;
  editClock: (payload: { id: string; timeZone: string }) => void;
  onImport: (payload: File) => void;
  onExport: () => void;
  onClearSettings: () => void;
};
