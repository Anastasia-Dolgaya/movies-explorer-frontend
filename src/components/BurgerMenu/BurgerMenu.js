import { Link } from 'react-router-dom';
import Account from '../Account/Account';

function BurgerMenu({ isOpen, onOpen, onClose }) {
  return (
    <nav className="burger">
      <button type="button" className="button burger__open-btn" onClick={onOpen}></button>
      <div className={`burger__popup ${isOpen ? 'burger__popup_open' : ''}`}>
        <div className={`burger__container ${isOpen ? 'burger__container_open' : ''}`}>
          <button type="button" className="button burger__close-btn" onClick={onClose}></button>
          <ul className="burger__menu" id="menu">
            <li className="burger__menu-item">
              <Link className="link burger__link" to="/" onClick={onClose}>
                Главная
              </Link>
            </li>
            <li className="burger__menu-item">
              <Link className="link burger__link" to="/movies" onClick={onClose}>
                Фильмы
              </Link>
            </li>
            <li className="burger__menu-item">
              <Link className="link burger__link" to="/saved-movies" onClick={onClose}>
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <div className="burger__account" onClick={onClose}>
            <Account />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BurgerMenu;
