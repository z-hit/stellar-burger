import { TRegisterData, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'src/utils/request-status';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean;
  user: TRegisterData;
  status: RequestStatus;
  isLoading: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false,

  user: {
    email: '',
    name: '',
    password: ''
  },
  status: RequestStatus.Idle,
  isLoading: false
};

const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData) => registerUserApi(userData)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectorUser: (state) => state
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
        state.isLoading = false;
      });
  }
});
