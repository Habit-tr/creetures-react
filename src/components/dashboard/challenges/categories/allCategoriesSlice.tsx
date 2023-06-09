import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";
import { Database } from "../../../../utils/supabaseTypes";

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

export const postNewCategoryAsync: any = createAsyncThunk(
  "postNewCategory",
  async (categoryName: string) => {
    try {
      const { data } = await supabase
        .from("categories")
        .insert([{ name: categoryName }])
        .select();
      return data;
    } catch (error) {
      return error;
    }
  },
);

interface deleteCategoryProps {
  id: number | string;
}

export const deleteCategoryAsync: any = createAsyncThunk(
  "deleteCategoryAsync",
  async ({ id }: deleteCategoryProps) => {
    try {
      const { data } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)
        .select();
      return data;
    } catch (error) {
      return error;
    }
  },
);

interface allCategoriesState {
  value: Database["public"]["Tables"]["categories"]["Row"][];
}

const initialState: allCategoriesState = { value: [] };

const allCategoriesSlice = createSlice({
  name: "allCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllCategoriesAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      postNewCategoryAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value.push(action.payload);
      },
    );
    builder.addCase(
      deleteCategoryAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = state.value.filter(
          (category) => category.id !== action.payload.id,
        );
      },
    );
  },
});

export const selectCategories = (state: RootState) => {
  return state.allCategories.value;
};

export default allCategoriesSlice.reducer;
