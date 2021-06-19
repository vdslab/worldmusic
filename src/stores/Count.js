import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    CountUp: (state, action) => {
      state.count += action.payload;
    },
    CountDown: (state, action) => {
      state.count -= action.payload;
    },
  },
});

export default slice.reducer;
export const { CountUp, CountDown } = slice.actions;
