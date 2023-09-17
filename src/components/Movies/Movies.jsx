import { useState, useEffect} from 'react';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { moviesApi } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { 
  filterMovies, 
  filterShortMovies, 
   } from '../../utils/utils';

function Movies({ loggedIn, onSaveMovie, onDeleteMovie, savedMovies}) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [error, setError] = useState('');
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [isNothingFound, setIsNothingFound] = useState(false);
    

    useEffect(() => {
      moviesApi.getMovies()
        .then((data) => {
          setMovies(data);
        })
        .catch((error) => {
          console.error('Error getting movies:', error);
          setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);


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
    }, []);

    const handleSearchByKeyword = (keyword, isShortMovies) => {
      setError('');
      setIsLoading(true);

      const filteredMovies = filterMovies(movies, keyword);
      const searchedMovies = isShortMovies ? filterShortMovies(filteredMovies) : filteredMovies;
      
      setSearchedMovies(searchedMovies);
      setIsSearchPerformed(true);
      setIsShortMovies(isShortMovies);
      setIsLoading(false);
      setIsNothingFound(searchedMovies.length === 0);

      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      localStorage.setItem('isShortMovies', JSON.stringify(isShortMovies));
    };

    const handleShortMoviesToggle = () => {
      setIsShortMovies(prevIsShortMovies => !prevIsShortMovies);
    };

    return (
        <>
        <Header loggedIn={loggedIn}/>
        <main>
            <SearchForm 
              handleSearchByKeyword={handleSearchByKeyword}
              isShortMovies={isShortMovies}
              handleShortMoviesToggle={handleShortMoviesToggle}
            />
            {isNothingFound && !isLoading && <p className="movies-error">Ничего не найдено</p>}
            
            {isSearchPerformed && !isNothingFound && (
              <MoviesCardList
                loggedIn={loggedIn}
                movies={searchedMovies.length > 0 ? searchedMovies : movies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                isSavedMovies={false}
                isLoading={isLoading}
                isNothingFound={isNothingFound}
                isSearchPerformed={isSearchPerformed}
              />
            )}
        </main>
        <Footer />
        </>
    );
}

export { Movies };