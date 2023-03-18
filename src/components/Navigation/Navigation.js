import { Link } from 'react-router-dom';
function Navigation({ location }) {
  return (
    <nav className="navigation">
      <Link
        className={`link navigation__link ${
          location.pathname === '/movies' ? 'link_type_bold' : ''
        }`}
        to="/movies"
      >
        Фильмы
      </Link>
      <Link
        className={`link navigation__link ${
          location.pathname === '/saved-movies' ? 'link_type_bold' : ''
        }`}
        to="/saved-movies"
      >
        Сохраненные фильмы
      </Link>
    </nav>
  );
}

export default Navigation;
