import './LoginMenu.css';
import { NavLink } from 'react-router-dom';

function LoginMenu() {
    return (
        <nav className="login-menu__nav">
            <ul className="login-menu__list">
                <li className="login-menu__item">
                    <NavLink to="/signup" className="login-menu__link">Регистрация</NavLink>
                </li>
                <li className="login-menu__item">
                    <NavLink to="/signin" className="login-menu__link login-menu__link_signin">Войти</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export { LoginMenu };