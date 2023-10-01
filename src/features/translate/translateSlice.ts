import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { translateWords } from "./traslateApi";
import { StoreStateType } from "../../store";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
};

export const translateWordsAsync = createAsyncThunk<
  WordType[], // Define the type of the fulfilled action payload
  LangCodeType, // Define the type of the argument passed to the async action
  {
    rejectValue: string; // Define the type of the error message
  }
>(
  "root/translateWords",
  async (LangCode: LangCodeType, { rejectWithValue }) => {
    try {
      const data: WordType[] = await translateWords(LangCode);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    updateResult: (state, action: PayloadAction<string[]>) => {
      state.result = action.payload;
    },
    setLangCode: (state, action: PayloadAction<LangCodeType>) => {
      state.langCode = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(translateWordsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        translateWordsAsync.fulfilled,
        (state, action: PayloadAction<WordType[]>) => {
          state.loading = false;
          state.words = action.payload;
          state.error = null;
        }
      )
      .addCase(
        translateWordsAsync.rejected,
        (state, action: PayloadAction<string | undefined, string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { updateResult ,setLangCode} = rootSlice.actions;

// exporting the whole rootstate
export const selectRootState = (state: StoreStateType) => state.root;

export default rootSlice.reducer;
