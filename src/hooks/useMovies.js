import { useCallback, useEffect, useState } from 'react';
import { updateItem } from '../utils/arrayHelpers';
import { getMoviesFromLocalStorage, saveMoviesToLocalStorage } from '../utils/localStorageHelpers';
import { fetchError } from '../utils/constants';

export const filterBySearchString = (response, queryString, isShort) =>
  response.filter((movieData) => {
    const nameMatch =
      movieData.nameRU?.toLowerCase?.()?.includes(queryString?.toLowerCase?.() || '') ||
      movieData.nameEN?.toLowerCase?.()?.includes(queryString?.toLowerCase?.() || '');

    if (!nameMatch) {
      return false;
    }

    if (!isShort) {
      return true;
    }

    return movieData.duration <= 40;
  });

const useMovies = (
  fetch,
  pageName,
  queryString,
  isShort,
  pageSize,
  pageRow,
  lazy = true,
  prepareMovies = undefined,
  idKey = 'id',
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMoviesLength, setFilteredMoviesLength] = useState({ length: 0, searched: false });
  const [offset, setOffset] = useState(pageSize);

  const fetchNextPage = useCallback(() => {
    setOffset(offset + Math.min(pageRow, filteredMoviesLength - offset));
  }, [offset, pageRow, filteredMoviesLength]);

  const updateMovieLocal = useCallback(
    (id, data) => {
      const updatedMovies = updateItem(movies, id, data);

      saveMoviesToLocalStorage(pageName, updatedMovies);

      setMovies(updatedMovies.slice(0, offset));
    },
    [offset, pageName, movies],
  );

  const removeMovieLocal = useCallback(
    (id) => {
      const moviesWithoutRemoved = movies.filter((movie) => movie[idKey] !== id);

      saveMoviesToLocalStorage(pageName, moviesWithoutRemoved);

      setMovies(moviesWithoutRemoved.slice(0, offset));
    },
    [pageName, movies, offset, idKey],
  );

  useEffect(() => {
    if (lazy && !queryString) {
      return;
    }

    const moviesFromCache = getMoviesFromLocalStorage(pageName);

    if (moviesFromCache?.length > 0) {
      setError(null);

      const filteredMovies = filterBySearchString(moviesFromCache, queryString, isShort);

      setFilteredMoviesLength(filteredMovies.length);

      const visibleMovies = filteredMovies.slice(0, offset);
      setMovies(visibleMovies);
      return;
    }

    setIsLoading(true);

    fetch()
      .then((response) => {
        const preparedMovies =
          typeof prepareMovies === 'function' ? prepareMovies(response) : response;

        saveMoviesToLocalStorage(pageName, preparedMovies);

        const filteredMovies = filterBySearchString(preparedMovies, queryString, isShort);

        setFilteredMoviesLength(filteredMovies.length);

        const visibleMovies = filteredMovies.slice(0, offset);

        setMovies(visibleMovies);
      })
      .catch(() => {
        setError(fetchError);
        setMovies([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lazy, offset, pageName, queryString, isShort, prepareMovies, fetch]);

  return {
    movies,
    error,
    isLoading,
    hasMore: filteredMoviesLength > offset,
    fetchNextPage,
    updateMovieLocal,
    removeMovieLocal,
    filteredMoviesLength,
  };
};

export default useMovies;
