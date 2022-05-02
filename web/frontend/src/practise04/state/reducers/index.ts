import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import categoriesReducer from "./categoriesReducer";

const reducers = combineReducers({
  login: loginReducer,
  categories: categoriesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
