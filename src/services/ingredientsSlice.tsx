import { getIngredientsApi } from '@api';
import {
  AsyncThunkAction,
  PayloadAction,
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
  isAsyncThunkAction
} from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { TIngredient } from '@utils-types';
import { stat } from 'fs';

enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

type TIngredientsState = {
  data: TIngredient[];
  status: RequestStatus;
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  data: [],
  status: RequestStatus.Idle,
  isLoading: false
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
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
        state.isLoading = false;
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
