import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAction: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const { userAction } = userSlice.actions;
export default userSlice.reducer;
