import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { RequestStatus } from '../../utils/request-status';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderIngredients = string[];

type TOrderState = {
  order: TOrder | null;
  status: RequestStatus;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TOrderState = {
  order: null,
  status: RequestStatus.Idle,
  isLoading: false,
  error: undefined
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredientsID: TOrderIngredients) =>
    await orderBurgerApi(ingredientsID)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: number) => {
    const orderByNumber = (await getOrderByNumberApi(orderNumber)).orders[0];
    return orderByNumber;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    selectorGetOrder: (state) => state.order,
    selectorisLoading: (state) => state.isLoading
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.status = RequestStatus.Loading;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Success;
        state.order = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Success;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      });
  }
});

export const { selectorGetOrder, selectorisLoading } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
export const reducer = orderSlice.reducer;
