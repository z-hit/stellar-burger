import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { orderSlice } from './orderSlice';
import { feedSlice } from './feedSlice';
import { constructorSlice } from '../services/constructorSlice';
import { userSlice } from './userSlice';

const rootReducer = {
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [userSlice.name]: userSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
