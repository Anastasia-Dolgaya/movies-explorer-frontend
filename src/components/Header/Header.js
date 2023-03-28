import HeaderLoggedIn from '../HeaderLoggedIn/HeaderLoggedIn';
import HeaderNotLoggedIn from '../HeaderNotLoggedIn/HeaderNotLoggedIn';

const Header = ({ loggedIn, location, isBurgerOpen, onOpen, onClose }) => {
  return loggedIn ? (
    <HeaderLoggedIn
      location={location}
      isBurgerOpen={isBurgerOpen}
      onOpen={onOpen}
      onClose={onClose}
    />
  ) : (
    <HeaderNotLoggedIn />
  );
};

export default Header;
