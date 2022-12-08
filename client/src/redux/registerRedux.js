import { createSlice } from "@reduxjs/toolkit";

//crate slice for registration
const registerSlice = createSlice({
  name: "register",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});


export const { registerStart, registerSuccess, registerFailure } = registerSlice.actions;