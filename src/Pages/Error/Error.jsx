import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <section id="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  );
}

export default ErrorPage;