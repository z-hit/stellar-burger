import {
  getUser,
  userSlice,
  getOrders,
  setAuthChecked,
  addOrder,
  checkUserAuth,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';
import { expect, test } from '@jest/globals';
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
  const mockUserRegisterData = {
    ...mockUser,
    password: 'testPassword'
  };
  const mockLoginData = {
    email: 'test@test.com',
    password: 'testPassword'
  };
  const mockUserUpdated = {
    email: 'updated@test.com',
    name: 'updatedName'
  };
  const mockUserUpdateResponse = {
    success: true,
    user: mockUserUpdated
  };

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

  test('test registerUser - Loading status', () => {
    const action = registerUser.pending('', mockUserRegisterData, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.isAuthenticated).toEqual(false);
  });

  test('test registerUser - Success status', () => {
    const action = registerUser.fulfilled(mockUser, '', mockUserRegisterData);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.data).toEqual(mockUser);
  });

  test('test registerUser - Failed status', () => {
    const action = registerUser.rejected(null, '', mockUserRegisterData);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test loginUser - Loading status', () => {
    const action = loginUser.pending('', mockLoginData, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.isAuthenticated).toEqual(false);
  });

  test('test loginUser - Success status', () => {
    const action = loginUser.fulfilled(mockUser, '', mockLoginData);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.data).toEqual(mockUser);
  });

  test('test loginUser - Failed status', () => {
    const action = loginUser.rejected(null, '', mockLoginData);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test logoutUser - Loading status', () => {
    const action = logoutUser.pending('', undefined, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.isAuthenticated).toEqual(false);
  });

  test('test logoutUser - Success status', () => {
    const action = logoutUser.fulfilled(undefined, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthChecked).toEqual(true);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.data).toEqual(undefined);
  });

  test('test logoutUser - Failed status', () => {
    const action = logoutUser.rejected(null, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test getOrders - Loading status', () => {
    const action = getOrders.pending('', undefined, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
  });

  test('test getOrders - Success status', () => {
    const action = getOrders.fulfilled(mockOrders, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.orders).toEqual(mockOrders);
  });

  test('test getOrders - Failed status', () => {
    const action = getOrders.rejected(null, '', undefined);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual(expect.any(String));
  });

  test('test updateUser - Loading status', () => {
    const action = updateUser.pending('', mockUserUpdated, {});
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
  });

  test('test updateUser - Success status', () => {
    const action = updateUser.fulfilled(
      mockUserUpdateResponse,
      '',
      mockUserUpdated
    );
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.data).toEqual(mockUserUpdated);
  });

  test('test updateUser - Failed status', () => {
    const action = updateUser.rejected(null, '', mockUserUpdated);
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual(expect.any(String));
  });
});
