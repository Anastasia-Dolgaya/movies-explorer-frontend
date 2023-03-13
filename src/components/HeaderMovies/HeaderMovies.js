import Account from '../Account/Account';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
function HeaderMovies({ location, isBurgerOpen, onOpen, onClose }) {
  return (
    <div className="header">
      <Logo />
      <Navigation location={location} />
      <div className="account__wrap">
        <Account />
      </div>
      <BurgerMenu isOpen={isBurgerOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
}

export default HeaderMovies;
