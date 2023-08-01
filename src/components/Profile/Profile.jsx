import './Profile.css';
import { Header } from '../Header/Header';

function Profile() {
    return (
        <>
        <Header />
        <section className="profile">
            <div className="profile__container">
                <div className="profile__form-container">
                    <h2 className="profile__title">Привет, Виталий!</h2>
                    <form className="profile__form">
                             <div className="profile__input-container">
                                <label for="profile-name" className="profile__label">Имя</label>
                                <input type="text" className="profile__input" id="profile-name" value="Виталий"/>
                            </div>
                            <div className="profile__input-container">
                                <label for="profile-email" className="profile__label">E-mail</label>
                                <input type="text" className="profile__input" id="profile-email" value="pochta@yandex.ru" />
                            </div>
                    </form>
                </div>
                <div className="profile__control">
                    <button type="button" className="profile__control-button">Редактировать</button>
                    <button type="button" className="profile__control-button profile__control-button_signout">Выйти из аккаунта</button>
                </div>
            </div>
        </section>
        </>
    );
}

export { Profile };