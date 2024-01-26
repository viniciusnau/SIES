import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UserState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: false,
};

const putUserSlice = createSlice({
  name: "putUser",
  initialState,
  reducers: {
    putUser: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    putUserSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    putUserFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { putUser, putUserSuccess, putUserFailure } = putUserSlice.actions;

export default putUserSlice.reducer;

export const fetchPutUser =
  (body: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "putUser/putUser"
        | "putUser/putUserSuccess"
        | "putUser/putUserFailure";
    }) => void
  ) => {
    dispatch(putUser());
    try {
      const response = await services.putUser(body, body.id);
      dispatch(putUserSuccess(response.data));
    } catch (err) {
      dispatch(putUserFailure());
    }
  };
