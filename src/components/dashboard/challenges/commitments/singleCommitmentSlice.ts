import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";
import { Database } from "../../../../utils/supabaseTypes";

interface singleCommitmentsState {
  value: Database["public"]["Tables"]["commitments"]["Row"];
}

const initialState: singleCommitmentsState = {
  value: {
    badge_level: 1,
    challenge: {
      category: {
        name: "",
      },
      category_id: 0,
      name: "",
    },
    challenge_id: 0,
    created_at: null,
    frequency: "",
    goals: null,
    id: 0,
    is_clicked: false,
    is_active: true,
    is_up_to_date: true,
    reward: {
      is_clicked: false,
      name: "",
    },
    reward_id: 0,
    timeframe: "",
    updated_at: null,
    user_id: "",
    xp_counters: 0,
  },
};

export const fetchSingleCommitmentAsync: any = createAsyncThunk(
  "fetchSingleCommitmentAsync",
  async (id) => {
    try {
      const { data: fetchedCommitment } = await supabase
        .from("commitments")
        .select(
          "*, challenge: challenges(category_id, name, category: categories(name)), reward: rewards(is_clicked, name)",
        )
        .match({ id })
        .single();
      return fetchedCommitment;
    } catch (err) {
      console.error(err);
    }
  },
);

export const editCommitmentAsync: any = createAsyncThunk(
  "editCommitmentAsync",
  async (
    updatedCommitment: Database["public"]["Tables"]["commitments"]["Update"],
  ) => {
    try {
      const { data } = await supabase
        .from("commitments")
        .update({
          frequency: updatedCommitment.frequency,
          goals: updatedCommitment.goals,
          reward_id: updatedCommitment.reward_id,
          timeframe: updatedCommitment.timeframe,
          is_clicked: updatedCommitment.is_clicked,
          updated_at: updatedCommitment.updated_at,

        })
        .eq("id", updatedCommitment.id)
        .select()
        .single();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

const singleCommitmentSlice = createSlice({
  name: "singleCommitment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSingleCommitmentAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["commitments"]["Row"]
        >,
      ) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      editCommitmentAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["commitments"]["Row"]
        >,
      ) => {
        state.value = action.payload;
      },
    );
  },
});

export const selectCommitment = (state: RootState) => {
  return state.singleCommitment.value;
};

export default singleCommitmentSlice.reducer;
