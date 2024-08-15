import { ingredientsSlice, reducer } from '../src/services/ingredientsSlice';
import { orderSlice } from '../src/services/orderSlice';
import { constructorSlice } from '../src/services/constructorSlice';
import { feedSlice } from '../src/services/feedSlice';
import { userSlice } from '../src/services/userSlice';
import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../src/services/store';
import { act } from 'react-test-renderer';

const initialRootState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState(),
  [constructorSlice.name]: constructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState()
};

describe('test rootReducer', () => {
  test('test rootReducer initial state', () => {
    const store = configureStore({ reducer: rootReducer });
    const action = { type: 'SOME_ACTION' };
    store.dispatch(action);
    expect(store.getState()).toEqual(initialRootState);
  });
});
