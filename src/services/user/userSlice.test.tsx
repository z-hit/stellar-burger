import {
  getUser,
  userSlice,
  getOrders,
  setAuthChecked,
  addOrder
} from './userSlice';
import { expect, test } from '@jest/globals';
import { RequestStatus } from '../../utils/request-status';
import { mockOrders } from '../../mocks/mockData/mockOrders';

describe('test userSlice', () => {
  const initialState = {
    data: undefined,
    orders: [],
    isAuthChecked: false,
    isAuthenticated: false,
    error: undefined,
    isLoading: false
  };

  const mockOrderToAdd = mockOrders[0];

  test('test setAuthChecked reducer', () => {
    const newState = userSlice.reducer(initialState, setAuthChecked());

    const { isAuthChecked } = newState;

    expect(isAuthChecked).toBe(true);
  });

  test('test addOrder reducer', () => {
    const newState = userSlice.reducer(initialState, addOrder(mockOrderToAdd));

    const { orders } = newState;

    expect(orders).toEqual([mockOrderToAdd]);
  });
});
