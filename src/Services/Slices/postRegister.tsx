import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface RegisterState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: RegisterState = {
  data: [],
  loading: false,
  error: false,
};

const postRegisterSlice = createSlice({
  name: "postRegister",
  initialState,
  reducers: {
    postRegister: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    postRegisterSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    postRegisterFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
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
      const response = await services.postRegister(body);
      dispatch(postRegisterSuccess(response.data));
    } catch (err) {
      dispatch(postRegisterFailure());
    }
  };
