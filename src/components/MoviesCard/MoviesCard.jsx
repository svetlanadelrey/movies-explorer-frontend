import './MoviesCard.css';
import poster from '../../images/movie-1.jpg';

function MoviesCard() {
    return (
        <li className="movies-card__item">
            <a className="movies-card__link" href="/" target="_blank" rel="noreferrer">
                <img className="movies-card__image" src={poster} alt="постер к фильму"/>
            </a>
            <div className="movies-card__container">
                <h2 className="movies-card__title">33 слова о дизайне</h2>
                <p className="movies-card__duration">1ч 17м</p>
            </div>
            <button type="button" className="movies-card__save-button">Сохранить</button>
            <button type="button" className="movies-card__saved-button" aria-label="Добавлено"></button>
            <button type="button" className="movies-card__delete-button" aria-label="Удалить"></button>
        </li>
    );
}

export { MoviesCard };