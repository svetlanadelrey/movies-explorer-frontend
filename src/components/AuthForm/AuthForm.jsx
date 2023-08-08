import React from 'react';
import './AuthForm.css';
import { useLocation } from 'react-router-dom';

function AuthForm({title, buttonText}) {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


    return (
        <section className="auth">
            <h1 className="auth__title">{title}</h1>
            <form 
                className="auth__form"
                autoComplete="off"
                
                action="#"
            > {isSignUp && (
                <p className="auth__input-container">
                    <label htmlFor="name-id" className="auth__label">Имя</label>
                    <input 
                        className="auth__input" 
                        id="name-id" 
                        type="text" 
                        name="name" 
                        placeholder="Имя" 
                        minLength="2" 
                        maxLength="30"
                        onChange={handleChangeName}
                        value={name || ""}
                        required
                    />
                </p>
            )}
                <p className="auth__input-container">
                    <label htmlFor="email-id" className="auth__label">E-mail</label>
                    <input 
                        className="auth__input" 
                        id="email-id" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChangeEmail}
                        minLength="3" 
                        maxLength="30"
                        value={email || ""}
                        required 
                    />
                </p>
                <p className="auth__input-container">
                    <label htmlFor="password-id" className="auth__label">Пароль</label>
                    <input 
                        className="auth__input"
                        id="password-id" 
                        type="password" 
                        name="password" 
                        placeholder=""
                        onChange={handleChangePassword}
                        minLength="8" 
                        maxLength="30"
                        value={password || ""}
                        required 
                    />
                    <span className="auth__input-error">Что-то пошло не так...</span>
                </p>
                <button className="auth__button" type="submit">{buttonText}</button>
            </form>
        </section>
    );
}

export { AuthForm };