import { createSlice } from '@reduxjs/toolkit';

interface ICount {
  count: number;
}

const initialState: ICount = {
  count: 0,
};

const countSlice = createSlice({
  name: 'countSlice',
  initialState,
  reducers: {
    increment: (state: ICount) => ({
      count: state.count + 1,
    }),
  },
});

const { increment } = countSlice.actions;

const countReducer = countSlice.reducer;

export { countReducer, increment };
