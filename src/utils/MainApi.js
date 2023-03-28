import { mainApiConfig } from './mainApiConfig';

class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  fetchUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  fetchMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  createMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: data.image.formats?.thumbnail?.url
          ? `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`
          : undefined,
        owner: data.owner,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._handleResponse(res);
    });
  }
}

const mainApi = new MainApi(mainApiConfig);
export { mainApi };
