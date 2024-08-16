import { expect, test, describe } from '@jest/globals';
import { getFeed, feedSlice } from '../feed/feedSlice';
import { RequestStatus } from '../../utils/request-status';

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

  test('test feedSlice - Loading status', () => {
    const action = getFeed.pending('', undefined, {});
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: { orders: [], total: 0, totalToday: 0 },
      isLoading: true,
      status: RequestStatus.Loading,
      error: undefined
    });
  });

  test('test ingredientsSlice - Failed status', () => {
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
