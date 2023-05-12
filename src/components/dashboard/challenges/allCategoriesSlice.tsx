import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from "../../../utils/supabaseTypes";

interface allCategoriesState {
  value: Database["public"]["Tables"]["categories"]["Row"][];
}

const initialState: allCategoriesState = { value: [] };

export const fetchAllCategoriesAsync: any = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async () => {
    try {
      const { data: fetchedCategories } = await supabase
        .from("categories")
        .select();
      return fetchedCategories;
    } catch (err) {
      console.error(err);
    }
  },
);

const allCategoriesSlice = createSlice({
  name: "allCategories",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(
      fetchAllCategoriesAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
  },
});

export const selectCategories = (state: RootState) => {
  return state.allCategories.value;
};

export default allCategoriesSlice.reducer;
