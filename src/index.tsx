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
import ArticlePage from './components/ArticlePage/ArticlePage';
import Main from './components/Main/Main';
import SignUpPage from './components/SignUpPage/SignUpPage';
import SignInPage from './components/SignInPage/SignInPage';
import EditProfilePage from './components/EditProfile/EditProfile';
import CreacteArticlePage from './components/CreacteArticlePage/CreacteArticlePage';
import EditArticlePage from './components/EditArticlePage/EditArticlePage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/articles/:slug',
        element: <ArticlePage />,
      },
      {
        path: '/:id',
        element: <Main />,
      },
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/articles/',
        element: <Main />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/edit-profile',
        element: <EditProfilePage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        path: '/new-article',
        element: <CreacteArticlePage />,
      },
      {
        path: '/articles/:slug/edit',
        element: <EditArticlePage />,
      },
    ],
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
