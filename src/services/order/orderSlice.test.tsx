import {
  orderSlice,
  getOrderByNumber,
  clearOrder,
  orderBurger,
  initialState
} from './orderSlice';
import { expect, test } from '@jest/globals';
import { RequestStatus } from '../../utils/request-status';

describe('test orderSlice', () => {
  const mockOrder = {
    _id: '11',
    status: 'ready',
    name: 'Tasty burger',
    createdAt: '12:00',
    updatedAt: '12:15',
    number: 1,
    ingredients: ['1', '2']
  };

  const mockOrderBurgerResponse = {
    success: true,
    order: mockOrder,
    name: 'Simple space burger'
  };

  test('test orderBurger - Loading status', () => {
    const action = orderBurger.pending('', ['1', '2'], {});
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.status).toEqual(RequestStatus.Loading);
  });

  test('test orderBurger - Success status', () => {
    const action = orderBurger.fulfilled(mockOrderBurgerResponse, '', [
      '1',
      '2'
    ]);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Success);
    expect(newState.order).toEqual(mockOrder);
  });

  test('test orderBurger - Failed status', () => {
    const action = orderBurger.rejected(null, '', ['1', '2']);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Failed);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test getOrderByNumber - Loading status', () => {
    const action = getOrderByNumber.pending('', 1, {});
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.status).toEqual(RequestStatus.Loading);
  });

  test('test getOrderByNumber - Success status', () => {
    const action = getOrderByNumber.fulfilled(mockOrder, '', 1);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Success);
    expect(newState.order).toEqual(mockOrder);
  });

  test('test getOrderByNumber - Failed status', () => {
    const action = getOrderByNumber.rejected(null, '', 1);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Failed);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test clearOrder reducer', () => {
    const newState = orderSlice.reducer(initialState, clearOrder());
    const { order } = newState;

    expect(order).toEqual(null);
  });
});
