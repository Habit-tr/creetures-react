import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from "../../../utils/supabaseTypes";

interface allEarnedRewardsState {
  value: Database["public"]["Tables"]["earned_rewards"]["Row"][];
}

const initialState: allEarnedRewardsState = { value: [] };

export const fetchAllEarnedRewardsAsync = createAsyncThunk(
  "earnedRewards/fetchAllAsync",
  async () => {
    try {
      const { data } = await supabase
        .from("earned_rewards")
        .select("*, rewards (name, description)");
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

interface postNewEarnedRewardProps {
  commitment_id: number;
  reward_id: number;
}

export const postNewEarnedRewardAsync = createAsyncThunk(
  "postNewEarnedRewardAsync",
  async ({
    commitment_id,
    reward_id,
  }: postNewEarnedRewardProps) => {
    try {
      const { data } = await supabase
        .from("earned_rewards")
        .insert({
          commitment_id: commitment_id,
          reward_id: reward_id,
        })
        .select();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

interface deleteEarnedRewardProps {
  id: number | string;
}

export const deleteEarnedRewardAsync = createAsyncThunk(
  "deleteEarnedRewardAsync",
  async ({ id }: deleteEarnedRewardProps) => {
    try {
      const { data } = await supabase
        .from("earned_rewards")
        .delete()
        .eq("id", id)
        .select();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

interface UpdateEarnedRewardProps {
  id: number | string;
  is_redeemed: boolean;
  date_redeemed: string;
}

export const updateEarnedRewardAsync = createAsyncThunk(
  "updateEarnedRewardAsync",
  async ({ id, is_redeemed, date_redeemed }: UpdateEarnedRewardProps) => {
    try {
      const { data } = await supabase
        .from("earned_rewards")
        .update({
          is_redeemed: is_redeemed,
          date_redeemed: date_redeemed,
        })
        .eq("id", id);
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

const allEarnedRewardsSlice = createSlice({
  name: "allEarnedRewards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllEarnedRewardsAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      postNewEarnedRewardAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value.push(action.payload);
      },
    );
    builder.addCase(
      deleteEarnedRewardAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = state.value.filter(
          (reward) => reward.id !== action.payload.id,
        );
      },
    );
    builder.addCase(
      updateEarnedRewardAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload && Array.isArray(action.payload)) {
          const updatedReward = action.payload[0];
          const index = state.value.findIndex(
            (reward) => reward.id === updatedReward.id,
          );
          if (index >= 0) {
            state.value[index] = updatedReward;
          }
        } else {
          console.error("action.payload is either null or not iterable");
        }
      },
    );
  },
});

export const selectEarnedRewards = (state: RootState) => {
  return state.allEarnedRewards.value;
};

export default allEarnedRewardsSlice.reducer;
