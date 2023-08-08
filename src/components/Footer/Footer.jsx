import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__container">
                    <ul className="footer__links">
                        <li className="footer__item">
                            <a className="footer__link" href="https://practicum.yandex.ru/catalog/" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__item">
                            <a className="footer__link" href="https://github.com/svetlanadelrey" rel="noreferrer" target="_blank">Github</a>
                        </li>
                    </ul>
                    <span className="footer__date">&copy; {currentYear}</span>
                </div>
            </div>
        </footer>
    );
}

export { Footer };