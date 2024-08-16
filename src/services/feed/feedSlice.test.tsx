import { expect, test, describe } from '@jest/globals';
import { getFeed, feedSlice } from '../feed/feedSlice';
import { RequestStatus } from '../../utils/request-status';
import { mockOrders } from '../../mocks/mockData/mockOrders';

describe('test feedSlice', () => {
  const initialState = {
    data: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    status: RequestStatus.Idle,
    isLoading: false,
    error: undefined
  };

  const mockFeedData = {
    orders: mockOrders,
    total: 2,
    totalToday: 2
  };

  test('test getFeed - Loading status', () => {
    const action = getFeed.pending('', undefined, {});
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: { orders: [], total: 0, totalToday: 0 },
      isLoading: true,
      status: RequestStatus.Loading,
      error: undefined
    });
  });

  test('test getFeed - Success status', () => {
    const action = getFeed.fulfilled(mockFeedData, '', undefined);
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: mockFeedData,
      isLoading: false,
      status: RequestStatus.Success,
      error: undefined
    });
  });

  test('test getFeed - Failed status', () => {
    const action = getFeed.rejected(null, '');
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: { orders: [], total: 0, totalToday: 0 },
      isLoading: false,
      status: RequestStatus.Failed,
      error: expect.any(String)
    });
  });
});
