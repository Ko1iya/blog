import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export { setupStore, AppStore, AppDispatch };
