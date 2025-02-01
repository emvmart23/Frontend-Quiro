import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authSlice } from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
