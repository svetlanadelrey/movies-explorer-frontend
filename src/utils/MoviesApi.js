import { MOVIES_API_URL } from "./constants";

class MoviesApi {

    _getJson(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
            headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(this._getJson);
    }

}

export const moviesApi = new MoviesApi({
  url: `${MOVIES_API_URL}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
