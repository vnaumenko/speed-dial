import { IState } from "@/store/types";
import { omit } from "@/helpers/omit";

const KEY_OF_LOCAL_STORAGE = "state";

const saveToLocalStorage = (state: IState, keyOfNoSave: (keyof IState)[]): IState => {
  localStorage.setItem(
    KEY_OF_LOCAL_STORAGE,

    JSON.stringify(omit(state, keyOfNoSave)),
  );

  return state;
};

const getFromLocalStorage = (initialState: IState): IState => {
  const state = localStorage.getItem(KEY_OF_LOCAL_STORAGE);

  if (state) {
    return {
      ...initialState,
      ...JSON.parse(state),
    };
  }

  return initialState;
};

export { saveToLocalStorage, getFromLocalStorage };
