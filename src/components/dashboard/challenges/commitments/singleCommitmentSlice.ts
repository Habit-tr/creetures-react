import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../utils/store';
import supabase from '../../../../utils/supabaseClient';
import { Database } from '../../../../utils/supabaseTypes';

interface singleCommitmentsState {
  value: Database['public']['Tables']['commitments']['Row'];
};

const initialState: singleCommitmentsState = { 
  value: {
    badgeLevel: 1,
    challenge_id: 0,
    created_at: null,
    frequency: '',
    goals: null,
    id: 0,
    isClicked: false,
    isActive: true,
    isUpToDate: true,
    reward: {
      isClicked: false,
      name: '',
    },
    reward_id: 0,
    timeframe: '',
    updatedAt: null,
    user_id: '',
    challenge: {
      category: {
        name: '',
      },
      category_id: 0,
      name: '',
    },
  }, 
};

export const fetchSingleCommitmentAsync: any = createAsyncThunk(
  'fetchSingleCommitmentAsync',
  async (id) => {
    try {
      const { data: fetchedCommitment } = await supabase
        .from('commitments')
        .select('*, challenge: challenges(category_id, name, category: categories(name)), reward: rewards(isClicked, name)')
        .match({ id })
        .single();
      return fetchedCommitment;
    } catch (err) {
      console.error(err);
    }
  },
);

export const editCommitmentAsync: any = createAsyncThunk(
  'editCommitmentAsync',
  async (updatedCommitment: Database['public']['Tables']['commitments']['Update']) => {
    try {
      const { data } = await supabase
        .from('commitments')
        .update({
          frequency: updatedCommitment.frequency,
          goals: updatedCommitment.goals,
          reward_id: updatedCommitment.reward_id,
          timeframe: updatedCommitment.timeframe,
        })
        .eq('id', updatedCommitment.id)
        .select()
        .single();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
);

const singleCommitmentSlice = createSlice({
  name: 'singleCommitment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSingleCommitmentAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['commitments']['Row']>) => {
        state.value = action.payload;
      },
    );
    builder.addCase(
      editCommitmentAsync.fulfilled,
      (state, action: PayloadAction<Database['public']['Tables']['commitments']['Row']>) => {
        state.value = action.payload;
      },
    );
  },
});

export const selectCommitment = (state: RootState) => {
  return state.singleCommitment.value;
};

export default singleCommitmentSlice.reducer;
