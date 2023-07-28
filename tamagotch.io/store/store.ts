import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// import authReducer from './authSlice'
import userReducer from './userStore/userSlice'
import modalReducer from './modalStore/modalSlice'
import chatReducer from './chatStore/chatSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
      // auth: authReducer, 
      app: chatReducer, 
      
      user: userReducer, 
      modal: modalReducer, 
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store