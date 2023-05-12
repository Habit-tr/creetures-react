import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from '../../../utils/supabaseTypes';

interface allRewardsState {
  value: Database['public']['Tables']['rewards']['Row'][];
}

const initialState: allRewardsState = { value: [] };

export const fetchAllRewardsAsync: any = createAsyncThunk(
  'fetchAllRewardsAsync',
  async () => {
    try {
      const { data: fetchedRewards } = await supabase
      .from('rewards')
      .select('id, name, description, timesRedeemed');
      return fetchedRewards;
    } catch (err) {
      console.error(err);
    }
  },
);

const allRewardsSlice = createSlice({
  name: "allRewards",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(
      fetchAllRewardsAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
  },
});

export const selectRewards = (state: RootState) => {
  return state.allRewards.value;
};

export default allRewardsSlice.reducer;