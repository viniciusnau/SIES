import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rankSlice from "./Slices/rankSlice";
import residentSlice from "./Slices/residentSlice";
import postRegisterSlice from "./Slices/postRegister";
import putUserSlice from "./Slices/putUser";
import getUsersListSlice from "./Slices/getUsersList";
import loginSlice from "./Slices/getLogin";
import deleteUserSlice from "./Slices/deleteUser";
import getCandidates from "./Slices/getCandidates";

const reducer = combineReducers({
  rankSlice,
  residentSlice,
  postRegisterSlice,
  putUserSlice,
  getUsersListSlice,
  loginSlice,
  deleteUserSlice,
  getCandidates,
});

export const store = configureStore({ reducer });
