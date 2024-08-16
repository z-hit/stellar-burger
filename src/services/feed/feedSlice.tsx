import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RequestStatus } from '../../utils/request-status';
import { getFeedsApi } from '@api';

type TFeedData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TFeedState = {
  data: TFeedData;
  status: RequestStatus;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TFeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  status: RequestStatus.Idle,
  isLoading: false,
  error: undefined
};

export const getFeed = createAsyncThunk<TFeedData>('feed/getFeed', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    selectorFeedData: (state) => state.data,
    selectorIsLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Success;
        state.data = action.payload;
      });
  }
});

export const { selectorFeedData, selectorIsLoading } = feedSlice.selectors;
export const {} = feedSlice.actions;
export const reducer = feedSlice.reducer;
