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
        // console.log('all earned rewards: ', data);
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

interface postNewEarnedRewardProps {
  commitment_id: number;
  reward_id: number;
  user_id: string;
}

export const postNewEarnedRewardAsync = createAsyncThunk(
  "postNewEarnedRewardAsync",
  async ({
    commitment_id,
    reward_id,
    user_id,
  }: postNewEarnedRewardProps) => {
    try {
      const { data } = await supabase
        .from("earned_rewards")
        .insert({
          commitment_id: commitment_id,
          reward_id: reward_id,
          user_id: user_id,
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
  id: number;
  is_redeemed: boolean;
  user_id: string;
}

export const updateEarnedRewardAsync = createAsyncThunk(
  "updateEarnedRewardAsync",
  async ({ id, is_redeemed, user_id }: UpdateEarnedRewardProps) => {
    try {
      const { error: updateError } = await supabase
        .from("earned_rewards")
        .update({
          is_redeemed: is_redeemed,
          user_id: user_id,
        })
        .eq("id", id);

      if (updateError) {
        console.error('Error updating reward:', updateError);
        return;
      }

      const { data: fetchdata, error: fetchError } = await supabase
        .from('earned_rewards')
        .select('*')
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error('Error fetching updated data:', fetchError);
        return;
      }

      if (fetchdata) {
        // console.log(fetchdata);
        return fetchdata;
      } else {
        console.error('Data is null');
        return;
      }

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
        if (action.payload) {
          const index = state.value.findIndex(
            (reward) => reward.id === action.payload.id
          );
          if (index !== -1) {
            state.value[index] = action.payload;
          }
        } else {
          console.error('Action payload is null');
        }
      },
    );
  },
});

export const selectEarnedRewards = (state: RootState) => {
  return state.allEarnedRewards.value;
};

export default allEarnedRewardsSlice.reducer;
