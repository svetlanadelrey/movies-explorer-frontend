import { useState, useEffect } from 'react';
import './SavedMovies.css';
import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { filterMovies, filterShortMovies, getSavedMoviesFromLocalStorage } from '../../utils/utils';


function SavedMovies({movies, savedMovies, loggedIn, onDeleteMovie, isMovieSaved, handleSearchByKeyword, handleShortMoviesToggle}) {
    const [isShortMovies, setIsShortMovies] = useState(false);

    const [searchedMovies, setSearchedMovies] = useState(savedMovies); 
  const [isNotFound, setIsNotFound] = useState(false); 
  const [searchRequest, setSearchRequest] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const handleSearchMovies = (request) => {
    setSearchRequest(request);
  }

  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
      const savedSearchedMovies = localStorage.getItem('searchedMovies');
      const savedIsShortMovies = localStorage.getItem('isShortMovies');
    
      if (savedSearchedMovies) {
        setSearchedMovies(JSON.parse(savedSearchedMovies));
        setIsSearchPerformed(true);
      }
    
      if (savedIsShortMovies !== null) {
        setIsShortMovies(savedIsShortMovies === 'true');
      }
    }, [setSearchedMovies, setIsSearchPerformed, setIsShortMovies]);

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchRequest);
    setSearchedMovies(isShortMovies ? 
      filterShortMovies(moviesList) 
    : 
      moviesList);
  }, [savedMovies, isShortMovies, searchRequest]);

  useEffect(() => {
    (searchedMovies.length === 0) ? 
      setIsNotFound(true) 
    : 
      setIsNotFound(false);
  }, [searchedMovies]);
    
    return (
        <>
        <Header loggedIn={loggedIn} />
        <main>
            <SearchForm
                handleSearchByKeyword={handleSearchMovies}
                isShortMovies={isShortMovies}
                handleShortMoviesToggle={handleShortMovies}
            />
            <MoviesCardList 
                movies={savedMovies}

                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                isNotFound={isNotFound}
                isSearchPerformed={isSearchPerformed}
            />           
        </main>
        <Footer />
        </>
    );
}

export { SavedMovies };