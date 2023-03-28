import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useCallback, useState } from 'react';
import useMovies from '../../hooks/useMovies';
import { mainApi } from '../../utils/MainApi';
import {
  getLocalStorageItem,
  saveLocalStorageItem,
  updateMovieInLocalStorage,
} from '../../utils/local-storage-helpers';

import { lastSavedMoviesSearchParamKey } from '../../utils/constants';
import useWindowWidth from '../../hooks/useWindowWidth';
import { getPageParams } from '../../utils/utils';

const prepareMovies = (movies) => {
  return movies.map((movie) => ({ ...movie, favorited: true }));
};

const fetchSavedMovies = () => {
  return mainApi.fetchMovies();
};

const getDefaultSearchParams = () => {
  return getLocalStorageItem(lastSavedMoviesSearchParamKey);
};

const SavedMovies = ({ location }) => {
  const [searchParams, setSearchParams] = useState(getDefaultSearchParams() || {});

  const windowWidth = useWindowWidth();

  const pageParams = getPageParams(windowWidth);

  const { pageSize, pageRow } = pageParams;

  const {
    movies,
    hasMore,
    isLoading,
    error,
    fetchNextPage,
    removeMovieLocal,
    filteredMoviesLength,
  } = useMovies(
    fetchSavedMovies,
    'SavedMoviesPage',
    searchParams?.queryString || '',
    searchParams?.isShort || false,
    pageSize,
    pageRow,
    false,
    prepareMovies,
    '_id',
  );

  const handleSearchParamsChanged = useCallback(({ queryString, isShort }) => {
    saveLocalStorageItem(lastSavedMoviesSearchParamKey, { queryString, isShort });

    setSearchParams((prevState) => ({
      ...prevState,
      queryString,
      isShort,
    }));
  }, []);

  const handleUnfavorite = useCallback(
    (movie) => {
      mainApi.deleteMovie(movie._id).then(() => {
        removeMovieLocal(movie._id);

        updateMovieInLocalStorage('MoviesPage', movie.movieId, { favorited: false }, 'id');
      });
    },
    [removeMovieLocal],
  );

  return (
    <main className="movies">
      <SearchForm initialValues={searchParams} onSubmit={handleSearchParamsChanged} />
      <MoviesCardList
        location={location}
        error={error}
        movies={movies}
        isLoading={isLoading}
        onUnfavorite={handleUnfavorite}
        hasMore={hasMore}
        onNextPage={fetchNextPage}
        filteredMoviesLength={filteredMoviesLength}
      />
    </main>
  );
};

export default SavedMovies;
