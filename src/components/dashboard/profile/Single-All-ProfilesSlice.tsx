import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from "../../../utils/supabaseTypes";

interface userProfileState {
  value: {
    allProfiles: Database["public"]["Tables"]["profiles"]["Insert"][];
    singleProfile: any;
  };
}

const initialState: userProfileState = {
  value: {
    allProfiles: [],
    singleProfile: {},
  },
};

////// FETCH ALL PROFILES ///////
export const fetchAllProfilesAsync: any = createAsyncThunk(
  "fetchUsersAsync",
  async () => {
    try {
      const { data } = await supabase.from("profiles").select();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

////// FETCH SINGLE PROFILE //////
export const fetchSingleProfileAsync: any = createAsyncThunk(
  "fetchSingleProfileAsync",
  async ({ id }: any) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select(
          `*, commitments: commitments(badge_level, is_active, is_up_to_date, id, user_id, challenge: challenges(name))`, //may need policy update
        )
        .match({ id: id })
        .single();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

////// REDUCER //////
const profilesSlice = createSlice({
  name: "friendsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllProfilesAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["profiles"]["Row"][]
        >,
      ) => {
        state.value.allProfiles = action.payload;
      },
    );
    builder.addCase(
      fetchSingleProfileAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          Database["public"]["Tables"]["profiles"]["Row"][]
        >,
      ) => {
        state.value.singleProfile = action.payload;
      },
    );
  },
});

export const selectAllProfiles = (state: RootState) => {
  return state.profiles.value.allProfiles;
};

export const selectSingleProfile = (state: RootState) => {
  return state.profiles.value.singleProfile;
};

export default profilesSlice.reducer;
