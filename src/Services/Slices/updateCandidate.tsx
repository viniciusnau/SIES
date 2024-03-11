import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface CandidateState {
  data: string;
  loading: boolean;
  error: boolean;
}

const initialState: CandidateState = {
  data: "",
  loading: false,
  error: false,
};

const udpateCandidateSlice = createSlice({
  name: "updateCandidate",
  initialState,
  reducers: {
    updateCandidate: (state) => {
      state.loading = true;
      state.error = false;
      state.data = "";
    },
    updateCandidateSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    updateCandidateFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = "";
    },
  },
});

export const {
  updateCandidate,
  updateCandidateSuccess,
  updateCandidateFailure,
} = udpateCandidateSlice.actions;

export default udpateCandidateSlice.reducer;

export const fetchUpdateRegister =
  (id: any, body: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "updateCandidate/updateCandidate"
        | "updateCandidate/updateCandidateSuccess"
        | "updateCandidate/updateCandidateFailure";
    }) => void
  ) => {
    dispatch(updateCandidate());
    try {
      const { registration, ...prev } = body;
      await services.putCandidate(id, prev);
      dispatch(updateCandidateSuccess("sucesso"));
    } catch (err) {
      dispatch(updateCandidateFailure());
    }
  };
