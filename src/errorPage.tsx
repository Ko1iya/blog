// src/error-page.tsx
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error) && error.data?.message) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
