import { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { getErrorMessage } from '../../utils/errorHelpers';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import * as auth from '../../utils/auth';
import { saveMoviesToLocalStorage } from '../../utils/localStorageHelpers';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { prepareMovies } from '../SavedMovies/SavedMovies';

const fetchSavedMovies = () => {
  return mainApi.fetchMovies().then((movies) => {
    const savedMovies = prepareMovies(movies);
    saveMoviesToLocalStorage('SavedMoviesPage', savedMovies);
  });
};

const App = () => {
  const location = useLocation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isUserLoading, setUserLoading] = useState(true);
  const { push: pushHistory } = useHistory();

  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closePopup = () => {
    setPopupOpen(false);
  };

  const toggleBurgerMenu = useCallback(() => {
    setBurgerOpen(!isBurgerOpen);
  }, [isBurgerOpen]);

  const handleLogin = useCallback(
    (email, password) => {
      return auth
        .authorize(email, password)
        .then(() => {
          setLoggedIn(true);
          setUserLoading(true);

          return mainApi
            .fetchUserData()
            .then((res) => {
              setCurrentUser(res);
              pushHistory('/movies');
              return fetchSavedMovies();
            })
            .finally(() => {
              setUserLoading(false);
            });
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setLoginError(getErrorMessage(err));
        });
    },
    [pushHistory],
  );

  const handleRegistration = useCallback(
    (name, email, password) => {
      return auth
        .register(name, email, password)
        .then(() => {
          return handleLogin(email, password);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setRegistrationError(getErrorMessage(err));
        });
    },
    [handleLogin],
  );

  const handleLoginCheck = useCallback(() => {
    setUserLoading(true);
    mainApi
      .fetchUserData()
      .then((res) => {
        if (res._id) {
          setCurrentUser(res);
          setLoggedIn(true);
          return fetchSavedMovies();
        } else {
          pushHistory('/');
        }
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, [pushHistory]);

  const signOut = useCallback(() => {
    return mainApi
      .signout()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        pushHistory('/');
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, [pushHistory]);

  const handleUserUpdate = useCallback((data) => {
    return mainApi.updateUserData(data).then((res) => {
      setCurrentUser(res);
    });
  }, []);

  if (isUserLoading) {
    return <div className="app"></div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile' ? (
          <Header
            loggedIn={loggedIn}
            location={location}
            isBurgerOpen={isBurgerOpen}
            onOpen={toggleBurgerMenu}
            onClose={toggleBurgerMenu}
          />
        ) : null}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          {!loggedIn && (
            <Route path="/signup">
              <Register
                onRegistration={handleRegistration}
                registrationError={registrationError || loginError}
              />
            </Route>
          )}
          {!loggedIn && (
            <Route path="/signin">
              <Login onLogin={handleLogin} loginError={loginError} />
            </Route>
          )}

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            location={location}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            location={location}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onSignout={signOut}
            onProfileUpdate={handleUserUpdate}
          />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer location={location} />

        <Popup isOpen={isPopupOpen} text="Произошла ошибка" onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
