import { MOVIES_API_URL } from '../utils/constants';

class MainApi {

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse)
  };

  getCurrentUser(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },   
    }).then(this._checkResponse);
  };
  
  editUserInfo({name, email}) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },   
        body: JSON.stringify({name, email})
    })
    .then(this._checkResponse);
  };

  register({name, email, password}) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(this._checkResponse);
  }; 

  authorize({email, password}) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse);
  }; 

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  };

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie)
    }).then(this._checkResponse);
  }

  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies-svetlanadelrey.nomoredomains.work',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
}});

export default mainApi;