import { useRouteError } from 'react-router-dom';
import "./Error.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <section id="error">
      <h1>Duarr Error!</h1>
      <p>Maaf, Halaman Tidak Ditemukan.</p>
      <p>
        <i>{error.statusText || error.status}</i>
      </p>
    </section>
  );
}

export default ErrorPage;