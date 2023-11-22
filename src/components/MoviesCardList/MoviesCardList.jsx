import { useState, useEffect } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  movies,
  onSaveMovie,
  onDeleteMovie,
  isMovieSaved,
  }) {
    const [countMovies, setCountMovies] = useState(12);
    const [width, setWidth] = useState(window.innerWidth);
  
    const showMoreMovies = () => {
      if (width > 1280) {
        setCountMovies(countMovies + 3);
      } else {
        setCountMovies(countMovies + 2);
      }

    };

    useEffect(() => {
      const handleResize = () => {
        setTimeout(() => setWidth(window.innerWidth), 1500);
        window.addEventListener('resize', handleResize);
        if (width >= 1280) {
          setCountMovies(3);
        } else if (width >= 768 && width < 1280) {
          setCountMovies(2);
        } else if (width >= 320 && width <= 480) {
          setCountMovies(5);
        }
      };
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [width]);

return (
      <section className="movies-card-list">  
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