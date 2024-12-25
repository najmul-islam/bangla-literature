import { createSlice } from "@reduxjs/toolkit";
// get user from localStorage
const token = localStorage.getItem("token");

const initialState = {
  token: token ? token : undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // apiSlice.util.invalidateTags(["User", "Users"]);
      state.token = action.payload;
      // set auth info to the localStorage when loggedIn
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = undefined;
      // remove auth info from localStorage when loggedOut
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
