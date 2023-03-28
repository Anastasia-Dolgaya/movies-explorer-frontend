import Account from '../Account/Account';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const HeaderLoggedIn = ({ location, isBurgerOpen, onOpen, onClose }) => {
  return (
    <header className="header">
      <Logo />
      <Navigation location={location} />
      <div className="header__account-wrap">
        <Account />
      </div>
      <BurgerMenu isOpen={isBurgerOpen} onOpen={onOpen} onClose={onClose} />
    </header>
  );
};

export default HeaderLoggedIn;
