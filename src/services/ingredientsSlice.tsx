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
};

const initialState: TIngredientsState = {
  data: [],
  status: RequestStatus.Idle
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
    selectorIngredientsStatus: (state) => state.status
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectorIngredients, selectorIngredientsStatus } =
  ingredientsSlice.selectors;
export const {} = ingredientsSlice.actions;
export const reducer = ingredientsSlice.reducer;
