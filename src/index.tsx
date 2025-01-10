// index.tsx
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

// import { Suspense } from 'react';
import { StrictMode } from 'react';
import App from './components/App/App';
import ErrorPage from './errorPage';
import './index.css';
import { setupStore } from './store/store';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(
  <StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
