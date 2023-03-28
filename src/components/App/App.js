import { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { getErrorMessage } from '../../utils/error-helpers';
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
import { saveMoviesToLocalStorage } from '../../utils/local-storage-helpers';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [userUpdated, setUserUpdated] = useState(false);
  const [isUserLoading, setUserLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .fetchUserData()
        .then((res) => {
          setCurrentUser({ ...currentUser, ...res });
          return mainApi.fetchMovies().then((savedMovies) => {
            saveMoviesToLocalStorage('SavedMoviesPage', savedMovies);
          });
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          setUserLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const closePopup = () => {
    setPopupOpen(false);
  };

  const openBurgerMenu = () => {
    setBurgerOpen(true);
  };

  const closeBurgerMenu = () => {
    setBurgerOpen(false);
  };

  const handleRegistration = (name, email, password) => {
    return auth
      .register(name, email, password)
      .then(() => {
        return handleLogin(email, password);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setRegistrationError(getErrorMessage(err));
      });
  };

  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setLoginError(getErrorMessage(err));
      });
  };

  const handleLoginCheck = () => {
    setUserLoading(true);
    mainApi.fetchUserData().then((res) => {
      if (res._id) {
        setLoggedIn(true);
      } else {
        history.push('/');
      }
    });
  };

  const signOut = () => {
    return mainApi
      .signout()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        history.push('/');
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleUserUpdate = (data) => {
    mainApi
      .updateUserData(data)
      .then((res) => {
        setCurrentUser(res);
        setUserUpdated(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setUpdateError(getErrorMessage(err));
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {!isUserLoading &&
          (location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile' ? (
            <Header
              loggedIn={loggedIn}
              location={location}
              isBurgerOpen={isBurgerOpen}
              onOpen={openBurgerMenu}
              onClose={closeBurgerMenu}
            />
          ) : null)}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            <Register
              onRegistration={handleRegistration}
              registrationError={registrationError || loginError}
            />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} loginError={loginError} />
          </Route>
          {!isUserLoading && (
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              location={location}
            />
          )}
          {!isUserLoading && (
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              location={location}
            />
          )}
          {!isUserLoading && (
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSignout={signOut}
              onProfileUpdate={handleUserUpdate}
              userUpdated={userUpdated}
              error={updateError}
            />
          )}
          {!isUserLoading && (
            <Route path="*">
              <NotFound />
            </Route>
          )}
        </Switch>
        <Footer location={location} />

        <Popup isOpen={isPopupOpen} text="Произошла ошибка" onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
