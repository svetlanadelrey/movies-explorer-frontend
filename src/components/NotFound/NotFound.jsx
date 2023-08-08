import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main>
            <section className="not-found-page">
            <h1 className="not-found-page__title">404</h1>
            <p className="not-found-page__text">Страница не найдена</p>
            <Link className="not-found-page__link" to="/">Назад</Link>
            </section>
        </main>
    );
}

export { NotFound };