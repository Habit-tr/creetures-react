import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
  // const fetchCategories = async () => {
  //   let { data: categories, error } = await supabase
  //     .from("categories")
  //     .select("*");
  //   setAllCategories(categories);
  // };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  export const fetchAllChallengesAsync: any = createAsyncThunk(
    "fetchSingleChallengeAsync",
    async ({id}) => {
      const { data: fetchedChallenge } = await supabase
        .from("challenges")
        .select()
        .match({ id })
        .single();
        return data;
      } catch (err) {
        return err;
      }
    },
  );

  interface singleChallengeState {
  }
  
  // interface EditChallengeProps {
  //  Challenge: Challenge.update
  // }
  const initialChallenge = {value: {}} 
  const initialState: singleChallengeState = initialChallenge;


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
      builder.addCase(
        postNewChallengeAsync.fulfilled,
        (state, action: PayloadAction<Challenge>) => {
          state.value.push(action.payload);
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
  export const selectChallenges = (state: RootState) => {
    return state.allChallenges.value;
  };
  
  export default allChallengesSlice.reducer;
  