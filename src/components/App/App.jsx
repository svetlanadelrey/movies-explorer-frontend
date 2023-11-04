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
import { getSavedMoviesFromLocalStorage, saveSavedMoviesToLocalStorage } from '../../utils/utils';
import { moviesApi } from '../../utils/MoviesApi';
import { MOVIES_API_URL } from '../../utils/constants';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([
        mainApi.getMovies(),
        mainApi.getCurrentUser(),
      ])
        .then(([movies, user]) => {
          setMovies(movies);
          setCurrentUser(user);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  /*useEffect(() => {
      loadSavedMovies();

  }, []);

  const loadSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setMovieCount(movies.length); // Обновление значения movieCount
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };*/
  useEffect(() => {
    const storedSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (storedSavedMovies) {
      setSavedMovies(storedSavedMovies);
    }
  }, []);
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
            localStorage.removeItem('allMovies');
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
        navigate("/movies");
      localStorage.setItem("jwt", data.token);
    })
    .catch(err => console.log(err))
  }

  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/", {replace: true});
  }

  const handleUpdateUser = ({name, email}) => {
    mainApi.editUserInfo({name, email})
    .then((res) => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err));
  }
  /*const moviesArray = (movies) => {
    return movies.map((movie) => {
      return {
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
      }
    })
  }
  const getMovies = () => {
    return moviesApi
    .getMovies()
    .then(newMovies => {
      const newMoviesArray = moviesArray(newMovies)
      setMovies(newMoviesArray);
      localStorage.setItem('movies', JSON.stringify(newMoviesArray));
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }*/

  //const isMovieSaved = (movie) => savedMovies.some(i => (i._id === movie._id) || (i.movieId === movie.movieId));

  /*const handleSaveMovie = (movie) => {
    mainApi.addMovie(movie)
    .then((addedMovie) => {
      setSavedMovies([addedMovie, ...savedMovies]);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }
  
  const handleDeleteMovie = (movie) => {
    const movieId = movie._id || savedMovies.find(m => m.movieId === movie.movieId)._id;
    console.log(movieId);
    mainApi
      .removeMovie(movieId)
      .then(() => {
        setSavedMovies((movies) => movies.filter((i) => i._id !== movieId));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };*/
  

  const handleSetSavedMovies = (newSavedMovies) => {
    setSavedMovies(newSavedMovies);
  };

  const handleSaveMovie = (movie, isSaved, movieSaved) => {
    if (isSaved) {
      handleDeleteMovie(movieSaved._id);
    } else {
      mainApi.addMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);//добавить к сущ.массиву
        localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, res]));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };
  
  const handleDeleteMovie = (movieId) => {
    mainApi
      .removeMovie(movieId)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieId);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
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
                movies={movies}
                loggedIn={loggedIn}
                component={Movies}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}

              />
            } 
          />
          <Route 
            path="/saved-movies"
            element={
              <ProtectedRoute
                movies={movies}
                loggedIn={loggedIn}
                component={SavedMovies}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                setSavedMovies={handleSetSavedMovies}
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
                onRegister={handleRegister}
              />
            }
          />
          <Route 
            path="/signin"
            element={
              <Login
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
