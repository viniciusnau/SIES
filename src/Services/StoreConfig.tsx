import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rankSlice from "./Slices/rankSlice";

const reducer = combineReducers({
  rankSlice,
});

export const store = configureStore({ reducer });
