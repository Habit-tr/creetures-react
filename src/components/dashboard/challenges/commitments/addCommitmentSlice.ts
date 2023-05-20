import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";

interface ChallengeId {
  challenge_id: number;
}

const initialState: ChallengeId[] = [];

export const fetchCommitmentChallengeIdsAsync: any = createAsyncThunk(
  "fetchCommitmentChallengeIds",
  async (userId: string) => {
    try {
      const { data: fetchedChallengeIds } = await supabase
        .from("commitments")
        .select("challenge_id")
        .eq("user_id", userId);
      return fetchedChallengeIds;
    } catch (err) {
      console.error(err);
    }
  },
);

const addCommitmentSlice = createSlice({
  name: "commitmentChallengeIds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCommitmentChallengeIdsAsync.fulfilled, (state, action: PayloadAction<ChallengeId[]>) => {
        return action.payload;
      },
    );
  },
});

export const selectCommitmentChallengeIds = (state: RootState) => {
  return state.commitmentChallengeIds;
};

export default addCommitmentSlice.reducer;
