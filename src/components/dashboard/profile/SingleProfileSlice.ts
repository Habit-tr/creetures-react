import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";
import { Database } from "../../../utils/supabaseTypes";

// value: {
//     avatar_url: null,
//     email: null,
//     full_name:'',
//     id: '',
//     updated_at: null,
//     username: '',
//     website: null,
//     user_id: '',
// },

interface userProfileState {
  value: Database["public"]["Tables"]["profiles"]["Row"];
}

const initialState: userProfileState = {
    value: {
    avatar_url: null,
    email: null,
    full_name:'',
    id: '',
    updated_at: null,
    username: '',
    website: null,
    user_id: '',
},
  };


////// FETCH SINGLE PROFILE //////
export const fetchSingleProfileAsync: any = createAsyncThunk(
    "fetchSingleProfileAsync",
    async (id) => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select(`*, commitments: commitments(badge_level, challenge: challenges(name), reactions: id )`)
          .match({ id })
          .single();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  );

  ////// REDUCER //////
const singleProfileSlice = createSlice({
    name: "singleProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        fetchSingleProfileAsync.fulfilled,
        (
          state,
          action: PayloadAction<
            Database["public"]["Tables"]["profiles"]["Row"]
          >,
        ) => {
          state.value = action.payload;
        },
      );
    },
  });



  export const selectSingleProfile = (state: RootState) => {
    return state.singleProfile.value
  };

  export default singleProfileSlice.reducer;
