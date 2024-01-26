import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rankSlice from "./Slices/rankSlice";
import postRegisterSlice from "./Slices/postRegister";
import putUserSlice from "./Slices/putUser";
import getUsersListSlice from "./Slices/getUsersList";

const reducer = combineReducers({
  rankSlice,
  postRegisterSlice,
  putUserSlice,
  getUsersListSlice,
});

export const store = configureStore({ reducer });
