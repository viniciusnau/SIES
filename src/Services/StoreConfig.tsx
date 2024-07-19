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
import getAdminList from "./Slices/getAdminList";
import updateUserAdmin from "./Slices/updateUserAdmin";
import deleteUserAdmin from "./Slices/deleteUserAdmin";

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
  getAdminList,
  updateUserAdmin,
  deleteUserAdmin,
});

export const store = configureStore({ reducer });
