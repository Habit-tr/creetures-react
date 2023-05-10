import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Challenge } from "../../../utils/supabaseTypes";
import { challenges } from "../../../utils/supabaseTypes";


// const FETCH_ALLCHALLENGES_REQUEST = "FETCH_ALLCHALLENGES_REQUEST";
// const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
// const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
// const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// const fetchUsersRequest = () => ({
//   type: FETCH_USERS_REQUEST,
// });

// const fetchUsersSuccess = (users) => ({
//   type: FETCH_USERS_SUCCESS,
//   payload: users,
// });

// const fetchUsersFailure = (error) => ({
//   type: FETCH_USERS_FAILURE,
//   payload: error,
// });

// https://redux.js.org/usage/usage-with-typescript

interface allChallengesState {
  value: Challenge[];
}

interface postNewChallengeProps {
  challengeName: string;
  description: string;
  categoryId: string;
  createdBy: string;
}

interface EditChallengeProps {
 Challenge: Challenge.update
}

const initialState: allChallengesState = { value: [] };

export const postNewChallengeAsync: any = createAsyncThunk(
  "postNewChallenge",
  async ({
    challengeName,
    description,
    categoryId,
    createdBy = "31928c26-8a01-41c6-947b-0fadccabf3eb",
  }: postNewChallengeProps) => {
    try {
      const { data } = await supabase
        .from("challenges")
        .insert({
          name: challengeName,
          description: description,
          category_id: parseInt(categoryId),
          created_by: createdBy,
        })
        .select();
      return data;
    } catch (error) {
      return error;
    }
  },
);

export const editNewChallengeAsync : any = createAsyncThunk(
  "editNewChallenge",
  async ({
    challenge,
  } : EditChallengeProps) => {
    try {
      const { data } = await supabase
      .from("challenges")
      .update({ challenge : challenge.id})
      .select();
      return data;
    } catch (error) {
      return error;
    }
  }
)

export const fetchAllChallengesAsync: any = createAsyncThunk(
  "fetchAllChallengesAsync",
  async () => {
    try {
      const { data } = await supabase.from("challenges").select();
      return data;
    } catch (err) {
      return err;
    }
  },
);

const allChallengesSlice = createSlice({
  name: "allChallenges",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllChallengesAsync.fulfilled,
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
    builder.addCase(
      editNewChallengeAsync.fulfilled,
      (state, action: PayloadAction<Challenge>) => {
        state.value = action.payload;
      },
    );
  },
});

// export const fetchAllChallengesAsync = allChallengesSlice.actions;
export const selectChallenges = (state: RootState) => {
  return state.allChallenges.value;
};

export default allChallengesSlice.reducer;
