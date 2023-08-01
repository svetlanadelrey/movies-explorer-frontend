import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found-page">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__text">Страница не найдена</p>
            <Link className="not-found__link" to="/">Назад</Link>
        </div>
    );
}

export { NotFound };