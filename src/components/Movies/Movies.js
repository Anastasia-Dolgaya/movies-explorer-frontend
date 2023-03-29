import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import {
  addMovieToLocalStorage,
  getLocalStorageItem,
  getMoviesFromLocalStorage,
  removeMovieFromLocalStorage,
  saveLocalStorageItem,
} from '../../utils/localStorageHelpers';
import useWindowWidth from '../../hooks/useWindowWidth';
import { getPageParams } from '../../utils/utils';
import { lastSearchParamsKey } from '../../utils/constants';
import { useCallback, useState } from 'react';
import useMovies from '../../hooks/useMovies';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

const prepareMovies = (movies) => {
  const savedMovies = getMoviesFromLocalStorage('SavedMoviesPage');

  savedMovies?.forEach?.((savedMovie) => {
    const movie = movies.find((movie) => movie.id === savedMovie.movieId);
    if (movie) {
      movie.favorited = true;
      movie.favoritedId = savedMovie._id;
    }
  });

  return movies;
};

const fetchBeatfilmMovies = () => {
  return moviesApi.fetchMoviesData();
};

const getDefaultSearchParams = () => {
  return getLocalStorageItem(lastSearchParamsKey);
};

const Movies = ({ location }) => {
  const [searchParams, setSearchParams] = useState(getDefaultSearchParams() || {});

  const windowWidth = useWindowWidth();

  const { pageSize, pageRow } = getPageParams(windowWidth);

  const {
    movies,
    hasMore,
    isLoading,
    error,
    fetchNextPage,
    updateMovieLocal,
    filteredMoviesLength,
  } = useMovies(
    fetchBeatfilmMovies,
    'MoviesPage',
    searchParams?.queryString || '',
    searchParams?.isShort || false,
    pageSize,
    pageRow,
    true,
    prepareMovies,
  );

  const handleSearchParamsChanged = useCallback(({ queryString, isShort }) => {
    saveLocalStorageItem(lastSearchParamsKey, { queryString, isShort });

    setSearchParams((prevState) => ({
      ...prevState,
      queryString,
      isShort,
    }));
  }, []);

  const handleFavorite = useCallback(
    (movie) => {
      mainApi.createMovie(movie).then((savedMovie) => {
        updateMovieLocal(movie.id, {
          favorited: true,
          favoritedId: savedMovie._id,
        });

        savedMovie.favorited = true;

        addMovieToLocalStorage('SavedMoviesPage', savedMovie);
      });
    },
    [updateMovieLocal],
  );

  const handleUnfavorite = useCallback(
    (movie) => {
      mainApi.deleteMovie(movie.favoritedId).then(() => {
        updateMovieLocal(movie.id, {
          favorited: false,
        });

        removeMovieFromLocalStorage('SavedMoviesPage', movie.id, 'movieId');
      });
    },
    [updateMovieLocal],
  );

  return (
    <main className="movies">
      <SearchForm initialValues={searchParams} onSubmit={handleSearchParamsChanged} />
      <MoviesCardList
        location={location}
        error={error}
        movies={movies}
        hasMore={hasMore}
        isLoading={isLoading}
        onNextPage={fetchNextPage}
        onFavorite={handleFavorite}
        onUnfavorite={handleUnfavorite}
        filteredMoviesLength={filteredMoviesLength}
      />
    </main>
  );
};

export default Movies;
