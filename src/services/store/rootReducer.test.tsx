import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';
import { ingredientsSlice } from '../ingredients/ingredientsSlice';
import { orderSlice } from '../order/orderSlice';
import { constructorSlice } from '../constructor/constructorSlice';
import { feedSlice } from '../feed/feedSlice';
import { userSlice } from '../user/userSlice';
import { rootReducer } from './store';

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
