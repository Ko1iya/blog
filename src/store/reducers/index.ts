import { combineReducers } from 'redux';
import { articleReducer } from './currentArticle';
import blogApi from './blogApi';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  articleReducer,
  authSlice,
  [blogApi.reducerPath]: blogApi.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };
