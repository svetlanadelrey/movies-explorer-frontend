import './Header.css';
import { Logo } from '../Logo/Logo';
import { LoginMenu } from '../LoginMenu/LoginMenu';
import { MainMenu } from '../MainMenu/MainMenu';
import { useLocation } from 'react-router-dom';

function Header({ loggedIn }) {
    const location = useLocation();
    const isMain = location.pathname === "/";
    const isMovies = location.pathname === "/movies";
    const isSavedMovies = location.pathname === "/saved-movies";
    const isProfile = location.pathname === "/profile";

    return (
        <header className={`header ${!isMain ? 'header_movie' : 'header_main'}`}>
            <div className="header__container">
                <Logo />
                {isMovies || isProfile || isSavedMovies ? <MainMenu /> : <LoginMenu /> }
            </div>
        </header>
    );
}

export { Header };