import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from '../../../utils/supabaseTypes';

interface allCommitmentsState {
  value: Database['public']['Tables']['commitments']['Row'][];
}

// interface postNewCommitmentProps {
//   value: Database['public']['Tables']['commitments']['Insert'];
// }

const initialState: allCommitmentsState = { value: [] };

export const fetchAllCommitmentsAsync: any = createAsyncThunk(
  'fetchAllCommitmentsAsync',
  async () => {
    try {
      const { data: fetchedCommitments } = await supabase
        .from('commitments')
        .select('id, badgeLevel, challenge_id, isUpToDate, challenge: challenges(name), user_id');
      return fetchedCommitments;
    } catch (err) {
      console.error(err);
    }
  },
);

// REFERENCE: allChallengesSlice POST request
// export const postNewChallengeAsync: any = createAsyncThunk(
//   "postNewChallenge",
//   async ({
//     challengeName,
//     description,
//     categoryId,
//     createdBy = "31928c26-8a01-41c6-947b-0fadccabf3eb",
//   }: postNewChallengeProps) => {
//     try {
//       const { data } = await supabase
//         .from("challenges")
//         .insert({
//           name: challengeName,
//           description: description,
//           category_id: parseInt(categoryId),
//           created_by: createdBy,
//         })
//         .select();
//       return data;
//     } catch (error) {
//       return error;
//     }
//   },
// );


const allCommitmentsSlice = createSlice({
  name: "allCommitments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllCommitmentsAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['commitments']['Row'][]>) => {
        state.value = action.payload;
      },
    );
    // REFERENCE: allChallengesSlice POST reducer
    // builder.addCase(
    //   postNewChallengeAsync.fulfilled,
    //   (state, action: PayloadAction<Challenge>) => {
    //     state.value.push(action.payload);
    //   },
    // );
  },
});

export const selectCommitments = (state: RootState) => {
  return state.allCommitments.value;
};

export default allCommitmentsSlice.reducer;
