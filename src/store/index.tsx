import React, { createContext, type ReactNode, useContext, useMemo, useReducer } from "react";
import type { AppContextType, IState } from "@/store/types";
import { getFromLocalStorage } from "@/store/helpers";
import { appReducer } from "@/store/reducer";

const AppContext = createContext<AppContextType>({} as AppContextType);

const initialState: IState = {
  bookmarks: [],
  widgets: [],
  locked: false,
  modalAddOrEditBookmark: null,
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
