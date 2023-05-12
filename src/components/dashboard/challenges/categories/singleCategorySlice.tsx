import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";
import { Database } from "../../../../utils/supabaseTypes";

export const fetchSingleCategoryAsync: any = createAsyncThunk(
  "fetchSingleCategoryAsync",
  async ({ id }: Database["public"]["Tables"]["categories"]["Update"]) => {
    try {
      const { data } = await supabase
        .from("categories")
        .select()
        .match({ id: id })
        .single();
      return data;
      /*
const { data: category } = await supabase
        .from("categories")
        .select("id")
        .match({ name })
        .single();
      const { data: challenges } = await supabase
        .from("challenges")
        .select()
        .eq("category_id", category?.id);
*/
    } catch (err) {
      return err;
    }
  },
);

interface updatedCategory {
  id: number;
  name: string;
}

export const editCategoryAsync: any = createAsyncThunk(
  "editCategoryAsync",
  async (updatedCategory: updatedCategory) => {
    try {
      const { data } = await supabase
        .from("categories")
        .update({
          name: updatedCategory.name,
        })
        .eq("id", updatedCategory.id)
        .select();
      return data;
    } catch (error) {
      return error;
    }
  },
);

interface singleCategoryState {
  value: Database["public"]["Tables"]["categories"]["Update"];
}

const initialState: singleCategoryState = { value: {} };

const singleCategorySlice = createSlice({
  name: "singleCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSingleCategoryAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["categories"]["Row"]
        >,
      ) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      editCategoryAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["challenges"]["Update"]
        >,
      ) => {
        state.value = action.payload;
      },
    );
  },
});

// export const fetchAllChallengesAsync = allChallengesSlice.actions;
export const selectCategory = (state: RootState) => {
  return state.singleCategory.value;
};

export default singleCategorySlice.reducer;
