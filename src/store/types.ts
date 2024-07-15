export type State = {
  flags: {
    isEdit: boolean;
    bookmarkModal: "new" | string | null;
  };
  bookmarks: Record<
    string,
    {
      id: string;
      title: string;
      url: string;
      countClick: number;
      image?: string;
    }
  >;
  clocks: Record<
    string,
    {
      id: string;
      timeZone: string;
    }
  >;
};

export type Actions = {
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
