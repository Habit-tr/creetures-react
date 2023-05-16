import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from '../../../utils/supabaseTypes';

interface singleChallengeState {
  value: Database['public']['Tables']['challenges']['Update'];
}

const initialState: singleChallengeState = { value: {} as Database['public']['Tables']['challenges']['Row'] };

export const fetchSingleChallengeAsync: any = createAsyncThunk(
  "fetchSingleChallengeAsync",
  async ({ id }: Database['public']['Tables']['challenges']['Update']) => {
    try {
      const { data } = await supabase
        .from("challenges")
        .select(`*, category: categories(name)`)
        .match({ id })
        .single();
      return data;
    } catch (err) {
      return err;
    }
  },
);

// THIS IS SO DUMB... but it works. Do not understand why I could not refactor the above thunk to work in SingleChallenge how it does in AddCommitment
export const fetchSingleChallengeAsync2: any = createAsyncThunk(
  "fetchSingleChallengeAsync2",
  async (id) => {
    try {
      const { data } = await supabase
        .from("challenges")
        .select(`*, category: categories(name)`)
        .match({ id })
        .single();
      return data;
    } catch (err) {
      return err;
    }
  },
);

interface updatedChallenge {
  id: number;
  name: string;
  description: string | null;
  categoryId: number;
}

export const editChallengeAsync: any = createAsyncThunk(
  "editChallengeAsync",
  async (updatedChallenge: updatedChallenge) => {
    try {
      const { data } = await supabase
        .from("challenges")
        .update({
          name: updatedChallenge.name,
          description: updatedChallenge.description,
          category_id: updatedChallenge.categoryId,
        })
        .eq("id", updatedChallenge.id)
        .select();
      return data;
    } catch (error) {
      return error;
    }
  },
);

//remember to check Supabase for the code to use with each individual database table

//this is redundant with fetchSingleChallengeProps;
//could refactor to merge them:

const singleChallengeSlice = createSlice({
  name: "singleChallenge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSingleChallengeAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['challenges']['Row']>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      fetchSingleChallengeAsync2.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['challenges']['Row']>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      editChallengeAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['challenges']['Update']>) => {
        state.value = action.payload;
      },
    );
  },
});

// export const fetchAllChallengesAsync = allChallengesSlice.actions;
export const selectChallenge = (state: RootState) => {
  return state.singleChallenge.value;
};

export default singleChallengeSlice.reducer;
