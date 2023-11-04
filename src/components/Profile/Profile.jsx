import { useContext, useState, useEffect } from 'react';
import './Profile.css';
import { Header } from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({loggedIn, onUpdate, handleSignOut}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);
    
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        validateName(value);
    };
    
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };
    
    const validateName = (value) => {
        const nameRegex = /^[a-zA-Zа-яА-ЯЁё\s-]*$/;
        const isValidName = nameRegex.test(value);
        setNameError(isValidName ? "" : "Пожалуйста, укажите правильное имя.");
    };
    
    const validateEmail = (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = emailRegex.test(value);
        setEmailError(isValidEmail ? "" : "Пожалуйста, укажите правильный email.");
    };

    const isInvalidForm = nameError || emailError;
    const isSaveDisabled = name === currentUser.name && email === currentUser.email;
    const isEditDisabled = !name || !email;

    const handleSubmit = (e) => {
        e.preventDefault();
    
        validateName(name);
        validateEmail(email);
    
        if (!nameError && !emailError) {
            onUpdate({ name, email });
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000);
        }
    };

    return (
        <>
        <Header loggedIn={true}/>
        <main>
            <section className="profile">
                <div className="profile__container">
                    <h1 className="profile__title">Привет, {name}</h1>
                    <form className="profile__form" onSubmit={handleSubmit} noValidate>
                        <div className="profile__input-container">
                            <label htmlFor="profile-name" className="profile__label">Имя</label>
                            <input 
                                type="text" 
                                className="profile__input"
                                name="name"
                                id="profile-name"
                                placeholder="Имя"
                                minLength={2} 
                                maxLength={40} 
                                onChange={handleNameChange}
                                value={name || ""}
                                required
                            />
                            {nameError && <span className="profile__error">{nameError}</span>}
                        </div>
                        
                        <div className="profile__input-container">
                            <label htmlFor="profile-email" className="profile__label">E-mail</label>
                            <input 
                                type="text"
                                name="email"
                                className="profile__input" 
                                id="profile-email" 
                                placeholder="Email"
                                onChange={handleEmailChange}
                                value={email || ""}
                                required
                            />
                            {emailError && <span className="profile__error">{emailError}</span>}
                        </div>
                        
                        <div className="profile__control">
                            <button 
                                type="submit" 
                                disabled={isInvalidForm || isSaveDisabled || isEditDisabled}
                                className={`profile__control-button ${
                                    isInvalidForm || isSaveDisabled || isEditDisabled
                                      ? "profile__control-button_disabled"
                                      : ""
                                  }`}>
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
                    </form>
                    {successMessage && (
                    <div className="profile__success">
                        <p className="profile__success-message">
                            Данные успешно сохранены!
                        </p>
                    </div>
                    )}
                </div>
            </section>
        </main>
        </>
    );
};

export { Profile };