import { moviesApiConfig } from './moviesApiConfig';

class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  fetchMoviesData() {
    return fetch(this._url, {
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }
}

export const moviesApi = new MoviesApi(moviesApiConfig);
