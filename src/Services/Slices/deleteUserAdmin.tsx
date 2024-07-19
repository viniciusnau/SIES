import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface DeleteUserAdminState {
  data: string;
  loading: boolean;
  error: boolean;
}

const initialState: DeleteUserAdminState = {
  data: "",
  loading: false,
  error: false,
};

const deleteUserAdminSlice = createSlice({
  name: "deleteUserAdmin",
  initialState,
  reducers: {
    deleteUserAdmin: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    deleteUserAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    deleteUserAdminFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = "";
    },
  },
});

export const {
  deleteUserAdmin,
  deleteUserAdminSuccess,
  deleteUserAdminFailure,
} = deleteUserAdminSlice.actions;

export default deleteUserAdminSlice.reducer;

export const fetchDeleteUserAdmin =
  (id: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "deleteUserAdmin/deleteUserAdmin"
        | "deleteUserAdmin/deleteUserAdminSuccess"
        | "deleteUserAdmin/deleteUserAdminFailure";
    }) => void
  ) => {
    dispatch(deleteUserAdmin());
    try {
      await services.deleteUser(id);
      dispatch(deleteUserAdminSuccess("sucesso"));
      setTimeout(() => {
        dispatch(deleteUserAdminSuccess(""));
      }, 3000);
    } catch (err) {
      dispatch(deleteUserAdminFailure());
      setTimeout(() => {
        dispatch(deleteUserAdmin());
      }, 3000);
    }
  };
