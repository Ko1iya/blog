import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import blogApi from './reducers/blogApi';

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(blogApi.middleware),
  });

type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export { setupStore, AppStore, AppDispatch };
