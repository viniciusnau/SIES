import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ResidentState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: ResidentState = {
  data: [],
  loading: false,
  error: false,
};

const residentSlice = createSlice({
  name: "resident",
  initialState,
  reducers: {
    getResident: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getResidentSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getResidentFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getResident, getResidentSuccess, getResidentFailure } =
  residentSlice.actions;

export default residentSlice.reducer;

export const fetchResident =
  (filter: any, page: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "resident/getResident"
        | "resident/getResidentSuccess"
        | "resident/getResidentFailure";
    }) => void
  ) => {
    dispatch(getResident());
    try {
      const response = await services.getRankList(
        { ...filter, is_resident: true },
        page
      );
      dispatch(getResidentSuccess(response));
    } catch (err) {
      dispatch(getResidentFailure());
    }
  };
