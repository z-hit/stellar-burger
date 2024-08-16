import { expect, test, describe } from '@jest/globals';
import { getFeed, feedSlice } from '../feed/feedSlice';
import { RequestStatus } from '../../utils/request-status';

const mockFeedData = {
  orders: [
    {
      _id: '11',
      status: 'ready',
      name: 'Tasty burger',
      createdAt: '12:00',
      updatedAt: '12:15',
      number: 1,
      ingredients: ['1', '2']
    },
    {
      _id: '22',
      status: 'ready',
      name: 'Super tasty burger',
      createdAt: '13:00',
      updatedAt: '13:15',
      number: 2,
      ingredients: ['1', '2', '3']
    }
  ],
  total: 2,
  totalToday: 2
};

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

  test('test ingredientsSlice - Success status', () => {
    const action = getFeed.fulfilled(mockFeedData, '', undefined);
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: mockFeedData,
      isLoading: false,
      status: RequestStatus.Success,
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
