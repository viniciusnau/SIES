import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface RegisterState {
  data: string;
  loading: boolean;
  error: boolean;
}

const initialState: RegisterState = {
  data: "",
  loading: false,
  error: false,
};

const postRegisterSlice = createSlice({
  name: "postRegister",
  initialState,
  reducers: {
    postRegister: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    postRegisterSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    postRegisterFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = "";
    },
  },
});

export const { postRegister, postRegisterSuccess, postRegisterFailure } =
  postRegisterSlice.actions;

export default postRegisterSlice.reducer;

export const fetchPostRegister =
  (body: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "postRegister/postRegister"
        | "postRegister/postRegisterSuccess"
        | "postRegister/postRegisterFailure";
    }) => void
  ) => {
    dispatch(postRegister());
    try {
      await services.postRegister(body);
      dispatch(postRegisterSuccess("sucesso"));
    } catch (err) {
      dispatch(postRegisterFailure());
    }
  };
