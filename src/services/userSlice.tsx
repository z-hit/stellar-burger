import { TRegisterData, loginUserApi, registerUserApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: string | undefined;
  loginUserRequest: boolean;
  isLoading: boolean;
};

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: undefined,
  loginUserRequest: false,
  isLoading: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData) => await registerUserApi(userData)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectorUserData: (state) => state.data,
    selectorAuthenticated: (state) => state.isAuthenticated
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.data = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.isLoading = false;
        state.isAuthChecked = true;
        state.data = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isLoading = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      });
  }
});

export const { selectorUserData, selectorAuthenticated } = userSlice.selectors;
export const {} = userSlice.actions;
export const reducer = userSlice.reducer;
