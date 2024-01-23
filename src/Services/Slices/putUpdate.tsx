import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface UpdateState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: UpdateState = {
  data: [],
  loading: false,
  error: false,
};

const putUpdateSlice = createSlice({
  name: "putUpdate",
  initialState,
  reducers: {
    putUpdate: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    putUpdateSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    putUpdateFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { putUpdate, putUpdateSuccess, putUpdateFailure } =
  putUpdateSlice.actions;

export default putUpdateSlice.reducer;

export const fetchPutUpdate =
  (body: any, id: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "putUpdate/putUpdate"
        | "putUpdate/putUpdateSuccess"
        | "putUpdate/putUpdateFailure";
    }) => void
  ) => {
    dispatch(putUpdate());
    try {
      const response = await services.putUpdate(body, id);
      dispatch(putUpdateSuccess(response.data));
    } catch (err) {
      dispatch(putUpdateFailure());
    }
  };
