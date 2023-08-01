import './AuthForm.css';
import { useLocation } from 'react-router-dom';

function AuthForm({title, buttonText}) {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";

    return (
        <section className="auth">
            <h2 className="auth__title">{title}</h2>
            <form className="auth__form" action="#"
            > {isSignUp && (
                <p className="auth__input-container">
                    <label for="name-id" className="auth__label">Имя</label>
                    <input className="auth__input" id="name-id" type="text" name="name" placeholder="Имя" required />
                </p>
            )}
                <p className="auth__input-container">
                    <label for="email-id" className="auth__label">E-mail</label>
                    <input className="auth__input" id="email-id" type="email" name="email" placeholder="Email" required />
                </p>
                <p className="auth__input-container">
                    <label for="password-id" className="auth__label">Пароль</label>
                    <input className="auth__input" id="password-id" type="password" name="password" placeholder="Пароль" required />
                </p>
                <button className="auth__button" type="submit">{buttonText}</button>
            </form>
        </section>
    );
}

export { AuthForm };