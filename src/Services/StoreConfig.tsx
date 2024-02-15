import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rankSlice from "./Slices/rankSlice";
import residentSlice from "./Slices/residentSlice";
import postRegisterSlice from "./Slices/postRegister";
import putUserSlice from "./Slices/putUser";
import getUsersListSlice from "./Slices/getUsersList";
import loginSlice from "./Slices/getLogin";
import a11ySlice from "./Slices/a11ySlice";

const reducer = combineReducers({
  rankSlice,
  residentSlice,
  postRegisterSlice,
  putUserSlice,
  getUsersListSlice,
  loginSlice,
  a11ySlice
});

export const store = configureStore({ reducer });
