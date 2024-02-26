import React, { createContext, type ReactNode, useContext, useMemo, useReducer } from "react";
import type { AppContextType, IState } from "@/store/types";
import { appReducer } from "@/store/reducer";
import { getFromLocalStorage } from "@/helpers/storage";

const AppContext = createContext<AppContextType>({} as AppContextType);

const initialState: IState = {
  bookmarks: [],
  clock1: { timeZone: "Europe/Moscow", hide: true },
  clock2: { hide: false },
  clock3: { timeZone: "Asia/Omsk", hide: true },
  locked: false,
  addOrEditBookmarkModal: null,
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, getFromLocalStorage(initialState));

  const appContextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};

const useAppState = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }

  return context;
};

export { AppProvider, useAppState };
