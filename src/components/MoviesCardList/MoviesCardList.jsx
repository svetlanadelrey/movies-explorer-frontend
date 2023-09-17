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
  onDeleteMovie,
  saved}) {

  const getCardCount = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1280) {
          return 12;
      } else if (windowWidth >= 768) {
          return 8;
      } else if (windowWidth >= 320) {
          return 5;
      }

      return 0;
    };
    const [shownMovies, setShownMovies] = useState(
      parseInt(localStorage.getItem("shownMovies")) || getCardCount()
    );
    const [additionalMovies, setAdditionalMovies] = useState(0);

    useEffect(() => {
      localStorage.setItem("shownMovies", shownMovies.toString());
    }, [shownMovies]);
  
    const showMoreMovies = () => {
      const innerWidth = window.innerWidth;
      let moviesToShow = 0;
      let additionalMoviesToShow = 0;
  
      if (innerWidth >= 1280) {
        moviesToShow = 3;
        additionalMoviesToShow = 3;
      } else if (innerWidth >= 768 && innerWidth < 1280) {
        moviesToShow = 2;
        additionalMoviesToShow = 2;
      } else if (innerWidth >= 320 && innerWidth <= 480) {
        moviesToShow = 5;
        additionalMoviesToShow = 2;
      }
  
      setShownMovies((prevCount) => prevCount + moviesToShow);
      setAdditionalMovies(additionalMoviesToShow);
    };

    useEffect(() => {
      const handleResize = () => {
        setShownMovies(getCardCount());
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    /*const getSavedMovieCard = (savedMovies, movie) => {
      return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    };*/

    const {pathname} = useLocation();

    return (
      <section className="movies-card-list">
      {isLoading && <Preloader/>}
      {isNothingFound && !isLoading && (
        <span className='service-message'>Ничего не найдено</span>
      )}
      {pathname === '/movies' ? (
        <>
          <ul className="movies-card-list__list">
            {movies.slice(0, shownMovies).map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id || movie._id}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                
              />
            ))}
          </ul>
          {movies.length > shownMovies && (
        <button type="button" className="movies-card-list__button" onClick={showMoreMovies}>
          Ещё
        </button>
      )}
        </>
      ) :
  
       (
        <>
          <ul className="movies-card-list__list">
            {savedMovies.map((movie) => (
              <MoviesCard
                movie={movie.movie}
                key={movie.movie._id}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                
              />
            ))}
          </ul>
        </>
      )}
    </section>
      );
}

export { MoviesCardList };