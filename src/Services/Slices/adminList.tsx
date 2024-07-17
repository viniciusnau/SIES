import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { iGetAdminList } from "../../Types/Candidates";

interface AdminListState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: AdminListState = {
  data: [],
  loading: false,
  error: false,
};

const adminListSlice = createSlice({
  name: "adminList",
  initialState,
  reducers: {
    getAdminList: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getAdminListSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getAdminListFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getAdminList, getAdminListSuccess, getAdminListFailure } =
  adminListSlice.actions;

export default adminListSlice.reducer;

export const fetchAdminList =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "adminList/getAdminList"
        | "adminList/getAdminListSuccess"
        | "adminList/getAdminListFailure";
    }) => void
  ) => {
    dispatch(getAdminList());
    try {
      const response = await services.getAdminList();
      dispatch(getAdminListSuccess(response.data));
    } catch (err) {
      dispatch(getAdminListFailure());
    }
  };
