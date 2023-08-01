import './Header.css';
import { Logo } from '../Logo/Logo';
import { LoginMenu } from '../LoginMenu/LoginMenu';
import { MainMenu } from '../MainMenu/MainMenu';
import { useLocation } from 'react-router-dom';

function Header({ loggedIn }) {
    const location = useLocation();
    const isMain = location.pathname === "/";
    const isSignUp = location.pathname === "/signup";
    const isSignIn = location.pathname === "/signin";

    return (
        <header className={`header ${!isMain ? 'header_movie' : 'header_main'}`}>
            <div className="header__container">
                <Logo />
                {!loggedIn ? <MainMenu /> : <LoginMenu /> }
            </div>
        </header>
    );
}

export { Header };