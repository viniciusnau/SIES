import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UserState {
  data: string;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  data: "",
  loading: false,
  error: false,
};

const updateUserAdminSlice = createSlice({
  name: "updateUserAdmin",
  initialState,
  reducers: {
    updateUserAdmin: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    updateUserAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    updateUserAdminFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = "";
    },
  },
});

export const {
  updateUserAdmin,
  updateUserAdminSuccess,
  updateUserAdminFailure,
} = updateUserAdminSlice.actions;

export default updateUserAdminSlice.reducer;

export const fetchUpdateUserAdmin =
  (id: any, body: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "updateUserAdmin/updateUserAdmin"
        | "updateUserAdmin/updateUserAdminSuccess"
        | "updateUserAdmin/updateUserAdminFailure";
    }) => void
  ) => {
    dispatch(updateUserAdmin());
    try {
      const { registration, ...prev } = body;
      await services.putCandidate(id, prev);
      dispatch(updateUserAdminSuccess("sucesso"));
    } catch (err) {
      dispatch(updateUserAdminFailure());
    }
  };
