import React from 'react';
import './MainMenu.css';
import { NavLink } from 'react-router-dom';

function MainMenu({onMainMenu, onClose}) {

    return (
        <div className="main-menu">
            <div className="main-menu__burger-icon" onClick={onMainMenu}></div>
            <nav className="main-menu__nav">
                <ul className="main-menu__list">
                    <li className="main-menu__item">
                        <NavLink exact to="/" className={({isActive}) => `main-menu__link ${isActive ? "main-menu__link_active" : ""}`}>Главная</NavLink>
                    </li>
                    <li className="main-menu__item">
                        <NavLink to="/movies" className={({isActive}) => `main-menu__link ${isActive ? "main-menu__link_active" : ""}`}>Фильмы</NavLink>
                    </li>
                    <li className="main-menu__item">
                        <NavLink to="/saved-movies" className={({isActive}) => `main-menu__link ${isActive ? "main-menu__link_active" : ""}`}>Сохраненные фильмы</NavLink>
                    </li>
                </ul>
                <div className="main-menu__profile">
                        <NavLink to="/profile" className="main-menu__profile-link">Аккаунт</NavLink>
                </div>
                <button className="main-menu__close-button" onClick={onClose} type="button" aria-label="Закрыть"/>
            </nav>
        </div>
    );
}

export { MainMenu };