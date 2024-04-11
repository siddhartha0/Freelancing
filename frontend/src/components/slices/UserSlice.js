import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: false,
  },
  reducers: {
    logIn: (state, action) => {},
  },
});

export const getUserData = (state) => state.User;

export default UserSlice.reducer;
