import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface RankState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: RankState = {
  data: [],
  loading: false,
  error: false,
};

const rankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    getRank: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getRankSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getRankFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getRank, getRankSuccess, getRankFailure } = rankSlice.actions;

export default rankSlice.reducer;

export const fetchRank =
  (filter: any, page: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "rank/getRank" | "rank/getRankSuccess" | "rank/getRankFailure";
    }) => void
  ) => {
    dispatch(getRank());
    try {
      const response = await services.getRankList(filter, page);
      dispatch(getRankSuccess(response));
    } catch (err) {
      dispatch(getRankFailure());
    }
  };
