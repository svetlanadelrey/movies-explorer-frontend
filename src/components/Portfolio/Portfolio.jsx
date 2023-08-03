import arrow from '../../images/arrow.svg';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a className="portfolio__link" href="https://svetlanadelrey.github.io/russian-travel-1/" target="_blank" rel="noreferrer">
                            Статичный сайт
                            <img className="portfolio__svg" src={arrow} alt="стрелочка"/>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a className="portfolio__link" href="https://svetlanadelrey.github.io/russian-travel-1/" target="_blank" rel="noreferrer">
                            Адаптивный сайт
                            <img className="portfolio__svg" src={arrow} alt="стрелочка"/>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a className="portfolio__link" href="https://mesto-svetlanadelrey.nomoreparties.sbs/sign-in" target="_blank" rel="noreferrer">
                            Одностраничное приложение
                            <img className="portfolio__svg" src={arrow} alt="стрелочка"/>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export { Portfolio };