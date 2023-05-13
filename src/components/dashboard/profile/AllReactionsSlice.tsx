import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../utils/store";
import supabase from "../../../utils/supabaseClient";

interface reactions {
  Row: {
    commitment_id: number | null;
    created_at: string | null;
    id: number;
    type: string | null;
    user_id: string | null;
    total_highfives: number;
    total_nudges: number;
  };
  Insert: {
    commitment_id?: number | null;
    created_at?: string | null;
    id?: number;
    type?: string | null;
    user_id?: string | null;
    total_highfives: number;
    total_nudges: number;
  };
  Update: {
    commitment_id?: number | null;
    created_at?: string | null;
    id?: number;
    type?: string | null;
    user_id?: string | null;
    total_highfives?: number;
    total_nudges?: number;
  };
};

interface reactionNumbers {
  total_highfives: number;
  total_nudges: number;
}

export const fetchAllReactionsAsync: any = createAsyncThunk(
    "fetchAllReactionsAsync",
    async () => {
      try {
        const { data } = await supabase
          .from("reactions")
          .select()
          // console.log('what are we grabing', data)
        return data;
      } catch (err) {
        return err;
      }
    },
  );

  // export const updateReactionTotal: any = createAsyncThunk(
  //   'updateReactionTotal',
  //   async ({total_highfives, total_nudges}: reactionNumbers) => {
  //     try {
  //       const { data } = await supabase
  //       .from('reactions')
  //       .select()
  //       .eq('total_highfives',total_highfives)
  //       .eq('total_nudges',total_nudges)
  //       return data;
  //     } catch (err) {
  //       return err;
  //     }
  //   }
  // )

  interface reactionsState {
    value: {
      commitment_id: number | null;
      created_at: string | null;
      id: number;
      type: string | null;
      user_id: string | null;
      total_highfives: number;
      total_nudges: number;
    };
  }

  const initialState: reactionsState = {
    value: {
      commitment_id: null,
      created_at: null,
      id: 0,
      type: null,
      user_id: null,
      total_highfives: 0,
      total_nudges: 0,
    },
  };



  const allReactionsSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(
        fetchAllReactionsAsync.fulfilled,
        (state, action: PayloadAction<reactions['Row']>) => {
          state.value = action.payload;
        },
      );
      // builder.addCase(
      //   updateReactionTotal.fulfilled,
      //   (state, action: PayloadAction<>) => {
      //     state.value = action.payload;
      //   },
      // );
    },
  });

  export const selectReactions  = (state: RootState) => {
    return (state.allReactions.value);
  };

  export default allReactionsSlice.reducer;


  // PayloadAction<Database['public']['Tables']['challenges']['Row']>
