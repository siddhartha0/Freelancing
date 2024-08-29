import { configureStore } from "@reduxjs/toolkit";
import { MainApi } from "./api/api-gateway";

export const store = configureStore({
  reducer: {
    [MainApi.reducerPath]: MainApi.reducer,
  },
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware().concat(MainApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
