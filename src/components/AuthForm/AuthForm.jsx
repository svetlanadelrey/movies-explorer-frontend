import React, { useState, useCallback } from 'react';
import './AuthForm.css';
import { useLocation } from 'react-router-dom';

function AuthForm({title, buttonText, onRegister, onLogin}) {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleNameChange = useCallback((e) => {
        setName(e.target.value);
        if (isSignUp) {
            const validNameRegex = /^[a-zA-Zа-яА-Я\s-]*$/;
            setNameError(!validNameRegex.test(e.target.value));
        }
      }, []);
    
      const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value);
        const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmailError(!validEmailRegex.test(e.target.value));
      }, []);
    
      const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value);
        setPasswordError(e.target.value.length < 8);
      }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        isSignUp ? onRegister({name, email, password}) : onLogin({email, password});
    }

    const isFormValid = (isSignUp && !name) || !email || !password || nameError || emailError || passwordError;

    return (
        <section className="auth">
            <h1 className="auth__title">{title}</h1>
            <form 
                className="auth__form"
                autoComplete="off"
                onSubmit={handleSubmit}
                
                action="#"
            > {isSignUp && (
                <p className="auth__input-container">
                    <label htmlFor="name-id" className="auth__label">Имя</label>
                    <input 
                        className={`auth__input ${nameError ? 'auth__input_type_error' : ''}`}  
                        id="name-id" 
                        type="text" 
                        name="name" 
                        placeholder="Имя" 
                        minLength="2" 
                        maxLength="30"
                        onChange={handleNameChange}
                        value={name || ""}
                        required
                    />
                    {nameError && <span className="auth__input_type_error">Неверный формат имени</span>}
                </p>
            )}
                <p className="auth__input-container">
                    <label htmlFor="email-id" className="auth__label">E-mail</label>
                    <input 
                        className={`auth__input ${emailError ? 'auth__input_type_error' : ''}`} 
                        id="email-id" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleEmailChange}
                        minLength="3" 
                        maxLength="30"
                        value={email || ""}
                        required 
                    />
                    {emailError && <span className="auth__input_type_error">Неверный формат email</span>}
                </p>
                <p className="auth__input-container">
                    <label htmlFor="password-id" className="auth__label">Пароль</label>
                    <input 
                        className={`auth__input ${passwordError ? 'auth__input_type_error' : ''}`}
                        id="password-id" 
                        type="password" 
                        name="password" 
                        placeholder=""
                        onChange={handlePasswordChange}
                        minLength="8" 
                        maxLength="30"
                        value={password || ""}
                        required 
                    />
                    {passwordError && <span className="auth__input_type_error">Пароль должен содержать не менее 8 символов</span>}
                </p>
                <button
                    className={`auth__button ${isFormValid ? 'auth__button_disabled' : ''}`} 
                    type="submit">
                        {buttonText}
                </button>
            </form>
        </section>
    );
}

export { AuthForm };