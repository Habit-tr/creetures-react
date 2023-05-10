import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Challenge } from "../../../utils/supabaseTypes";

// const FETCH_ALLCHALLENGES_REQUEST = "FETCH_ALLCHALLENGES_REQUEST";
// const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
// const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
// const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// const fetchUsersRequest = () => ({
//   type: FETCH_USERS_REQUEST,
// });

// const fetchUsersSuccess = (users) => ({
//   type: FETCH_USERS_SUCCESS,
//   payload: users,
// });

// const fetchUsersFailure = (error) => ({
//   type: FETCH_USERS_FAILURE,
//   payload: error,
// });

// https://redux.js.org/usage/usage-with-typescript

interface allChallengesState {
  value: Challenge[];
}

const initialState: allChallengesState = { value: [] };

export const fetchAllChallengesAsync: any = createAsyncThunk(
  "fetchAllChallengesAsync",
  async () => {
    try {
      const { data } = await supabase.from("challenges").select();
      return data;
    } catch (err) {
      return err;
    }
  },
);

const allChallengesSlice = createSlice({
  name: "allChallenges",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllChallengesAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
  },
});

// export const fetchAllChallengesAsync = allChallengesSlice.actions;
export const selectChallenges = (state: RootState) => {
  return state.allChallenges.value;
};

export default allChallengesSlice.reducer;
