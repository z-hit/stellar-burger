import { orderSlice, getOrderByNumber, clearOrder } from './orderSlice';
import { expect, test } from '@jest/globals';
import { RequestStatus } from '../../utils/request-status';

describe('test orderSlice', () => {
  const initialState = {
    order: null,
    status: RequestStatus.Idle,
    isLoading: false,
    error: undefined
  };

  const mockOrder = {
    _id: '11',
    status: 'ready',
    name: 'Tasty burger',
    createdAt: '12:00',
    updatedAt: '12:15',
    number: 1,
    ingredients: ['1', '2']
  };

  test('test orderSlice - Loading status', () => {
    const action = getOrderByNumber.pending('', 1, {});
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual({
      order: null,
      isLoading: true,
      status: RequestStatus.Loading,
      error: undefined
    });
  });

  test('test orderSlice - Success status', () => {
    const action = getOrderByNumber.fulfilled(mockOrder, '', 1);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual({
      order: mockOrder,
      isLoading: false,
      status: RequestStatus.Success,
      error: undefined
    });
  });

  test('test orderSlice - Failed status', () => {
    const action = getOrderByNumber.rejected(null, '', 1);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState).toEqual({
      order: null,
      isLoading: false,
      status: RequestStatus.Failed,
      error: expect.any(String)
    });
  });

  test('test clearOrder reducer', () => {
    const newState = orderSlice.reducer(initialState, clearOrder());

    const { order } = newState;

    expect(order).toEqual(null);
  });
});
