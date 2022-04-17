import { ActionType } from "../action-types";
import { Action } from "../actions";
import produce from "immer";

interface LoginState {
  login: boolean;
  name: string | null;
  error: string | null;
  order: string[];
  //   data: {
  //     [key: string]: Cell;
  //   };
}

const initialState: LoginState = {
  login: false,
  name: "initial_name",
  error: null,
  order: [],
  //   data: {},
};

const reducer = produce((state: LoginState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return state;
    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
