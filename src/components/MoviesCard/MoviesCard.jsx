import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { calculateMovieDuration } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({movie, image, onSaveMovie, onDeleteMovie}) {
  //const isMovieSaved = (movie, savedMovies) =>
    //savedMovies.some((i) => i._id === movie._id || i.movieId === movie.movieId);
  //const [isSaved, setIsSaved] = useState(false);
  const {pathname} = useLocation();
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  const isSaved = savedMovies ? savedMovies.some((i) => i.movieId === movie.id) : false;
  const movieSaved = savedMovies ? savedMovies.find((i) => i.movieId === movie.id) : null;
  const savedButtonClassName = (`movies-card__button ${isSaved ? 'movies-card__button_saved' : ''}`)
  /*const handleSaveClick = () => {
    if (isSaved) {
      onDeleteMovie(movie);
      setIsSaved(false);
      } else {
        onSaveMovie(movie);
        setIsSaved(true);
      }
    };
  
    const handleDeleteClick = () => {
      onDeleteMovie(movie);
      setIsSaved(false);
    };
    console.log('movie.image:', movie.image);
    console.log('movie.image.url:', movie.image.url);*/
    
    return (
        <li className="movies-card"
        >
            <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img 
                    className="movies-card__image" 
                    src={image}
                    alt={movie.nameRU}
                />
            </a>
            <div className="movies-card__container">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <p className="movies-card__duration">{calculateMovieDuration(movie.duration)}</p>
            </div>
            {pathname === '/saved-movies' ?
                <button
                  type="button"
                            className='movies-card__delete-button'
                            aria-label="Удалить"
                            onClick={() => onDeleteMovie(movie._id)}
                          ></button>
                          :
                          <button
                          type="button"
                          className={savedButtonClassName} 
                          onClick={() => onSaveMovie(movie, isSaved, movieSaved)}
                          aria-label="Сохранить"
                          >{isSaved ? '': 'Сохранить'}
                        </button>
            }

        </li>
    );
}

export { MoviesCard };