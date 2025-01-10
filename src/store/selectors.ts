import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducers';

const countSelector = (state: RootState) => state.countReducer;

// src/store/selectors.ts

const selectCount = createSelector([countSelector], (count) => count);

export default selectCount;
