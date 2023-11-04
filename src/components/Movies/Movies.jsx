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

function Movies({ loggedIn, onSaveMovie, onDeleteMovie, savedMovies, isMovieSaved}) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]); 
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [error, setError] = useState('');
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [isNothingFound, setIsNothingFound] = useState(false);

    useEffect(() => {
      moviesApi.getMovies()
        .then((data) => {
          setInitialMovies(data);
        })
        .catch((error) => {
          console.error('Error getting movies:', error);
          setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);

    /*const handleFilterMovies = (movies, keyword, short) => {
      const moviesList = filterMovies(movies, keyword, short); 
      setInitialMovies(moviesList);
      setSearchedMovies(short ? filterShortMovies(moviesList) : moviesList);
      localStorage.setItem('movies', JSON.stringify(moviesList));
      localStorage.setItem('allMovies', JSON.stringify(movies));
    }

    useEffect(() => {
      if (localStorage.getItem('shortMovies') === 'true') {
        setIsShortMovies(true);
      } else {
        setIsShortMovies(false);
      }
    }, []);
  
    useEffect(() => {
      if (localStorage.getItem('movies')) {
        const movies = JSON.parse(localStorage.getItem('movies'));
        setInitialMovies(movies);
        if (localStorage.getItem('shortMovies') === 'true') {
          setSearchedMovies(filterShortMovies(movies));
        } else {
          setSearchedMovies(movies);
        }
      }
    }, []);
  
    useEffect(() => {
      if (localStorage.getItem('movieSearch')) {
        if (searchedMovies.length === 0) {
          setIsNothingFound(true);
        } else {
          setIsNothingFound(false);
        }
      } else {
        setIsNothingFound(false);
      }
    }, [searchedMovies]);*/

    /*const handleSearchMovie = (keyword) => {
      localStorage.setItem('movieSearch', keyword);
      localStorage.setItem('shortMovies', isShortMovies);
  
      if (localStorage.getItem('allMovies')) {
        const movies = JSON.parse(localStorage.getItem('allMovies'));
        handleFilterMovies(movies, keyword, isShortMovies);
      } else {
        setIsLoading(true);
        getMovies()
          .then((cardsData) => {
            handleFilterMovies(cardsData, keyword, isShortMovies);
            setIsSearchPerformed(false);
          })
          .catch((err) => {
            setIsSearchPerformed(true);
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }*/
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
    
    const handleSearchMovie = (keyword, isShortMovies) => {
      setError('');
      setIsLoading(true);

      const filteredMovies = filterMovies(initialMovies, keyword);
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
      setIsShortMovies(!isShortMovies);

      if (!isShortMovies) {
        if (filterShortMovies(initialMovies).length === 0) {
          setSearchedMovies(filterShortMovies(initialMovies));
        } else {
          setSearchedMovies(filterShortMovies(initialMovies));
        }
      } else {
        setSearchedMovies(initialMovies);
      }
      localStorage.setItem('shortMovies', !isShortMovies);
      
    };

    return (
        <>
        <Header loggedIn={loggedIn}/>
        <main>
            <SearchForm 
              handleSearchMovie={handleSearchMovie}
              isShortMovies={isShortMovies}
              handleShortMoviesToggle={handleShortMoviesToggle}
            />
            {isNothingFound && !isLoading && <p className="movies-error">Ничего не найдено</p>}
            
            {isSearchPerformed && !isNothingFound && (
              <MoviesCardList
                loggedIn={loggedIn}
                movies={searchedMovies.length > 0 ? searchedMovies : initialMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                isMovieSaved={isMovieSaved}
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