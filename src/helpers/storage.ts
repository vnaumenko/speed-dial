import { type IState } from "@/store/types";
import { omit } from "@/helpers/omit";

const KEY_OF_LOCAL_STORAGE = "state";

const saveToLocalStorage = (state: IState, keyOfNoSave: Array<keyof IState>): IState => {
  const json = JSON.stringify(omit(state, keyOfNoSave));

  localStorage.setItem(KEY_OF_LOCAL_STORAGE, json);

  return state;
};

const getFromLocalStorage = (initialState: IState): IState => {
  const persistedState = localStorage.getItem(KEY_OF_LOCAL_STORAGE);

  if (persistedState === null) return initialState;

  return {
    ...initialState,
    ...(JSON.parse(persistedState) as IState),
  };
};

export { saveToLocalStorage, getFromLocalStorage };
