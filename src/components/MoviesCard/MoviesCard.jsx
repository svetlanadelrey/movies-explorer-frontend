import './MoviesCard.css';
import poster from '../../images/movie-1.jpg';

function MoviesCard() {
    return (
        <li className="movies-card__item">
            <a classname="movies-card__link" href="https://" target="_blank" rel="noreferrer">
                <img className="movies-card__image" src={poster} alt="постер к фильму"/>
            </a>
            <div className="movies-card__container">
                <h3 className="movies-card__title">33 слова о дизайне</h3>
                <p className="movies-card__duration">1ч 17м</p>
            </div>
            <button type="button" className="movies-card__save-button">Сохранить</button>
        </li>
    );
}

export { MoviesCard };