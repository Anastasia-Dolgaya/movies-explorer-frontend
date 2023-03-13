import { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import { cards } from '../../utils/cards-array';
import HeaderMovies from '../HeaderMovies/HeaderMovies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';

function App() {
  const location = useLocation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);

  function closePopup() {
    setPopupOpen(false);
  }

  function openBurgerMenu() {
    setBurgerOpen(true);
  }

  function closeBurgerMenu() {
    setBurgerOpen(false);
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
        </Route>
        <Route path="/movies">
          <HeaderMovies
            location={location}
            isBurgerOpen={isBurgerOpen}
            onOpen={openBurgerMenu}
            onClose={closeBurgerMenu}
          />
          <Movies cards={cards} location={location} />
        </Route>
        <Route path="/saved-movies">
          <HeaderMovies
            location={location}
            isBurgerOpen={isBurgerOpen}
            onOpen={openBurgerMenu}
            onClose={closeBurgerMenu}
          />
          <SavedMovies cards={cards} location={location} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <HeaderMovies
            location={location}
            isBurgerOpen={isBurgerOpen}
            onOpen={openBurgerMenu}
            onClose={closeBurgerMenu}
          />
          <Profile profileName="Анастасия" profileEmail="pochta@pochta.ru" />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer location={location} />

      <Popup isOpen={isPopupOpen} text="Произошла ошибка" onClose={closePopup} />
    </div>
  );
}

export default App;
