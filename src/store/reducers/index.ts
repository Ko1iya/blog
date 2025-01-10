import { combineReducers } from 'redux';
import { countReducer } from './countReducer';

const rootReducer = combineReducers({
  countReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, RootState };
