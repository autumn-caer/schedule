import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import randomMediumSlideReduer from "./randomMediumSlideReduer";
import randomSmallSlideReduer from "./randomSmallSlideReduer";
import categoriesReducer from "./categoriesReducer";

const reducers = combineReducers({
  login: loginReducer,
  randomMediumSlide: randomMediumSlideReduer,
  randomSmallSlide: randomSmallSlideReduer,
  categories: categoriesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
