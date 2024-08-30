import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.userDetails = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userDetails = null;
      localStorage.removeItem("user");
    },
  },
});

export const getUser = (state) => state?.User.userDetails;

export const { setCredentials, removeCredentials } = UserSlice.actions;

export default UserSlice.reducer;
