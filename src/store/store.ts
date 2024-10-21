import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authSlice } from "./slices/auth";
import { reportSlice } from './slices/report';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    report: reportSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
