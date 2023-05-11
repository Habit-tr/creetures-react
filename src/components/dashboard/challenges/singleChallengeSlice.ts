import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Challenge } from "../../../utils/supabaseTypes";
// const fetchCategories = async () => {
//   let { data: categories, error } = await supabase
//     .from("categories")
//     .select("*");
//   setAllCategories(categories);
// };
// useEffect(() => {
//   fetchCategories();
// }, []);

interface fetchSingleChallengeProps {
  id: number | string;
}

export const fetchSingleChallengeAsync: any = createAsyncThunk(
  "fetchSingleChallengeAsync",
  async ({ id }: fetchSingleChallengeProps) => {
    try {
      console.log("id in thunk: ", id);
      const { data, error } = await supabase
        .from("challenges")
        .select(`*, category: categories(name)`)
        .match({ id: id })
        .single();
      console.log("data is ", data);
      // const { data: categoryData } = await supabase
      //   .from("category")
      //   .select("name")
      //   .match({ id: data?.category_id })
      //   .single();
      return data;
    } catch (err) {
      return err;
    }
  },
);

interface singleChallengeState {
  value: Challenge | {};
}

// interface EditChallengeProps {
//  Challenge: Challenge.update
// }

const initialState: singleChallengeState = { value: {} };

const singleChallengeSlice = createSlice({
  name: "singleChallenge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSingleChallengeAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.value = action.payload;
      },
    );
    // builder.addCase(
    //   editNewChallengeAsync.fulfilled,
    //   (state, action: PayloadAction<Challenge>) => {
    //     state.value = action.payload;
    //   },
    // );
  },
});

// export const fetchAllChallengesAsync = allChallengesSlice.actions;
export const selectChallenge = (state: RootState) => {
  return state.singleChallenge.value;
};

export default singleChallengeSlice.reducer;
