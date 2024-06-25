import { RequestStatus } from '../utils/request-status';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type TOrderState = {
  order: string[];
  status: RequestStatus;
  isSending: boolean;
};

const initialState: TOrderState = {
  order: [],
  status: RequestStatus.Idle,
  isSending: false
};

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  (state: TOrderState) => {
    state.order && orderBurgerApi(state.order);
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    selectorGetOrder: (state) => state.order
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isSending = true;
        state.status = RequestStatus.Loading;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.isSending = false;
        state.status = RequestStatus.Success;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isSending = false;
        state.status = RequestStatus.Failed;
      });
  }
});

export const { selectorGetOrder } = orderSlice.selectors;
export const {} = orderSlice.actions;
export const reducer = orderSlice.reducer;
