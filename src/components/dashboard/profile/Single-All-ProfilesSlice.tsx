import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../../utils/supabaseClient';
import { Database } from '../../../utils/supabaseTypes';
import { RootState } from '../../../utils/store';


interface userProfileState {
    value: Database['public']['Tables']['profiles']['Row'][];
  };

const initialState: userProfileState = {
    value: []
}


////// FETCH ALL PROFILES ///////
export const fetchAllProfilesAsync: any = createAsyncThunk(
  'fetchUsersAsync',
  async () => {
    try {
      const { data } = await supabase
      .from('profiles')
      .select()
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

////// FETCH  SINGL PROFILE //////
export const fetchSingleProfileAsync: any = createAsyncThunk(
  'fetchSingleProfileAsync',
  async ({id}: Database['public']['Tables']['profiles']['Row']) => {
    try {
      const { data } = await supabase
      .from('profiles')
      .select()
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
    name: 'friendsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        fetchAllProfilesAsync.fulfilled,
        (state, action: PayloadAction<Database['public']['Tables']['profiles']['Row'][]>) => {
          state.value = action.payload;
        },
      );
      builder.addCase(
        fetchSingleProfileAsync.fulfilled,
        (state, action: PayloadAction<Database['public']['Tables']['profiles']['Row'][]>) => {
          state.value = action.payload;
        },
      );
    },
  });

  export const selectProfiles = (state: RootState) => {
    return state.profiles.value;
  };

  export default profilesSlice.reducer;
