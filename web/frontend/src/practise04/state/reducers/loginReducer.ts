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
  console.log("inside reducer");
  console.log(action);
  switch (action.type) {
    case ActionType.SIGN_UP:
      console.log("SIGN_UP");
      state = {
        ...state,
        login: true,
        email: action.payload.email,
        uid: action.payload.uid,
      };
      console.log(state);
      return state;
    case ActionType.LOGIN:
      console.log("LOGIN");
      console.log(action.payload.email);
      console.log(action.payload.uid);
      state = {
        ...state,
        login: true,
        email: action.payload.email,
        uid: action.payload.uid,
      };
      console.log(state);
      return state;
    default:
      console.log("OTHEER");
      console.log(state);
      return state;
  }
});

export default reducer;
