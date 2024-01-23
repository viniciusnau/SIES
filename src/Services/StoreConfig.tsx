import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rankSlice from "./Slices/rankSlice";
import postRegisterSlice from "./Slices/postRegister";
import putUpdateSlice from "./Slices/putUpdate";

const reducer = combineReducers({
  rankSlice,
  postRegisterSlice,
  putUpdateSlice,
});

export const store = configureStore({ reducer });
