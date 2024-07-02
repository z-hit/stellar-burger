import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: string | undefined;
  registerError: string | undefined;
  isLoading: boolean;
};

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: undefined,
  registerError: undefined,
  isLoading: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: TRegisterData) =>
    await registerUserApi({ name, email, password })
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) =>
    await loginUserApi({ email, password })
);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectorUserData: (state) => state.data,
    selectorIsAuthChecked: (state) => state.isAuthChecked,
    selectorAuthenticated: (state) => state.isAuthenticated,
    selectorIsLoading: (state) => state.isLoading
  },
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginUserError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.registerError = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.error.message;
      });
  }
});

export const {
  selectorUserData,
  selectorIsAuthChecked,
  selectorAuthenticated,
  selectorIsLoading
} = userSlice.selectors;
export const { setAuthChecked } = userSlice.actions;
export const reducer = userSlice.reducer;
