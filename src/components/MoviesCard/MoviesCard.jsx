import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { calculateMovieDuration } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({movie, onSaveMovie, onDeleteMovie, isMovieSaved}) {
  const {pathname} = useLocation();
  const isSaved = isMovieSaved(movie);

  const savedButtonClassName = (`movies-card__button ${isSaved ? 'movies-card__button_saved' : ''}`)
  const handleSaveClick = () => {
    if (!isSaved) {
      onSaveMovie(movie);
      } else {
        onDeleteMovie(movie);
      }
    };
    
    return (
        <li className="movies-card"
        >
            <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img 
                    className="movies-card__image" 
                    src={movie.image}
                    alt={movie.nameRU}
                />
            </a>
            <div className="movies-card__container">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <p className="movies-card__duration">{calculateMovieDuration(movie.duration)}</p>
            </div>
            {pathname === '/movies' ?
                <button
                  type="button"
                            className={savedButtonClassName} 
                            aria-label="Добавить"
                            onClick={handleSaveClick}
                          >{isSaved ? '': 'Сохранить'}

                          </button>
                          :
                          <button
                          type="button"
                          className='movies-card__delete-button'
                          onClick={handleSaveClick}
                          aria-label="Удалить"
                          >
                        </button>
            }

        </li>
    );
}

export { MoviesCard };