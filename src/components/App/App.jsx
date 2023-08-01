import './App.css';
import React from 'react';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../Login/Login';
import { NotFound } from '../NotFound/NotFound';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies loggedIn={loggedIn} />} />
        <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} />}/>
        <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
