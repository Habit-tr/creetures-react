import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../../utils/store";
import supabase from "../../../../utils/supabaseClient";
import { Database } from "../../../../utils/supabaseTypes";

interface sharedUsersState {
  value: Database["public"]["Tables"]["challenge_users"]["Row"][];
}

const initialState: sharedUsersState = { value: [] };

export const fetchSharedUsersAsync: any = createAsyncThunk(
  "fetchSharedUsers",
  async (challengeId) => {
    try {
      const { data: users } = await supabase
        .from("challenge_users")
        .select(
          "*, challenge: challenges(name), profile: profiles(username, avatar_url)",
        )
        .eq("challenge_id", challengeId);
      return users;
    } catch (err) {
      console.error(err);
    }
  },
);

export const postSharedUsersAsync: any = createAsyncThunk(
  "postSharedUsers",
  async ({
    challenge_id,
    user_id,
  }: Database["public"]["Tables"]["challenge_users"]["Insert"]) => {
    try {
      const { data } = await supabase
        .from("commitments")
        .insert({
          challenge_id,
          user_id,
        })
        .select();
      console.log("data: ", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

const sharedUsersSlice: Slice<sharedUsersState> = createSlice({
  name: "sharedUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSharedUsersAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["challenge_users"]["Row"][]
        >,
      ) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      postSharedUsersAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["challenge_users"]["Row"]
        >,
      ) => {
        state.value.push(action.payload);
      },
    );
  },
});

export const selectSharedUsers = (state: RootState) => {
  return state.sharedUsers.value;
};

export default sharedUsersSlice.reducer;
