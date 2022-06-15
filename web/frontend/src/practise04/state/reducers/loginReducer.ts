import { ActionType } from "../action-types";
import { Action } from "../actions";
import produce from "immer";

interface LoginState {
  login: boolean;
  email: string | null;
  uid: string | null;
  name: string | null;
  error: string | null;
  order: string[];
}

const initialState: LoginState = {
  login: false,
  email: null,
  uid: null,
  name: null,
  error: null,
  order: [],
};

const reducer = produce((state: LoginState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_UP:
      state = {
        ...state,
        login: true,
        email: action.payload.email,
        uid: action.payload.uid,
      };
      return state;
    case ActionType.LOGIN:
      state = {
        ...state,
        login: true,
        email: action.payload.email,
        uid: action.payload.uid,
      };
      return state;
    case ActionType.SIGN_OUT:
      return {
        login: false,
        email: null,
        uid: null,
      };
    default:
      return state;
  }
});

export default reducer;
