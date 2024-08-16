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
import { mockUser } from '../../mocks/mockData/mockUser';

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

  test('test getUser - Loading status', () => {
    const action = getUser.pending('', undefined, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: true,
      isAuthChecked: false,
      isAuthenticated: false,
      data: undefined,
      orders: [],
      error: undefined
    });
  });

  test('test getUser - Success status', () => {
    const action = getUser.fulfilled(mockUser, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isAuthChecked: true,
      isAuthenticated: true,
      data: mockUser,
      orders: [],
      error: undefined
    });
  });

  test('test getUser - Failed status', () => {
    const action = getUser.rejected(null, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: undefined,
      orders: [],
      isAuthChecked: true,
      isAuthenticated: false,
      error: expect.any(String),
      isLoading: false
    });
  });
});
