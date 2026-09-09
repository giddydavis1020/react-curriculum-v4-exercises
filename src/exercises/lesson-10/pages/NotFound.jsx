import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        The page <code>{pathname}</code> does not exist.
      </p>
      <Link to="/">Go Home</Link>
    </section>
  );
}
