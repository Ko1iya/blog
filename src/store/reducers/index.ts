import { combineReducers } from 'redux';
import { articleReducer } from './currentArticle';
import blogApi from './blogApi';

const rootReducer = combineReducers({
  articleReducer,
  [blogApi.reducerPath]: blogApi.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };
