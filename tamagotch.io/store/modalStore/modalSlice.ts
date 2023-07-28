import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../store'
import { fetchModal } from './modalAPI'


export interface ModalState { 
  error: Error
  display: string
  message: string
  status: string
  type: string
  category: string
  editId: string
  // create: (data:object)=>void
}


const initialState: ModalState = {
  display: "none",
  error:{message:"", name:""},
  type:"none",
  status:"none",
  category:"none",
  message: "",
  editId: "",
  // create:(data:object)=>{}
}

export interface ModalLoginPayload {
  email: string
  token: string
}

export interface ModalCreatePayload {
  category: string
  // create: ()=>void
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.display += 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.display += action.payload
    },
    loginModal: (state, action: PayloadAction<ModalLoginPayload>) => {
      // state.email = action.payload.email;
      // state.token = action.payload.token;
      // state.loggedIn = true;
    },
    displayErrorModal: (state, action: PayloadAction<Error>) => {
      state.type = "error";
      state.error = action.payload;
      state.display = "block";
    },
    displayCreateModal: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.type = "create";
      state.display = "block";
    },
    displayEditModal: (state, action: PayloadAction<string>) => {
      const selectedId = action.payload;
      let category = "none";
      if(selectedId.indexOf("ktch-") >= 0){
        category = "kitchens";
      } else if(selectedId.indexOf("user-") >= 0){
        category = "users";
      } else if(selectedId.indexOf("dvce-") >= 0){
        category = "devices";
      } else if(selectedId.indexOf("menu-") >= 0){
        category = "menus";
      } else if(selectedId.indexOf("rcpe-") >= 0){
        category = "recipes";
      } else if(selectedId.indexOf("mixx-") >= 0){
        category = "mixes";
      } else if(selectedId.indexOf("inpt-") >= 0){
        category = "inputs";
      } 
      console.log("shoule be", selectedId, category)
      state.editId = selectedId;
      state.category = category;
      state.type = "edit";
      state.display = "block";
    },
    closeModal: (state) => {
      state.display = "none";
      state.editId = "";
      // state.loggedIn = true;
    },
  },
})

export const { closeModal, displayCreateModal, displayEditModal, displayErrorModal } = modalSlice.actions

export const selectModal = (state: AppState) => state.modal

export default modalSlice.reducer