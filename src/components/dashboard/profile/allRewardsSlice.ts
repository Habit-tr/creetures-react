import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from '../../../utils/supabaseTypes';

interface allRewardsState {
  value: Database['public']['Tables']['rewards']['Row'][];
}

interface postNewRewardProps {
  rewardName: string;
  description: string;
  user_id: string;
  timesRedeemed: number;
}

const initialState: allRewardsState = { value: [] };

export const fetchAllRewardsAsync: any = createAsyncThunk(
  'fetchAllRewardsAsync',
  async () => {
    try {
      const { data: fetchedRewards } = await supabase
      .from('rewards')
      .select('id, name, description, timesRedeemed, dateLastRedeemed');
      return fetchedRewards;
    } catch (err) {
      console.error(err);
    }
  },
);

export const postNewRewardAsync: any = createAsyncThunk(
  'postNewRewardAsync',
  async({
    rewardName,
    description,
    user_id,
    timesRedeemed,
  }: postNewRewardProps) => {
    try {
      const { data } = await supabase
        .from("rewards")
        .insert({
          name: rewardName,
          description: description,
          user_id: user_id,
          timesRedeemed: timesRedeemed,
        })
        .select();
      return data;
    } catch (error) {
      return error;
    }
  },
);

interface deleteRewardProps {
  id: number | string;
}

export const deleteRewardAsync: any = createAsyncThunk(
  'deleteRewardAsync',
  async ({ id }: deleteRewardProps) => {
    try {
      const { data } = await supabase
        .from("rewards")
        .delete()
        .eq("id", id)
        .select();
        return data;
    } catch (error) {
      return error;
    }
  },
);

const allRewardsSlice = createSlice({
  name: "allRewards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllRewardsAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      postNewRewardAsync.fulfilled,
      (state, action: PayloadAction<any>) => { //should I use update here? gives me linter error
        state.value.push(...action.payload);
      },
    );
    builder.addCase(
      deleteRewardAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['rewards']['Row']>) => {
        state.value = state.value.filter(
          (reward) => reward.id !== action.payload.id,
        );
      },
    );
  },
});

export const selectRewards = (state: RootState) => {
  return state.allRewards.value;
};

export default allRewardsSlice.reducer;