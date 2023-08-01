import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <div className="about-project__container">
                <h2 className="about-project__title">О проекте</h2>
                <div className="about-project__text-box">
                    <div className="about-project__block">
                        <h3 className="about-project__subtitle">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="about-project__text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div className="about-project__block">
                        <h3 className="about-project__subtitle">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about-project__text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
                <div className="about-project__timetable">
                    <div className="about-project__column about-project__column_back">
                        <p className="about-project__timetable-title about-project__timetable-title_back">1 неделя</p>
                        <p className="about-project__timetable-text">Back-end</p>
                    </div>
                    <div className="about-project__column about-project__column_front">
                        <p className="about-project__timetable-title about-project__timetable-title_front">4 недели</p>
                        <p className="about-project__timetable-text">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { AboutProject };