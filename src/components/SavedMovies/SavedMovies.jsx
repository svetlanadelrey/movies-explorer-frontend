import { useState, useEffect } from 'react';
import './SavedMovies.css';
import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { getSavedMoviesFromLocalStorage } from '../../utils/utils';


function SavedMovies({savedMovies, loggedIn, onDeleteMovie, handleSearchByKeyword, handleShortMoviesToggle}) {
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [movies, setMovies] = useState([]);
    

    useEffect(() => {
        const savedMovies = getSavedMoviesFromLocalStorage(); 
        setMovies(savedMovies);
      }, [])
    
    const handleSearch = (keyword, savedMovies) => {
        handleSearchByKeyword(keyword, savedMovies);
    }

    const handleShortMovies = () => {
        setIsShortMovies(prevIsShortMovies => !prevIsShortMovies);
    }

    const handleDeleteMovie = (movie) => {
        onDeleteMovie(movie)
    }

    return (
        <>
        <Header loggedIn={loggedIn} />
        <main>
            <SearchForm
                handleSearchByKeyword={handleSearch}
                isShortMovies={isShortMovies}
                handleShortMoviesToggle={handleShortMovies}
            />
            <MoviesCardList 
                movies={savedMovies}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
            />           
        </main>
        <Footer />
        </>
    );
}

export { SavedMovies };