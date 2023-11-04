import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  movies,
  savedMovies,
  isLoading,
  isNothingFound,
  onSaveMovie,
  onDeleteMovie
  }) {

  const getCardCount = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1280) {
          return 12;
      } else if (windowWidth >= 768) {
          return 8;
      } else if (windowWidth >= 320) {
          return 5;
      }

      return 8;
    };
    const [shownMovies, setShownMovies] = useState(getCardCount());
    const {pathname} = useLocation();

    useEffect(() => {
      localStorage.setItem("shownMovies", shownMovies.toString());
    }, [shownMovies]);
  
    const showMoreMovies = () => {
      const innerWidth = window.innerWidth;
      let moviesToShow = 0;
  
      if (innerWidth >= 1280) {
        moviesToShow = 3;
      } else if (innerWidth >= 768 && innerWidth < 1280) {
        moviesToShow = 2;
      } else if (innerWidth >= 320 && innerWidth <= 480) {
        moviesToShow = 5;
      }
  
      setShownMovies(prevCount => prevCount + moviesToShow);
    };

    useEffect(() => {
      const handleResize = () => {
        setShownMovies(getCardCount());
      };
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <section className="movies-card-list">
      {isLoading && <Preloader/>}
      {isNothingFound && !isLoading && (
        <span className='service-message'>Ничего не найдено</span>
      )}
          <article className="movies-card-list__list">
            {pathname === '/movies' ? movies.slice(0, shownMovies).map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id || movie._id}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                nameRU = {movie.nameRU}
                duration = {movie.duration}
                image = {`https://api.nomoreparties.co/${movie.image.url}`}
              />
            )) : 
            movies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                nameRU = {movie.nameRU}
                duration = {movie.duration}
                image = {movie.image}
              />
            ))
            }
          </article>
      {pathname === '/movies' && movies.length > shownMovies && (
        <button type="button" className="movies-card-list__button" onClick={showMoreMovies}>
          Ещё
        </button>
      )}
    </section>
      );
}

export { MoviesCardList };