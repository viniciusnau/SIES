import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { iGetCandidates } from "../../Types/Candidates";

interface CandidatesState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: CandidatesState = {
  data: [],
  loading: false,
  error: false,
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    getCandidates: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getCandidatesSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getCandidatesFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getCandidates, getCandidatesSuccess, getCandidatesFailure } =
  candidatesSlice.actions;

export default candidatesSlice.reducer;

export const fetchCandidates =
  (body: iGetCandidates) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "candidates/getCandidates"
        | "candidates/getCandidatesSuccess"
        | "candidates/getCandidatesFailure";
    }) => void
  ) => {
    dispatch(getCandidates());
    try {
      const response = await services.getCandidates(body);
      dispatch(getCandidatesSuccess(response.data));
    } catch (err) {
      dispatch(getCandidatesFailure());
    }
  };
