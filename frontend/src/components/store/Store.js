import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "../slices/PostSlice";
import UserSlice from "../slices/UserSlice";

export const Store = configureStore({
  reducer: {
    Job: JobSlice,
    User: UserSlice,
  },
});
