import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rankSlice from "./Slices/rankSlice";
import residentSlice from "./Slices/residentSlice";
import postRegisterSlice from "./Slices/postRegister";
import putUserSlice from "./Slices/putUser";
import getUsersListSlice from "./Slices/getUsersList";
import loginSlice from "./Slices/getLogin";
import deleteUserSlice from "./Slices/deleteUser";
import getCandidates from "./Slices/getCandidates";
import updateCandidate from "./Slices/updateCandidate";
import adminList from "./Slices/adminList";

const reducer = combineReducers({
  rankSlice,
  residentSlice,
  postRegisterSlice,
  putUserSlice,
  getUsersListSlice,
  loginSlice,
  deleteUserSlice,
  getCandidates,
  updateCandidate,
  adminList,
});

export const store = configureStore({ reducer });
