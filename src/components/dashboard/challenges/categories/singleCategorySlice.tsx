import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";
import { Database } from "../../../../utils/supabaseTypes";

export const fetchSingleCategoryAsync: any = createAsyncThunk(
  "fetchSingleCategoryAsync",
  async (id: number) => {
    try {
      const { data: category } = await supabase
        .from("categories")
        .select()
        .match({ id: id })
        .single();
      const { data: challenges } = await supabase
        .from("challenges")
        .select(`*`)
        .eq("category_id", category?.id);
      const categoryData = { ...category, challenges: challenges };
      return categoryData;
    } catch (err) {
      return err;
    }
  },
);

interface updatedCategory {
  id: number;
  categoryName: string;
}

export const editCategoryAsync: any = createAsyncThunk(
  "editCategoryAsync",
  async ({ id, categoryName }: updatedCategory) => {
    try {
      const { data } = await supabase
        .from("categories")
        .update({
          name: categoryName,
        })
        .eq("id", id)
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
