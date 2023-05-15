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

interface addFriendProps {
    username: string;
    user_id: string;
    avatar_url: string;
}


////// FETCH FRIENDS //////
  export const fetchFriendsAsync: any = createAsyncThunk(
    'fetchFriendsAsync',
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

////// ADD FRIEND //////
  export const addFriendAsync: any = createAsyncThunk(
    'addFriendAsync',
    async ({
        user_id,
        username,
        avatar_url,
    }: addFriendProps) => {
      try {
        const { data } = await supabase
       .from('profiles')
       .insert({
        name: username,
        user_id: user_id,
        avatar_url: avatar_url,
       })
       .select()
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  )





////// REDUCER //////
  const friendsSlice = createSlice({
    name: 'friendsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(
        fetchFriendsAsync.fulfilled,
        (state, action: PayloadAction<Database['public']['Tables']['profiles']['Row'][]>) => {
          state.value = action.payload;
        },
      );
      builder.addCase(
        addFriendAsync.fulfilled,
        (state, action: PayloadAction<Database['public']['Tables']['profiles']['Row']>) => {
          state.value.push(action.payload);
        },
      );
    },
  });

  export const selectFriends = (state: RootState) => {
    return state.friends.value;
  };

  export default friendsSlice.reducer;
