import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UsersListState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: UsersListState = {
  data: [],
  loading: false,
  error: false,
};

const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    getUsersList: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getUsersListSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getUsersListFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getUsersList, getUsersListSuccess, getUsersListFailure } =
  usersListSlice.actions;

export default usersListSlice.reducer;

export const fetchUsersList =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "usersList/getUsersList"
        | "usersList/getUsersListSuccess"
        | "usersList/getUsersListFailure";
    }) => void
  ) => {
    dispatch(getUsersList());
    try {
      const response = await services.getUpdateList();
      dispatch(getUsersListSuccess(response.data));
    } catch (err) {
      dispatch(getUsersListFailure());
    }
  };
