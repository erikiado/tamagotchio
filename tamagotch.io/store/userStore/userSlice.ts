import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { setToStorage, getFromStorage } from '../../services/LocalStorage';

import type { AppState, AppThunk } from '../store'
// import { fetchUser } from './userAPI'
import { UserLoginPayload, UserSubscribePayload, UserVerificationPayload } from '../types'
import { loginUserRequest, signUpUserRequest, refreshUserRequest, verifyUserRequest, subscribeUserRequest } from './userAPI'

export interface UserState {
  email: string
  token: string
  role: string
  loggedIn: boolean
  value: number
  context: {
    status: 'idle' | 'loading' | 'failed'
  }
}

const initialState: UserState = {
  email: "",
  token: "",
  role: "",
  loggedIn: false,
  value: 10,
  context:{
    status: 'idle',
  }
}


export const subscribeUser = createAsyncThunk(
  'admin/subscribeUser',
  async (userData: UserSubscribePayload) => {
    const response = await subscribeUserRequest(userData)
    // The display we return becomes the `fulfilled` action payload
    return response;
  }
)


export const loginUser = createAsyncThunk(
  'admin/loginUser',
  async (userData: UserLoginPayload) => {
    const response = await loginUserRequest(userData)
    // The display we return becomes the `fulfilled` action payload
    return response;
  }
)

export const signupUser = createAsyncThunk(
  'admin/signupUser',
  async (userData: UserLoginPayload) => {
    const response = await signUpUserRequest(userData)
    // The display we return becomes the `fulfilled` action payload
    return response;
  }
)

export const verifyUser = createAsyncThunk(
  'admin/verifyUser',
  async (verificationData: UserVerificationPayload) => {
    const response = await verifyUserRequest(verificationData)
    // The display we return becomes the `fulfilled` action payload
    return response;
  }
)

export const refreshUser = createAsyncThunk(
  'admin/refreshUser',
  async () => {
    const response = await refreshUserRequest()
    // The display we return becomes the `fulfilled` action payload
    return response;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      // setToStorage("lastTokenUpdate", null);
      // setToStorage("accessToken", null);
      // setToStorage("refreshToken", null);
      state.email = "";
      state.loggedIn = false;
      state.token = "";
    },
  },
  
  extraReducers: (builder) => {
    builder

      .addCase(subscribeUser.pending, (state) => {
        state.context.status = 'loading'
      })
      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.context.status = 'idle'
      })

      .addCase(loginUser.pending, (state) => {
        state.context.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const session = action.payload;
        // setToStorage("accessToken", session.access_token);
        // setToStorage("refreshToken", session.refresh_token);
        // setToStorage("lastTokenUpdate", Date.now());
        state.email = session.email;
        state.role = session.role;
        state.loggedIn = true;
        state.context.status = 'idle'
      })
      

      .addCase(signupUser.pending, (state) => {
        state.context.status = 'loading'
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        const session = action.payload;
        // state.email = session.email;
        // state.loggedIn = true;
        state.context.status = 'idle'
      })

      .addCase(verifyUser.pending, (state) => {
        state.context.status = 'loading'
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        // const session = action.payload;
        // state.email = session.email;
        // state.loggedIn = true;
        state.context.status = 'idle'
      })
      
      .addCase(refreshUser.pending, (state) => {
        state.context.status = 'loading'
      })
      .addCase(refreshUser.rejected, (state) => {
        state.context.status = 'idle'
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const session = action.payload;
        state.email = session.email;
        state.token = session.access_token;
        state.loggedIn = true;
        state.role = session.role;
        state.context.status = 'idle'
      })
  },
})

export const { logoutUser } = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.value)`
export const selectUser = (state: AppState) => state.user

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const refreshValidUser =
  (): AppThunk =>
  (dispatch, getState) => {
    // const accessToken = getFromStorage("accessToken");
    // if(accessToken){
    //   dispatch(refreshUser())
    // }
  }

export default userSlice.reducer