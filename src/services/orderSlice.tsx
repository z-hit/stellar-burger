import { RequestStatus } from '../utils/request-status';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { OrdersList } from '@components';
import { trackOrSetValue } from '@testing-library/user-event/dist/types/document/trackValue';

type TOrderState = {
  order: TOrder;
  name: string;
  status: RequestStatus;
  isSending: boolean;
};

const initialState: TOrderState = {
  order: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  name: '',
  status: RequestStatus.Idle,
  isSending: false
};

/* export const sendOrder = createAsyncThunk<string[]>(
  'order/sendOrder',
  async ({ ingredients }) => orderBurgerApi(ingredients)
); */

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    selectorGetOrder: (state) => state.order
  },
  reducers: {},
  extraReducers: (builder) => {
    /* builder
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
      }); */
  }
});

export const { selectorGetOrder } = orderSlice.selectors;
export const {} = orderSlice.actions;
export const reducer = orderSlice.reducer;
