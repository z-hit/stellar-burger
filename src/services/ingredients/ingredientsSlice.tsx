import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RequestStatus } from '../../utils/request-status';

type TIngredientsState = {
  data: TIngredient[];
  status: RequestStatus;
  isLoading: boolean;
  error: string | undefined;
};

export const initialState: TIngredientsState = {
  data: [],
  status: RequestStatus.Idle,
  isLoading: false,
  error: undefined
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    selectorIngredients: (state) => state.data,
    selectorIngredientsStatus: (state) => state.status,
    selectorIngredientsLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = RequestStatus.Success;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  selectorIngredients,
  selectorIngredientsStatus,
  selectorIngredientsLoading
} = ingredientsSlice.selectors;
export const {} = ingredientsSlice.actions;
export const reducer = ingredientsSlice.reducer;
