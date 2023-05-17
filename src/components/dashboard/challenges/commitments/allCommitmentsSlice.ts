import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";
import { Database } from '../../../../utils/supabaseTypes';

interface allCommitmentsState {
  value: Database['public']['Tables']['commitments']['Row'][];
}

const initialState: allCommitmentsState = { value: [] };

export const fetchAllCommitmentsAsync: any = createAsyncThunk(
  'fetchAllCommitmentsAsync',
  async () => {
    try {
      const { data: fetchedCommitments } = await supabase
        .from('commitments')
        .select('id, badgeLevel, challenge_id, isUpToDate, user_id, challenge: challenges(name), reward: rewards(isClicked, name), timeframe, frequency');
      return fetchedCommitments;
    } catch (err) {
      console.error(err);
    }
  },
);

export const postNewCommitmentAsync: any = createAsyncThunk(
  'postNewCommitment',
  async ({
    challenge_id,
    frequency,
    goals,
    reward_id,
    timeframe,
    user_id,
  }: Database['public']['Tables']['commitments']['Insert']) => {
    try {
      const { data } = await supabase
        .from('commitments')
        .insert({
          challenge_id,
          frequency,
          goals,
          reward_id,
          timeframe,
          user_id,
        })
        .select();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

const allCommitmentsSlice = createSlice({
  name: "allCommitments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllCommitmentsAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['commitments']['Row'][]>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      postNewCommitmentAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['commitments']['Row']>) => {
        state.value.push(action.payload);
      },
    );
  },
});

export const selectCommitments = (state: RootState) => {
  return state.allCommitments.value;
};

export default allCommitmentsSlice.reducer;
