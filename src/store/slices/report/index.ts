import { createSlice } from "@reduxjs/toolkit";

interface Props {
  waiters: ReportHostess[];
  TotalHostessPay: number ;
}

const initialState: Props = {
  waiters: [],
  TotalHostessPay: 0,
};

export const reportSlice = createSlice({
  name: "reportHostess",
  initialState,
  reducers: {
    setWaiters: (state, action) => {
      state.waiters = action.payload;
    },
    setTotalHostessPay: (state, action) => {
      state.TotalHostessPay = action.payload;
    },
  },
});

export const { setWaiters, setTotalHostessPay } = reportSlice.actions;
