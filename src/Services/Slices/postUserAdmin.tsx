import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UserAdminState {
  data: string;
  loading: boolean;
  error: boolean;
}

const initialState: UserAdminState = {
  data: "",
  loading: false,
  error: false,
};

const postUserAdminSlice = createSlice({
  name: "postUserAdmin",
  initialState,
  reducers: {
    postUserAdmin: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    postUserAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    postUserAdminFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = "";
    },
  },
});

export const { postUserAdmin, postUserAdminSuccess, postUserAdminFailure } =
  postUserAdminSlice.actions;

export default postUserAdminSlice.reducer;

export const fetchpostUserAdmin =
  (body: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "postUserAdmin/postUserAdmin"
        | "postUserAdmin/postUserAdminSuccess"
        | "postUserAdmin/postUserAdminFailure";
    }) => void
  ) => {
    dispatch(postUserAdmin());
    try {
      await services.postRegister(body);
      dispatch(postUserAdminSuccess("sucesso"));
    } catch (err) {
      dispatch(postUserAdminFailure());
    }
  };
