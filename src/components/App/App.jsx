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

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

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
    setLoggedIn(false);
    localStorage.clear();
    navigate("/", {replace: true});
  }

  const handleUpdateUser = ({name, email}) => {
    mainApi.editUserInfo({name, email})
    .then((res) => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err));
  }
  
  const handleSaveMovie = (movie) => {
    
    mainApi
      .addMovie(movie)
      .then((addedMovie) => {
        
        setSavedMovies([addedMovie, ...savedMovies]);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };
  
  const handleDeleteMovie = (movie) => {
    const deletedMovie = savedMovies.find(m => m.id === movie.movieId);
    mainApi
      .removeMovie(deletedMovie.movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((i) => i._id !== deletedMovie._id));
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
                movies={savedMovies}
                loggedIn={loggedIn}
                component={SavedMovies}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
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
