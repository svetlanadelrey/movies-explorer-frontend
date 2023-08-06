import './Profile.css';
import { Header } from '../Header/Header';

function Profile({handleSignOut}) {
    return (
        <>
        <Header />
        <main>
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__form-container">
                        <h1 className="profile__title">Привет, Виталий!</h1>
                        <form className="profile__form">
                                <div className="profile__input-container">
                                    <label 
                                        htmlFor="profile-name" 
                                        className="profile__label">
                                            Имя
                                    </label>
                                    <input 
                                        type="text" 
                                        className="profile__input" 
                                        id="profile-name" 
                                        defaultValue="Виталий"
                                        placeholder="Имя"
                                    />
                                </div>
                                <div className="profile__input-container">
                                    <label 
                                        htmlFor="profile-email" 
                                        className="profile__label">
                                            E-mail
                                    </label>
                                    <input 
                                        type="text" 
                                        className="profile__input" 
                                        id="profile-email" 
                                        defaultValue="pochta@yandex.ru" 
                                        placeholder="Email"
                                    />
                                </div>
                        </form>
                    </div>
                    <div className="profile__control">
                        <button 
                            type="button" 
                            className="profile__control-button">
                                Редактировать
                        </button>
                        <button 
                            type="button" 
                            className="profile__control-button profile__control-button_signout"
                            onClick={handleSignOut}
                            >
                                Выйти из аккаунта
                            </button>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}

export { Profile };