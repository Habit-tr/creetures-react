import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from '../../../utils/supabaseTypes';


export const fetchSingleRewardAsync: any = createAsyncThunk(
  "fetchSingleRewardAsync",
  async({ id }: Database['public']['Tables']['rewards']['Update']) => {
    try {
      const { data } = await supabase
      .from("rewards")
      .select()
      .match({ id: id })
      .single();
      return data;
    } catch (err) {
      return err;
    }
  },
);

interface singleRewardState {
  value: Database['public']['Tables']['rewards']['Update'];
}

const initialState: singleRewardState = { value: {} };

const singleRewardSlice = createSlice({
  name:"singleReward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSingleRewardAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['rewards']['Update']>) => {
        state.value = action.payload;
      },
    );
  },
});

export const selectReward = (state: RootState) => {
  return state.singleReward.value;
};

export default singleRewardSlice.reducer;