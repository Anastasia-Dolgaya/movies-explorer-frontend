import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Header() {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <Link className="link link_theme_white" to="/signup">
          Регистрация
        </Link>
        <Link className="link link_theme_white link_type_signin" to="/signin">
          Войти
        </Link>
      </nav>
    </header>
  );
}

export default Header;
