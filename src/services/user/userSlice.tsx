import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  data: TUser | undefined;
  orders: TOrder[];
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | undefined;
  isLoading: boolean;
};

export const initialState: TUserState = {
  data: undefined,
  orders: [],
  isAuthChecked: false,
  isAuthenticated: false,
  error: undefined,
  isLoading: false
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    if (data.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (data.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => await updateUserApi(userData)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const logoutResult = await logoutApi();
  if (logoutResult.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return undefined;
  }
});

export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectorUserData: (state) => state.data,
    selectorAuthenticated: (state) => state.isAuthenticated,
    selectorIsAuthChecked: (state) => state.isAuthChecked,
    selectorIsLoading: (state) => state.isLoading,
    selectorRegisterError: (state) => state.error,
    selectorProfileOrders: (state) => state.orders
  },
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.data = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  selectorUserData,
  selectorAuthenticated,
  selectorIsLoading,
  selectorRegisterError,
  selectorProfileOrders,
  selectorIsAuthChecked
} = userSlice.selectors;
export const { setAuthChecked, addOrder } = userSlice.actions;
export const reducer = userSlice.reducer;
