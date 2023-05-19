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
  times_redeemed: number;
}

const initialState: allRewardsState = { value: [] };

export const fetchAllRewardsAsync: any = createAsyncThunk(
  'fetchAllRewardsAsync',
  async () => {
    try {
      const { data: fetchedRewards } = await supabase
      .from('rewards')
      .select('id, name, description, times_redeemed, date_last_redeemed');
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
    times_redeemed,
  }: postNewRewardProps) => {
    try {
      const { data } = await supabase
        .from("rewards")
        .insert({
          name: rewardName,
          description: description,
          user_id: user_id,
          times_redeemed: times_redeemed,
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

// Separate type for the ID
interface updateRewardId {
  id: number;
}

// Use the `Update` type for the fields to update
type updateRewardProps = updateRewardId & Database['public']['Tables']['rewards']['Update'];

export const updateRewardAsync: any = createAsyncThunk(
  'updateRewardAsync',
  async ({ id, ...fieldsToUpdate }: updateRewardProps) => {
    const { data, error } = await supabase
      .from("rewards")
      .update(fieldsToUpdate)
      .eq("id", id);
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('Failed to update reward');
    }
    return data[0];  // data is an array, so return the first element
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
    builder.addCase(
      updateRewardAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['rewards']['Row']>) => {
        const index = state.value.findIndex(
          (reward) => reward.id === action.payload.id
        );
        if (index !== -1) {
          state.value[index] = action.payload;
        }
      },
    );
  },
});

export const selectRewards = (state: RootState) => {
  return state.allRewards.value;
};

export default allRewardsSlice.reducer;