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

    expect(newState.isLoading).toEqual(true);
    expect(newState.status).toEqual(RequestStatus.Loading);
  });

  test('test getFeed - Success status', () => {
    const action = getFeed.fulfilled(mockFeedData, '', undefined);
    const newState = feedSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Success);
    expect(newState.data).toEqual(mockFeedData);
  });

  test('test getFeed - Failed status', () => {
    const action = getFeed.rejected(null, '');
    const newState = feedSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Failed);
    expect(newState.error).toEqual(expect.any(String));
  });
});
