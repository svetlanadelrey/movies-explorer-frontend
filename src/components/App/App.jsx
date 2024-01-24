import './App.css';
import React, { useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { NotFound } from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import { filterMovies, filterShortMovies, getSavedMoviesFromLocalStorage, saveSavedMoviesToLocalStorage } from '../../utils/utils';
import { moviesApi } from '../../utils/MoviesApi';
import { ERROR_MESSAGE, MOVIES_API_URL } from '../../utils/constants';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false);
  const [keywordSavedMovies, setKeywordSavedMovies] = useState('');
  const [shortSavedMovieCheckbox, setShortSavedMovieCheckbox] = useState(false);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(loggedIn) {
      Promise.all([
        mainApi.getMovies(),
        mainApi.getCurrentUser(),
      ])
        .then(([savedMovies, user]) => {
          setSavedMovies(savedMovies.reverse());
          setCurrentUser(user);
          
          setMovies(JSON.parse(localStorage.getItem('allMovies')) ?? movies);
          setSearchedMovies(JSON.parse(localStorage.getItem('movies')) ?? searchedMovies);
          setKeyword(localStorage.getItem('search-input') ?? keyword);
          setShortMovieCheckbox(localStorage.getItem('checkbox') === 'true');
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  /*useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      mainApi.checkToken(token)
      .then((res) => {
        if (res) {
          mainApi.setToken(token);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch(err => console.log(err))
    }
  }, [navigate]);*/

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            
            setLoggedIn(true);
          }
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  
  const handleRegister = ({name, email, password}) => {
    mainApi.register({name, email, password})
    .then(() => {
      handleLogin({email, password});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleLogin = ({email, password}) => {
    mainApi.authorize({email, password})
    .then((data) => {
        setCurrentUser(currentUser);       
        setLoggedIn(true);
        mainApi.setToken(data.token);     
        localStorage.setItem("jwt", data.token);
        navigate("/movies");
    })
    .catch(err => console.log(err))
  }

  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    setLoggedIn(false);
  }

  const handleUpdateUser = ({name, email}) => {
    mainApi.editUserInfo({name, email})
    .then((res) => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err));
  }

  const getMovies = () => {
    moviesApi
    .getMovies()
    .then(movies => {
      const newMovies = movies.map((movie) => ({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${MOVIES_API_URL}${movie.image.url}`,
          trailer: movie.trailerLink,
          thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }));
      setMovies(newMovies);
      saveMovies(newMovies);
      localStorage.setItem('allMovies', JSON.stringify(newMovies));
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  const searchMovies = () => {
    if (!keyword) {
      setErrorMessage(ERROR_MESSAGE.KEYWORD)
      setSearchedMovies([]);
      return;
    }
    if (movies.length > 0) {
      saveMovies(movies);
    } else {
      getMovies();
    }
  };

  const resetSearchSavedMovies = () => {
    setKeywordSavedMovies('');
    setShortSavedMovieCheckbox(false);
  }

  const saveMovies = (movies) => {
    const moviesList = filterMovies(movies, keyword, shortMovieCheckbox);
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('search-input', keyword);
    localStorage.setItem('checkbox', shortMovieCheckbox);
    setSearchedMovies(moviesList);
  };

  useEffect(() => {
    if (movies.length === 0) return;
    if (!keyword) return setErrorMessage(ERROR_MESSAGE.KEYWORD);
    if (searchedMovies.length === 0) {
      setErrorMessage(ERROR_MESSAGE.NOT_FOUND);
    } else {
      setErrorMessage('');
    }
  }, [searchedMovies]);

  const searchSavedMovies = () => {
    const searchedMovies = filterMovies(savedMovies, keywordSavedMovies, shortSavedMovieCheckbox);
    setSearchedSavedMovies(searchedMovies);
    
  };
  useEffect(searchSavedMovies, [shortSavedMovieCheckbox, savedMovies, keywordSavedMovies]);

  const filterMovies = (movies, keyword, checkbox) => {
    return movies.filter((movie) =>
      checkbox
        ? movie.duration <= 40 &&
          (String(movie.nameRU).toLowerCase().includes(keyword.toLowerCase()) || String(movie.nameEN).toLowerCase().includes(keyword.toLowerCase()))
        : (String(movie.nameRU).toLowerCase().includes(keyword.toLowerCase()) || String(movie.nameEN).toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  const handleSaveMovie = (movie) => {
    mainApi.addMovie(movie)
    .then((newMovie) => {
      setSavedMovies([...savedMovies, newMovie.movie]);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const isMovieSaved = (movie) => savedMovies.some((i) => i.movieId === movie.movieId);
  
  const handleDeleteMovie = (movie) => {
    const movieId = movie._id ? movie._id : savedMovies.find((i) => i.movieId === movie.movieId)._id;;
    mainApi
      .removeMovie(movieId)
      .then(() => {
        setSavedMovies((movies) => movies.filter((i) => i._id !== movieId));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                movies={searchedMovies}
                loggedIn={loggedIn}               
                searchMovies={searchMovies}
                setKeyword={setKeyword}
                keyword={keyword}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                isMovieSaved={isMovieSaved}
                errorMessage={errorMessage}
                setSearchedMovies={setSearchedMovies}
                onCheckbox={() => setShortMovieCheckbox(!shortMovieCheckbox)}
                shortMovieCheckbox={shortMovieCheckbox}
              />
            } 
          />
          <Route 
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                movies={searchedSavedMovies}
                loggedIn={loggedIn}
                onDeleteMovie={handleDeleteMovie}
                isMovieSaved={isMovieSaved}
                setSearchedMovies={setSearchedMovies}
                searchMovies={searchSavedMovies}
                setKeyword={setKeywordSavedMovies}
                errorMessage={errorMessage}
                keyword={keywordSavedMovies}
                onCheckbox={() =>
                  setShortSavedMovieCheckbox(!shortSavedMovieCheckbox)
                }
                shortMovieCheckbox={shortSavedMovieCheckbox}
              />
            }
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                onUpdate={handleUpdateUser}
                setCurrentUser={setCurrentUser}
                handleSignOut={handleSignOut}
                
              />
            } 
          />
          <Route 
            path="/signup"
            element={
              <Register
                loggedIn={loggedIn}
                onRegister={handleRegister}
              />
            }
          />
          <Route 
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={handleLogin}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
