import { createSlice } from "@reduxjs/toolkit";

//create slice for logout
const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { logoutStart, logoutSuccess, logoutFailure } = logoutSlice.actions;
export default logoutSlice.reducer;
