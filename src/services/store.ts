import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { UnknownAction, configureStore, createStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: () => 'some function'
});

export type RootState = any;

type TApplicationActions = any;

export type AppThunk<Return = void> = ThunkAction<
  Return,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
