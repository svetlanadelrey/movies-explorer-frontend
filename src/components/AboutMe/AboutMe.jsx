import './AboutMe.css';
import avatar from '../../images/photo.jpg';

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <div className="about-me__wrapper">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__container">
                    <img className="about-me__image" src={avatar} alt="Аватар"/>
                    <div className="about-me__description">
                        <h3 className="about-me__name">Светлана</h3>
                        <p className="about-me__job">Фронтенд-разработчик, 34 года</p>
                        <p className="about-me__text">
                            Я живу в Екатеринбурге. Люблю музыку, книги, тишину, природу, кошек, путешествия, огурцы. 
                        </p>
                    
                        <a className="about-me__link" href="https://github.com/svetlanadelrey" rel="noreferrer" target="_blank">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { AboutMe };