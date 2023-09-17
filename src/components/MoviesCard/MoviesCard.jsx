import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { calculateMovieDuration } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({movie, savedMovies, onSaveMovie, onDeleteMovie, saved}) {
    const [isSaved, setIsSaved] = useState(false);
    const {pathname} = useLocation();

    const handleSaveClick = () => {
      if (isSaved) {
        onDeleteMovie(movie);
        setIsSaved(false);
        localStorage.setItem(`movie_${movie.id}`, false);
        } else {
          onSaveMovie(movie);
          setIsSaved(true);
          localStorage.setItem(`movie_${movie.id}`, true);
        }
      };
    
      const deleteMovie = () => {
        onDeleteMovie(movie._id);
        setIsSaved(false);
      };

    return (
        <li className="movies-card" 
        >
            <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img 
                    className="movies-card__image" 
                    src={(typeof movie.image === 'string') ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
                    alt={movie.nameRU}
                />
            </a>
            <div className="movies-card__container">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <p className="movies-card__duration">{calculateMovieDuration(movie.duration)}</p>
            </div>
            {pathname === '/movies' && (
              <button
                type="button"
                className={isSaved ? 'movies-card__button_saved' : 'movies-card__button'} 
                onClick={handleSaveClick}
                aria-label="Сохранить"
                >{isSaved ? '': 'Сохранить'}
              </button>
              )
            }
            {pathname === '/saved-movies' && (
              <button
                type="button"
                className='movies-card__delete-button'
                aria-label="Удалить"
                onClick={deleteMovie}
              ></button>
            )}
        </li>
    );
}

export { MoviesCard };