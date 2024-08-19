import {
  getUser,
  userSlice,
  getOrders,
  setAuthChecked,
  addOrder,
  checkUserAuth
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

    expect(newState.isLoading).toEqual(true);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('test getUser - Success status', () => {
    const action = getUser.fulfilled(mockUser, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.isAuthChecked).toEqual(true);
    expect(newState.data).toEqual(mockUser);
  });

  test('test getUser - Failed status', () => {
    const action = getUser.rejected(null, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.isAuthChecked).toEqual(true);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test checkUserAuth - Loading status', () => {
    const action = checkUserAuth.pending('', undefined, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.isAuthenticated).toEqual(false);
  });

  test('test checkUserAuth - Success status', () => {
    const action = checkUserAuth.fulfilled(undefined, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
  });

  test('test checkUserAuth - Failed status', () => {
    const action = checkUserAuth.rejected(null, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual(expect.any(String));
  });

  
});
