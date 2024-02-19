import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface DeleteUserState {
  data: string;
  loading: boolean;
  error: boolean;
}

const initialState: DeleteUserState = {
  data: "",
  loading: false,
  error: false,
};

const rankSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {
    deleteUser: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    deleteUserFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = "";
    },
  },
});

export const { deleteUser, deleteUserSuccess, deleteUserFailure } =
  rankSlice.actions;

export default rankSlice.reducer;

export const fetchDeleteUser =
  (id: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "deleteUser/deleteUser"
        | "deleteUser/deleteUserSuccess"
        | "deleteUser/deleteUserFailure";
    }) => void
  ) => {
    dispatch(deleteUser());
    try {
      await services.deleteUser(id);
      dispatch(deleteUserSuccess("sucesso"));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
