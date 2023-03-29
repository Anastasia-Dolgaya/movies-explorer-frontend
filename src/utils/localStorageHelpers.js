import { updateItem } from './arrayHelpers';

export const getLocalStorageItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (!value.startsWith('{') && !value.startsWith('[')) {
      return value;
    }
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
};

export const saveLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const saveMoviesToLocalStorage = saveLocalStorageItem;

export const getMoviesFromLocalStorage = getLocalStorageItem;

export const addMovieToLocalStorage = (key, movie) => {
  const movies = getMoviesFromLocalStorage(key) || [];

  const moviesWithAdded = [...movies, movie];

  saveMoviesToLocalStorage(key, moviesWithAdded);
};

export const updateMovieInLocalStorage = (key, id, movie, idKey = 'id') => {
  const movies = getMoviesFromLocalStorage(key) || [];

  const updatedMovies = updateItem(movies, id, movie, idKey);

  saveMoviesToLocalStorage(key, updatedMovies);
};

export const removeMovieFromLocalStorage = (key, id, idKey = 'id') => {
  const movies = getMoviesFromLocalStorage(key) || [];

  const moviesWithoutRemoved = movies.filter((movie) => movie[idKey] !== id);

  saveMoviesToLocalStorage(key, moviesWithoutRemoved);
};
