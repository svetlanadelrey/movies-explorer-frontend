import { useState, useEffect } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { MAX_NUMBER_OF_CARDS, SCREEN_WIDTH } from '../../utils/constants';

function MoviesCardList({
  movies,
  onSaveMovie,
  onDeleteMovie,
  isMovieSaved,
  errorMessage,
  }) {
    const [countMovies, setCountMovies] = useState(12);
    const [width, setWidth] = useState(window.innerWidth);
  
    const showMoreMovies = () => {
      if (width > SCREEN_WIDTH.DESKTOP_WIDTH) {
        setCountMovies(countMovies + MAX_NUMBER_OF_CARDS.DESKTOP_NUMBER);
      } else {
        setCountMovies(countMovies + MAX_NUMBER_OF_CARDS.TABLET_NUMBER);
      }

    };

    useEffect(() => {
      const handleResize = () => {
        setTimeout(() => setWidth(window.innerWidth), 1500);
        window.addEventListener('resize', handleResize);
        if (width >= SCREEN_WIDTH.DESKTOP_WIDTH) {
          setCountMovies(MAX_NUMBER_OF_CARDS.DESKTOP_NUMBER);
        } else if (width >= SCREEN_WIDTH.TABLET_WIDTH && width < SCREEN_WIDTH.DESKTOP_WIDTH) {
          setCountMovies(MAX_NUMBER_OF_CARDS.TABLET_NUMBER);
        } else if (width >= SCREEN_WIDTH.MOBILE_WIDTH && width <= SCREEN_WIDTH.VERTICAL_WIDTH) {
          setCountMovies(MAX_NUMBER_OF_CARDS.VERTICAL_SCREEN_NUMBER);
        }
      };
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [width]);

return (
      <section className="movies-card-list"> 
          <span className="movies-card-list__error">{errorMessage}</span>
          <ul className="movies-card-list__list">
            {movies.slice(0, countMovies).map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.movieId}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                isMovieSaved={isMovieSaved}
              />
            ))}
          </ul>
          {movies.length > countMovies && (
        <button type="button" className="movies-card-list__button" onClick={showMoreMovies}>
          Ещё
        </button>
      )}    
    </section>
      );
}

export { MoviesCardList };